import { useState } from "react";
import { TextInput, Button } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import {  loginDataType } from "../types/authTypes";
import { toast } from "react-toastify";

export default function RegisterForm() {
 
  const navigate = useNavigate();
  const [formData, setFormData] = useState<loginDataType>({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.email.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/))
      newErrors.email = "Invalid email format.";
    if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name] : value,
    }));
  };



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});
    if (!validateForm()) {
      setLoading(false);
      return;
    }

    try {
      const {user}:{user:any} = await axiosInstance.post("/api/auth/login", formData);
      localStorage.setItem("userData",JSON.stringify(user));
      toast.success("Registration successful! Please check your email for verification.");
      navigate("/");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-6">
      <form onSubmit={handleSubmit} className="flex flex-col  gap-4 w-[30%] bg-amber-100 rounded-2xl p-5">
        <h1 className="text-lg font-bold text-center">Login in an Account</h1>

        <div>
          <TextInput id="email" name="email" type="email" onChange={handleChange} value={formData.email} placeholder="Email" />
          {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
        </div>

        <div>
          <TextInput id="password" name="password" type="password" onChange={handleChange} value={formData.password} placeholder="Password" />
          {errors.password && <p className="text-red-500 text-xs">{errors.password}</p>}
        </div>

        <Button type="submit" color="blue">{loading ? "Logging in..." : "Login"}</Button>

        <div className="text-center text-sm">
          Don't have an account? <Link to="/register" className="text-blue-600">Register</Link>
        </div>
      </form>
    </div>
  );
}
