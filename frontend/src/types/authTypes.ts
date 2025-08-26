export type Role = "student" | "recruiter" | "admin";
export interface FormData {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    address: string;
    role: Role;
    rollNumber?: string;
    department?: string;
    cgpa?: string;
    skills?: string[];
    companyName?: string;
    industry?: string;
  }

   export type loginDataType = {
      email: string;
      password: string;
    };
  
export interface ProfileData {
  user: {
    name: string;
    email: string;
    role: 'student' | 'recruiter';
    address: string;
  };
  recruiter?: {
    companyName: string;
    industry: string;
  };
  student?: {
    rollNumber: string;
    department: string;
    cgpa: string;
    skills: string[];
    placementStatus: string;
  };
}