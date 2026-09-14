import { z } from "zod";

const emailSchema = z
  .string()
  .trim()
  .toLowerCase()
  .pipe(
    z.email({
      error: "Enter a valid email address",
    }),
  );

const registerSchema = z.strictObject({
  name: z
    .string()
    .trim()
    .min(2, { error: "Name must contain at least 2 characters" })
    .max(80, { error: "Name cannot exceed 80 characters" }),

  email: emailSchema,

  password: z
    .string()
    .min(8, { error: "Password must contain at least 8 characters" })
    .max(72, { error: "Password cannot exceed 72 characters" })
    .regex(/[a-z]/, {
        error: "Password must contain a lowercase letter",
    })
    .regex(/[A-Z]/, {
        error: "Password must contain an uppercase letter",
    })
    .regex(/[0-9]/, {
        error: "Password must contain a number",
    }),
});

const loginSchema = z.strictObject({
  email: emailSchema,

  password: z
    .string()
    .min(1, { error: "Password is required" })
    .max(72, { error: "Password cannot exceed 72 characters" }),
});

export { loginSchema, registerSchema };
