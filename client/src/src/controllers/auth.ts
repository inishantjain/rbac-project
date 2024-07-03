import User from "../model/User";
import asyncWrapper from "../middlewares/async";
import { Request, Response } from "express";
import { NotFoundError, BadRequestError, UnAuthenticatedError } from "../errors/custom-error";
import { editUserSchema, loginSchema, registerSchema } from "../utils/zodSchemas";

////////////////////////////////////////////////////////////////////////////////
//////////////////////////R E G I S T E R///////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
export const register = asyncWrapper(async (req: Request, res: Response) => {
  const validatedData = registerSchema.parse(req.body);

  let user = await User.findOne({ email: validatedData.email });
  if (user) throw new BadRequestError("email already exists");

  user = new User(validatedData);
  await user.save();
  res.status(201).json({ message: "User created successfully" });
});

////////////////////////////////////////////////////////////////////////////////
//////////////////////////////L O G I N/////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
export const login = asyncWrapper(async (req: Request, res: Response) => {
  const validatedData = loginSchema.parse(req.body);

  const user = await User.findOne({ email: validatedData.email });

  if (!user || !user.comparePassword(validatedData.password))
    throw new UnAuthenticatedError("Username or Password is incorrect");

  const token = await user.createJWT();

  res
    .status(200)
    .cookie("access_token", token, {
      // httpOnly: process.env.NODE_ENV === "production" ? true : false,
      path: "/", //accessible on all routes
      sameSite: "none",
      secure: true,
      // maxAge: ONE_MONTH
    })
    //TODO: fix token with cookies till then sending token with json cookies not working now
    .json({ message: "success", user: { ...user.toObject(), password: undefined }, token });
});

////////////////////////////////////////////////////////////////////////////////
//////////////////////////////E D I T////U S E R////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
export const editUser = asyncWrapper(async (req: Request, res: Response) => {
  const validatedData = editUserSchema.parse(req.body);
  const user = await User.findByIdAndUpdate(validatedData.userId, validatedData);

  res.status(200).json({ user, message: "Details updated successfully" });
});

////////////////////////////////////////////////////////////////////////////////
///////////////////G E T/////////A L L/////U S E R S////////////////////////////
////////////////////////////////////////////////////////////////////////////////
export const getAllUsers = asyncWrapper(async (req: Request, res: Response) => {
  const users = await User.find().select("-password");

  res.status(200).json({ users });
});

export const deleteUser = asyncWrapper(async (req: Request, res: Response) => {
  const userId = req.params.id;
  await User.findByIdAndDelete(userId);
  res.sendStatus(200);
});
