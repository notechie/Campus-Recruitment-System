import React, { useState } from 'react';
import {
  Table,
  TableHead,
  TableHeadCell,
  TableBody,
  TableRow,
  TableCell,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from 'flowbite-react';
import RecruiterSidebar from './RecruiterSidebar';

const jobData = {
  _id: '64b8f8e2c9d1a2e4f8e3d9a2',
  title: 'Software Engineer',
  company: 'TechCorp',
  description: 'We are looking for a skilled Software Engineer.',
  salary: 120000,
  skillsRequired: ['JavaScript', 'React', 'Node.js'],
  applications: ['64b8f8e2c9d1a2e4f8e3d9a3', '64b8f8e2c9d1a2e4f8e3d9a4'],
  jobType: 'full-time',
  createdAt: '2025-04-01T10:00:00.000Z',
};

const SingleJob: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <RecruiterSidebar>

      {/* Main Content */}
        <h1 className="text-3xl font-semibold mb-6">Job Listing</h1>

        {/* Job Table */}
        <Table>
          <TableHead>
            <TableRow>
              <TableHeadCell>Field</TableHeadCell>
              <TableHeadCell>Details</TableHeadCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell className="font-semibold">Title</TableCell>
              <TableCell>{jobData.title}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-semibold">Company</TableCell>
              <TableCell>{jobData.company}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-semibold">Description</TableCell>
              <TableCell>{jobData.description}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-semibold">Salary</TableCell>
              <TableCell>${jobData.salary.toLocaleString()}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-semibold">Skills Required</TableCell>
              <TableCell>{jobData.skillsRequired.join(', ')}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-semibold">Job Type</TableCell>
              <TableCell className="capitalize">{jobData.jobType}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-semibold">Posted On</TableCell>
              <TableCell>{new Date(jobData.createdAt).toDateString()}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-semibold">Applications</TableCell>
              <TableCell>
                <Button onClick={() => setIsModalOpen(true)}>
                  View Applications ({jobData.applications.length})
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>

        {/* Applications Modal */}
        <Modal
          show={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          size="md"
          popup
        >
          
            <ModalHeader>Applications</ModalHeader>
            <ModalBody>
              {jobData.applications.length > 0 ? (
                <ul className="list-disc pl-5">
                  {jobData.applications.map((app, index) => (
                    <li key={index} className="text-gray-700">
                      Applicant ID: {app}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">No applications yet.</p>
              )}
            </ModalBody>
            <ModalFooter>
              <Button color="gray" onClick={() => setIsModalOpen(false)}>
                Close
              </Button>
            </ModalFooter>
          
        </Modal>
      
    </RecruiterSidebar>
  );
};

export default SingleJob;
