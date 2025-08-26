import { Navbar, NavbarBrand, NavbarCollapse, NavbarLink, NavbarToggle, Sidebar, SidebarItem, SidebarItemGroup, SidebarItems } from "flowbite-react";
import { Link } from "react-router-dom";
import { HiBriefcase} from "react-icons/hi";
import { NavLink } from "react-router-dom";
import logo from "../assets/download.png"
import { ElementType } from "react";

export default function SidebarComponent({sidebarItems}:{sidebarItems: { title: string; icon: React.ElementType; link: string }[]}) {
    console.log(HiBriefcase)
   
    const castIcon = (Icon: any) =>
        Icon as unknown as React.FC<React.SVGProps<SVGSVGElement>>;
    const CustomNavLink = ({
        to,
        children,
        ...props
      }: {
        to: string;
        children: React.ReactNode;
      }) => {
        return (
          <NavLink
            to={to}
            {...props}
            className={({ isActive }) =>
              `flex items-center p-2 text-base font-normal text-gray-900 rounded-lg hover:bg-gray-100 ${
                isActive ? "bg-gray-200" : ""
              }`
            }
          >
            {children}
          </NavLink>
        );
      };
      
  return (
    <>
    <Navbar className="fixed top-0 left-0 w-full right-0 z-50 bg-gray-50  mb-96">
      <NavbarBrand className="p-0 h-10 flex justify-center items-center" href="/">
        <img src={logo} className=" p-0 h-[200%] w-[100%] " alt="Logo" />
        
      </NavbarBrand>
      <NavbarToggle />
      <NavbarCollapse>
        <NavbarLink href="#" active>
          Home
        </NavbarLink>
        <NavbarLink as={Link} href="#">
          About
        </NavbarLink>
        
      </NavbarCollapse>
    </Navbar>
    <Sidebar   className="fixed top-16 left-0 w-64 bg-gray-50 h-full border-r">
  <SidebarItems className="h-full ">
    <SidebarItemGroup>
      {sidebarItems.map((item, index) => (
        <SidebarItem
          key={index}
          as={(props) => (
            <CustomNavLink to={item.link} {...props}>
              {props.children}
            </CustomNavLink>
          )}
          className={`flex items-center p-2 text-base font-normal text-gray-900 rounded-lg hover:bg-gray-100 ${
            ({ isActive }: { isActive: boolean }) => (isActive ? "bg-gray-200" : "")
          }`}
          icon={castIcon(item.icon)}
        >
          {item.title}
        </SidebarItem>
      ))}
    </SidebarItemGroup>
  </SidebarItems>
</Sidebar>
</>

  );
}
