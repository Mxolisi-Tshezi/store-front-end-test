"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/lib/validation";
import { loginUser } from "@/services/auth";
import { useRouter } from "next/navigation";
import { toast } from "sonner"; // ✅ Import Sonner toast
import "./styles.css";

export default function LoginPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: { userName: string; password: string }) => {
    setLoading(true);
    try {
      const response = await loginUser(data);
      
      // ✅ Show success toast
      toast.success("Login successful!");

      // Redirect after successful login
      router.push("/home");
    } catch (error: any) {
      // ❌ Show error toast
      toast.error(error.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-width">
      <div className="tabNavigation">
        <p>Home</p>
        <img src="/greater-then-icon.svg" alt=">" />
        <p>Login</p>
      </div>

      <div className="registratin-container">
        <div className="rc-leftside">
          <h1 className="custom-line-heading">Login</h1>
          <hr className="custom-line" />
          <h2>Welcome back! Sign in to your account</h2>

          <form className="registration-form" onSubmit={handleSubmit(onSubmit)}>
            {/* Email */}
            <label>Email Address</label>
            <input {...register("userName")} type="email" placeholder="Type Your Email" />
            {errors.userName && <p className="text-red-500">{errors.userName.message}</p>}

            {/* Password */}
            <label>Password</label>
            <input {...register("password")} type="password" placeholder="Type Your Password" />
            {errors.password && <p className="text-red-500">{errors.password.message}</p>}

            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <p className="other-login">or use one of these options</p>
          <img src="/other-login.jpg" className="other-login-img"/>
        </div>

        <div className="rc-rightside">
        <h1 className="custom-line-heading">Create New Account</h1>
          <hr className="custom-line" />
          <h2 className="">Create your new account</h2>

          <button
            type="button"
            className="submit-btn"
            onClick={() => router.push("/register")}
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
}
