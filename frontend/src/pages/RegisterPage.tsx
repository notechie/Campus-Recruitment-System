import { useState } from "react";
import { TextInput, Button } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import { FormData } from "../types/authTypes";
import { toast } from "react-toastify";

export default function RegisterForm() {
  const [isRecruiter, setIsRecruiter] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    address: "",
    role: "student",
    rollNumber: "",
    department: "",
    cgpa: "",
    skills: [],
    companyName: "",
    industry: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.name?.trim()) newErrors.name = "Full name is required.";
    if (!formData.email.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/))
      newErrors.email = "Invalid email format.";
    if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters.";
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match.";
    if (!formData.address?.trim()) newErrors.address = "Address is required.";

    if (isRecruiter) {
      if (!formData.companyName?.trim()) newErrors.companyName = "Company Name is required.";
      if (!formData.industry?.trim()) newErrors.industry = "Industry is required.";
    } else {
      if (!formData.rollNumber?.trim()) newErrors.rollNumber = "Roll Number is required.";
      if (!formData.department?.trim()) newErrors.department = "Department is required.";
      if (!formData.cgpa?.trim()) newErrors.cgpa = "CGPA is required.";
      if (!formData.skills?.length) newErrors.skills = "At least one skill is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "skills" ? value.split(",").map((skill) => skill?.trim()) : value,
    }));
  };

  const handleToggleRole = () => {
    setIsRecruiter((prev) => !prev);
    setFormData((prev) => ({
      ...prev,
      role: !isRecruiter ? "recruiter" : "student",
      companyName: "",
      industry: "",
      rollNumber: "",
      department: "",
      cgpa: "",
      skills: [],
    }));
    setErrors({});
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
      await axiosInstance.post("/api/auth/register", formData);
      toast.success("Registration successful! Please check your email for verification.");
      navigate("/login");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-6">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-[30%] bg-white rounded-2xl p-5">
        <h1 className="text-lg font-bold text-center">Create an Account</h1>

        <Button onClick={handleToggleRole} color="gray" className="self-center">
          {isRecruiter ? "Switch to Student" : "Switch to Recruiter"}
        </Button>

        <div>
          <TextInput id="name" name="name" onChange={handleChange} value={formData.name} placeholder="Full Name" />
          {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}
        </div>

        <div>
          <TextInput id="email" name="email" type="email" onChange={handleChange} value={formData.email} placeholder="Email" />
          {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
        </div>

        <div>
          <TextInput id="password" name="password" type="password" onChange={handleChange} value={formData.password} placeholder="Password" />
          {errors.password && <p className="text-red-500 text-xs">{errors.password}</p>}
        </div>

        <div>
          <TextInput id="confirmPassword" name="confirmPassword" type="password" onChange={handleChange} value={formData.confirmPassword} placeholder="Confirm Password" />
          {errors.confirmPassword && <p className="text-red-500 text-xs">{errors.confirmPassword}</p>}
        </div>

        <div>
          <TextInput id="address" name="address" onChange={handleChange} value={formData.address} placeholder="Address" />
          {errors.address && <p className="text-red-500 text-xs">{errors.address}</p>}
        </div>

        {isRecruiter ? (
          <>
            <div>
              <TextInput id="companyName" name="companyName" onChange={handleChange} value={formData.companyName} placeholder="Company Name" />
              {errors.companyName && <p className="text-red-500 text-xs">{errors.companyName}</p>}
            </div>

            <div>
              <TextInput id="industry" name="industry" onChange={handleChange} value={formData.industry} placeholder="Industry" />
              {errors.industry && <p className="text-red-500 text-xs">{errors.industry}</p>}
            </div>
          </>
        ) : (
          <>
            <div>
              <TextInput id="rollNumber" name="rollNumber" onChange={handleChange} value={formData.rollNumber} placeholder="Roll Number" />
              {errors.rollNumber && <p className="text-red-500 text-xs">{errors.rollNumber}</p>}
            </div>

            <div>
              <TextInput id="department" name="department" onChange={handleChange} value={formData.department} placeholder="Department" />
              {errors.department && <p className="text-red-500 text-xs">{errors.department}</p>}
            </div>

            <div>
              <TextInput id="cgpa" name="cgpa" onChange={handleChange} value={formData.cgpa} placeholder="CGPA" />
              {errors.cgpa && <p className="text-red-500 text-xs">{errors.cgpa}</p>}
            </div>

            <div>
              <TextInput id="skills" name="skills" onChange={handleChange} value={formData.skills?.join(",")} placeholder="Skills (comma separated)" />
              {errors.skills && <p className="text-red-500 text-xs">{errors.skills}</p>}
            </div>
          </>
        )}

        <Button type="submit" color="blue">{loading ? "Registering..." : "Register"}</Button>

        <div className="text-center text-sm">
          Already have an account? <Link to="/login" className="text-blue-600">Login</Link>
        </div>
      </form>
    </div>
  );
}
