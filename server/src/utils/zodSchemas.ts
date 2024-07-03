import { z } from "zod";

export const registerSchema = z.object({
  fname: z.string().min(1, "First name is required as fname"),
  lname: z.string().min(1, "Last name is required as lname"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
  isAdmin: z.boolean().optional(),
});

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export const editUserSchema = z.object({
  userId: z.string().min(1, "Provide userId"),
  fname: z.string().optional(),
  lname: z.string().optional(),
  email: z.string().email("Invalid email address").optional(),
  password: z.string().min(6, "Password must be at least 6 characters long").optional(),
});
