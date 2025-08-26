import React, { useState, useEffect,  } from 'react';
import { TextInput, Button } from 'flowbite-react';
import { FaPencilAlt as FaPencilAltIcon, FaSave as FaSaveIcon } from 'react-icons/fa';
import RecruiterSidebar from './RecruiterSidebar';
import { ProfileData as UserData } from '../types/authTypes';


const Profile: React.FC = () => {
  const userData: UserData = {
    user: {
      name: 'John Doe',
      email: 'johndoe@example.com',
      role: 'student',
      address: '123 Main Street, Cityville',
    },
    student: {
      rollNumber: '21BCE1001',
      department: 'Computer Science',
      cgpa: '8.5',
      skills: ['JavaScript', 'Python', 'Machine Learning'],
      placementStatus: 'Not Placed',
    },
  };

  const [formData, setFormData] = useState<any>({
    name: userData.user.name,
    email: userData.user.email,
    address: userData.user.address,
    companyName: userData.recruiter?.companyName || '',
    industry: userData.recruiter?.industry || '',
    rollNumber: userData.student?.rollNumber || '',
    department: userData.student?.department || '',
    cgpa: userData.student?.cgpa || '',
    skills: userData.student?.skills.join(', ') || '',
    placementStatus: userData.student?.placementStatus || '',
  });

  const [editStates, setEditStates] = useState<{ [key: string]: boolean }>({});
  const [isSaveEnabled, setIsSaveEnabled] = useState(false);

  useEffect(() => {
    const hasChanges = Object.values(editStates).some((state) => state);
    setIsSaveEnabled(hasChanges);
  }, [editStates]);

  const handleEditClick = (field: string) => {
    setEditStates((prev:any) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    setFormData((prev:any) => ({
      ...prev,
      [field]: e.target.value,
    }));
    if (!editStates[field]) {
      setEditStates((prev:any) => ({
        ...prev,
        [field]: true,
      }));
    }
  };

  const handleSave = () => {
    // Implement API call to save all updated data
    console.log('Saving data:', formData);
    // Reset edit states after saving
    setEditStates({});
  };

  const renderInputField = (label: string, field: string) => (
    <div className="mb-4">
      <label className="block text-gray-700 mb-2">{label}</label>
      <div className="flex items-center">
        <TextInput
          type="text"
          value={formData[field]}
          onChange={(e) => handleChange(e, field)}
          disabled={!editStates[field]}
          className={`w-full transition-all duration-300 ${
            editStates[field]
              ? 'bg-white border-blue-500 shadow-md'
              : 'bg-gray-100 border-gray-300'
          }`}
        />
        <Button
          onClick={() => handleEditClick(field)}
          size="sm"
          className="ml-2"
        >
            {/* @ts-ignore */}
          {editStates[field] ? <FaSaveIcon /> : <FaPencilAltIcon />}
        </Button>
      </div>
    </div>
  );

  return (
    <RecruiterSidebar>
    <div className="flex-grow  bg-white shadow-lg rounded-lg p-10">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Profile</h2>
      {renderInputField('Name', 'name')}
      {renderInputField('Email', 'email')}
      {renderInputField('Address', 'address')}
  
      {userData.user.role === 'recruiter' && (
        <>
          {renderInputField('Company Name', 'companyName')}
          {renderInputField('Industry', 'industry')}
        </>
      )}
  
      {userData.user.role === 'student' && (
        <>
          {renderInputField('Roll Number', 'rollNumber')}
          {renderInputField('Department', 'department')}
          {renderInputField('CGPA', 'cgpa')}
          {renderInputField('Skills', 'skills')}
          {renderInputField('Placement Status', 'placementStatus')}
        </>
      )}
  
      {isSaveEnabled && (
        <div className="mt-4">
          <Button onClick={handleSave} color="blue">
            Save All Changes
          </Button>
        </div>
      )}
    </div>
  </RecruiterSidebar>
  
  );
};

export default Profile;
