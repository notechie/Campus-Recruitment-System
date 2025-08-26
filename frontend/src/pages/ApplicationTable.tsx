import React from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { useNavigate } from "react-router-dom";
import RecruiterSidebar from "./RecruiterSidebar";
import "../styles/style.css";

const ApplicationsTable = ({
  applications,
  header,
  isAllJob = false,
  isRecruiter = false,
}: {
  applications: any;
    isAllJob?: boolean;
    isRecruiter?: boolean;
  header: string;
}) => {
  const navigate = useNavigate();
  return (
    <RecruiterSidebar>
      <div className="p-3">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">{header}</h2>
        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          <table className="w-full border-collapse text-gray-700">
            <thead className="bg-gray-100">
              <tr className="text-left text-gray-600 uppercase text-sm">
                <th className="p-4">Job Title</th>
                <th className="p-4">Company</th>
                <th className="p-4">Salary</th>
                <th className="p-4">Job Type</th>
                {isRecruiter ? <th className="p-4">Applicants</th> : <th className="p-4">Applications</th>}
                <th className="p-4">Status</th>
                {!isRecruiter &&  <th className="p-4">Recruiter</th>}
                {!isRecruiter && !isAllJob && <th className="p-4">Cancel application</th>}
              </tr>
            </thead>
            <TransitionGroup component="tbody">
              {applications.map((app: any) => (
                <CSSTransition key={app._id} timeout={300} classNames="fade">
                  <tr className="border-t">
                    <td className="p-4">{app.job.title}</td>
                    <td className="p-4">{app.job.company}</td>
                    <td className="p-4">₹{app.job.salary.toLocaleString()}</td>
                    <td className="p-4 capitalize">{app.job.jobType}</td>
                    <td className="p-4">{app.job.applications.length}</td>
                    <td className="p-4 capitalize font-medium">{app.status}</td>
                    <td className="p-4">
                      <button
                        onClick={() => navigate(`/profile/${app.job.postedBy}`)}
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
                      >
                        View Recruiter Profile
                      </button>
                    </td>
                    <td className="p-4">
                      <button
                        onClick={() => navigate(`/profile/${app.job.postedBy}`)}
                        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
                      >
                      Cancel application
                      </button>
                    </td>
                  </tr>
                </CSSTransition>
              ))}
            </TransitionGroup>
          </table>
        </div>
      </div>
    </RecruiterSidebar>
  );
};

export default ApplicationsTable;
