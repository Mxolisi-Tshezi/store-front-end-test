"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registrationSchema } from "@/lib/validation";
import { registerUser } from "@/services/auth";
import "./styles.css"
import { useRouter } from "next/navigation";


export default function RegisterPage() {
  const [loading, setLoading] = useState(false);
  const [isSouthAfrican, setIsSouthAfrican] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registrationSchema),
  });

  const password = watch("password");
  // const confirmPassword = watch("confirmPassword");

  const handlePasswordChange = (e: any) => {
    const value = e.target.value;
    if (value.length < 8) {
      setPasswordStrength("Weak");
    } else if (!/[A-Z]/.test(value) || !/[0-9]/.test(value) || !/[!@#$%^&*]/.test(value)) {
      setPasswordStrength("Medium");
    } else {
      setPasswordStrength("Strong");
    }
  };

  const handleConfirmPasswordChange = (e: any) => {
    if (password && e.target.value !== password) {
      setPasswordError("Passwords do not match");
    } else {
      setPasswordError("");
    }
  };

  const onSubmit = async (data: any) => {
    // ✅ Use `data.password` and `data.confirmPassword` instead of variables
    if (data.password !== data.confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    } else {
      setPasswordError(""); // ✅ Clear the error when passwords match
    }

    setLoading(true);

    const formattedData = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
      phoneNumber: data.phoneNumber,
      dob: data.dob,
      isSouthAfrican: data.isSouthAfrican,
      saIdNumber: data.isSouthAfrican === "yes" ? data.saIdNumber : undefined,
      title: data.title,
      physicalAddress: data.physicalAddress || "",
    };

    try {
      console.log("Submitting data:", formattedData); // ✅ Debugging
      const response = await registerUser(formattedData);
      console.log("API Response:", response);
      alert("Registration successful!");
    } catch (error: any) {
      console.error("API Error:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };


  return (

    <div className="max-width">

      <div className="tabNavigation">
        <p>Home </p>
        <img src="/greater-then-icon.svg" />
        <p>Create Account</p>
      </div>

      <div className="registratin-container">
        <div className="rc-leftside">
          <h1 className="custom-line-heading">Create New Account</h1>
          <hr className="custom-line" />

          <h2 className="">Create your new account</h2>
          <form
            onSubmit={handleSubmit(
              (data) => {
                console.log("✅ Form Submitted!", data); // Debug submission
                onSubmit(data);
              },
              (errors) => {
                console.log("❌ Validation Errors:", errors); // Debug errors
              }
            )}
            className="registration-form">
            {/* Title */}
            <label>Title</label>
            <select {...register("title")}  >
              {/* <option value="">Select Title</option> */}
              <option value="Mr">Mr</option>
              <option value="Ms">Ms</option>
              <option value="Mrs">Mrs</option>
            </select>
            {errors.title && <p className="text-red-500">{errors.title.message}</p>}

            {/* First Name */}
            <label>First Name</label>
            <input {...register("firstName")} placeholder="Type Your First Name" />
            {errors.firstName && <p className="text-red-500">{errors.firstName.message}</p>}

            {/* Last Name */}
            <label>Last Name</label>
            <input {...register("lastName")} placeholder="Type Your Last Name" />
            {errors.lastName && <p className="text-red-500">{errors.lastName.message}</p>}

            {/* Citizenship Question */}
            <label>Are you a South African citizen?</label>
            <div className="radioContainer">
              <label className="radioBtn">
                <input
                  type="radio"
                  value="yes"
                  {...register("isSouthAfrican")}
                  onChange={() => {
                    setIsSouthAfrican(true);
                  }}
                /> Yes
              </label>
              <label className="radioBtn">
                <input
                  type="radio"
                  value="no"
                  {...register("isSouthAfrican")}
                  onChange={() => {
                    setIsSouthAfrican(false);
                  }}
                /> No
              </label>
            </div>

            {/* SA ID Number (Conditional) */}
            {isSouthAfrican && (
              <>
                <label>ID Number</label>
                <input {...register("saIdNumber")} placeholder="Type Your ID Number" />
                {errors.saIdNumber?.message && <p>{String(errors.saIdNumber.message)}</p>}
              </>
            )}

            {/* Phone Number */}
            <label>Cellphone Number</label>
            <input {...register("phoneNumber")} placeholder="Type Your Phone Number" />
            {errors.phoneNumber && <p className="text-red-500">{errors.phoneNumber.message}</p>}

            {/* Email */}
            <label>Email Address</label>
            <input {...register("email")} type="email" placeholder="Type Your Email" />
            {errors.email && <p className="text-red-500">{errors.email.message}</p>}

            {/* Physical Address */}
            <label>Physical Address</label>
            <input {...register("physicalAddress")} placeholder="Type Your Physical Address" />
            {errors.physicalAddress && <p className="text-red-500">{errors.physicalAddress.message}</p>}

            <div className="relative">
              {/* Password Input */}
              <label>Password</label>
              <div className="relative">
                <input
                  {...register("password")}
                  type={passwordVisible ? "text" : "password"}
                  placeholder="Type Your Password"
                  className="border w-full p-2 pr-10"
                  onChange={handlePasswordChange}
                />
                <button
                  type="button"
                  className="absolute right-3 top-2 text-gray-500"
                  onClick={() => setPasswordVisible(!passwordVisible)}
                >
                  <img src="/eye.svg" />
                </button>
              </div>
              {errors.password && <p className="text-red-500">{errors.password.message}</p>}

              {/* Password Strength Meter */}
              <div className="mt-2 flex items-center space-x-2 mb-2">
                <div className={`h-2 w-10 rounded ${passwordStrength === "Weak" || passwordStrength === "Medium" || passwordStrength === "Strong" ? "bg-red-500" : "bg-gray-300"}`} />
                <div className={`h-2 w-10 rounded ${passwordStrength === "Weak" || passwordStrength === "Medium" || passwordStrength === "Strong" ? "bg-red-500" : "bg-gray-300"}`} />
                <div className={`h-2 w-10 rounded ${passwordStrength === "Medium" || passwordStrength === "Strong" ? "bg-yellow-500" : "bg-gray-300"}`} />
                <div className={`h-2 w-10 rounded ${passwordStrength === "Medium" || passwordStrength === "Strong" ? "bg-yellow-500" : "bg-gray-300"}`} />
                <div className={`h-2 w-10 rounded ${passwordStrength === "Strong" ? "bg-green-500" : "bg-gray-300"}`} />
                <span className="ml-2 text-gray-600">{passwordStrength && `Password is ${passwordStrength}`}</span>
              </div>

              <p className="password-msg">Your Password must have a minimum of 8 characters and must include: at least one
                upper case character, at least one number, at least one symbol, should contain maximum
                2 identical consecutive characters. </p>


              {/* Confirm Password Input */}
              <label className="mb-2">Confirm Password</label>
              <div className="relative">
                <input
                  {...register("confirmPassword")}
                  type={confirmPasswordVisible ? "text" : "password"}
                  placeholder="Re-type Password"
                  onChange={handleConfirmPasswordChange}
                  className="border w-full p-2 pr-10 "
                />
                <button
                  type="button"
                  className="absolute right-3 top-2 text-gray-500"
                  onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
                >
                  <img src="/eye.svg" />
                </button>
              </div>
              {passwordError && <p className="text-red-500">{passwordError}</p>}
            </div>


            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? "Registering..." : "Register"}
            </button>
          </form>

        </div>

        <div className="rc-rightside">
          <h1 className="custom-line-heading">Login</h1>
          <hr className="custom-line" />
          <h2 className="">Welcome back! Sign in to your account</h2>

          <button
            type="button"
            className="submit-btn"
            onClick={() => router.push("/login")}
          >
            Login
          </button>
        </div>
      </div>


    </div>
  );
}
