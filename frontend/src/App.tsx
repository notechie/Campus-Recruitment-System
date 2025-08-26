import './App.css';
import { Route, Routes } from "react-router-dom";
import RegisterForm from "./pages/RegisterPage";
import LoginForm from "./pages/LoginPage";
import RecruiterSidebar from "./pages/RecruiterSidebar";
import JobListings from './pages/Joblisting';
import Profile from './pages/profile';
import ApplicationsTable from './pages/ApplicationTable';
import { applications } from './dummydata/data';
function App() {
  return (
    <Routes>
      <Route path="/register" element={<RegisterForm/>} ></Route>
      <Route path="/login" element={<LoginForm/>} ></Route>
      <Route path="/recruiterDashboard" element={<RecruiterSidebar/>} ></Route>
      <Route path='/listings' element={<JobListings/>} />
      <Route path='/profile' element={<Profile/>} />
      <Route path='/my-applications' element={<ApplicationsTable applications={applications.body} header={applications.header} />} />
    </Routes>
  );
}

export default App;

