import SidebarComponent from '../components/Sidebar';
import React from 'react'
import { HiHome, HiBriefcase, HiDocumentText, HiUser, HiCog, HiLogout } from "react-icons/hi";
const RecruiterSidebar = ({ children }: { children?: React.ReactNode }) => {
      const sidebarItems = [
            {
              title: "Dashboard",
              icon: HiHome as React.ElementType,
              link: "/", 
            },
            {
              title: "Job Listings",
              icon: HiBriefcase as React.ElementType,
              link: "/listings", 
            },
            {
              title: "My Applications",
              icon: HiDocumentText as React.ElementType ,
              link: "/my-applications", 
            },
            {
              title: "Profile",
              icon: HiUser as React.ElementType,
              link: "/profile", 
            },
            {
              title: "Settings",
              icon:  HiCog as React.ElementType,
              link: "/settings", 
            },
            {
              title: "Logout",
              icon: HiLogout as React.ElementType,
              link: "/logout",
            },
          ];
  return (
   <>
    <SidebarComponent sidebarItems={sidebarItems} />
    <main className="ml-64 pt-16  bg-gray-100 w-70% ">
          {children}
        </main>

   </>
  )
}

export default RecruiterSidebar