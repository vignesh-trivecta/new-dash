import { Navbar, Dropdown, Avatar } from "flowbite-react";
import logo from "@/../../public/logo1.png";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { setLoggedIn } from "@/store/authSlice";
import { useRouter } from "next/navigation";

const DashNavbar = function () {

    const dispatch = useDispatch();
    const router = useRouter();
  return (
    <Navbar fluid className="border-b-2">
      <div className="w-full p-3 lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Navbar.Brand href="/">
              <Image alt="wealth-spring" src={logo} className="mr-3 h-6 sm:h-10 sm:w-40" />
            </Navbar.Brand>
          </div>
          <div className="flex items-center gap-3">
          <Dropdown
          inline
          arrowIcon={false}
          label={<Avatar alt="admin settings" img="https://flowbite.com/docs/images/people/profile-picture-5.jpg" rounded/>}
        >
          <Dropdown.Header>
            <span className="block text-sm text-center">
              Bonnie Green
            </span>
            <span className="block truncate text-sm font-medium">
            bonnie@wealthspring.com
            </span>
          </Dropdown.Header>
          <Dropdown.Item className=" flex justify-center hover:bg-white">
            <button className="rounded-md border-2 border-gray-300 p-2" 
            onClick={() => { 
                router.push('/');
                dispatch(setLoggedIn(false));
            }}
            >            
                Sign out
            </button>
          </Dropdown.Item>
        </Dropdown>
          </div>
        </div>
      </div>
    </Navbar>
  );
};

export default DashNavbar;
