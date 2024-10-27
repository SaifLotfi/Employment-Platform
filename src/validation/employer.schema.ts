import { z } from "zod";

export const employerSchema = z.object({
  name: z.string().min(1, "Name cannot be empty"),
  email: z.string().email(),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .max(64, "Password must be at most 64 characters long"),
  company: z.string().min(1, "Company name cannot be empty"),
});
