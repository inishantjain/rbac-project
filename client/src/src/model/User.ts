import { Model, Schema, Types, model } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

//user properties
interface IUser {
  fname: string;
  lname: string;
  email: string;
  password: string;
  isAdmin: boolean;
  dpUrl?: string;
}

// Put all user instance methods in this interface
interface IUserMethods {
  comparePassword(loginPassword: string): Promise<boolean>;
  createJWT(): Promise<string>;
}

type UserModel = Model<IUser, {}, IUserMethods>;

const userSchema = new Schema<IUser, UserModel, IUserMethods>({
  fname: { type: "string", lowercase: true, required: true },
  lname: { type: "string", lowercase: true, required: true },
  email: { type: "string", required: true, unique: true },
  password: { type: "string", required: true },
  isAdmin: { type: "boolean", default: false },
  dpUrl: "string",
});

userSchema.pre("save", async function () {
  //save only hashed password in the database
  if (this.isModified("password")) this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePassword = async function (loginPassword: string) {
  const isMatching = await bcrypt.compare(loginPassword, this.password);
  return isMatching;
};

userSchema.methods.createJWT = async function () {
  return jwt.sign(
    {
      id: this._id,
      email: this.email,
      isAdmin: this.isAdmin,
    },
    process.env.JWT_SECRET!,
    { expiresIn: process.env.JWT_LIFETIME }
  );
};

const User = model<IUser, UserModel>("User", userSchema);
export default User;
