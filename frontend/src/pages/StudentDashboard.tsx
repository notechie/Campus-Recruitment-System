// StudentDashboard.jsx
import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const StudentDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white text-black flex items-center justify-center px-4">
      <div className="w-full max-w-3xl bg-gray-100 rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-semibold mb-8 text-center text-blue-600">
          Student Dashboard
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Button
            onClick={() => navigate("/joblisting")}
            className="w-full py-6 text-lg bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow"
          >
            View Available Jobs
          </Button>

          <Button
            onClick={() => navigate("/applications")}
            className="w-full py-6 text-lg bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow"
          >
            View Applied Jobs
          </Button>

          <Button
            onClick={() => navigate("/profile")}
            className="w-full py-6 text-lg bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow"
          >
            Edit Profile
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
