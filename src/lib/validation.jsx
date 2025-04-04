


// import { z } from "zod";

// export const registrationSchema = z.object({
//   firstName: z.string().min(2, "First Name is required"),
//   lastName: z.string().min(2, "Last Name is required"),
//   email: z.string().email("Invalid email"),
//   password: z.string().min(6, "Password must be at least 6 characters"),
//   phoneNumber: z.string().min(10, "Phone number is required"),
//   // dob: z.string(),
//   saIdNumber: z.string().optional(),
//   provider: z.string().optional(),
//   // gender: z.enum(["M", "F"]),
//   title: z.enum(["Mr", "Ms", "Mrs"]),
//   physicalAddress: z.string().optional(),
// });
import { z } from "zod";

export const registrationSchema = z.object({
  firstName: z.string().min(2, "First Name is required"),
  lastName: z.string().min(2, "Last Name is required"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string(),
  phoneNumber: z.string().min(10, "Phone number is required"),
  // dob: z.string(),
  isSouthAfrican: z.enum(["yes", "no"]), // Citizenship field
  saIdNumber: z.string().optional(),
  title: z.enum(["Mr", "Ms", "Mrs"]),
  physicalAddress: z.string().optional(),
}).superRefine((data, ctx) => {
  if (data.isSouthAfrican === "yes" && !data.saIdNumber) {
    ctx.addIssue({
      path: ["saIdNumber"],
      message: "SA ID Number is required if you are a South African citizen",
      code: "custom",
    });
  }
});


export const loginSchema = z.object({
  userName: z.string().email("Invalid email"),
  password: z.string().min(1, "Password is required"),
});


