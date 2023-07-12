'use client';

import React, { useState, useEffect } from "react";
import DashNavbar from "./Navbar";
import ExampleSidebar from "./Sidebar";

const DashLayout = ({children}) => {


  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    // Initial window width
    setWindowWidth(window.innerWidth);

    // Event listener for window resize
    window.addEventListener('resize', handleResize);

    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  let width = windowWidth > 768;

  return (
    <div className="">
      <DashNavbar />
      <div className="flex items-start">
        {width && <ExampleSidebar />}
        <MainContent >{children}</MainContent>
      </div>
    </div>
  );
};

const MainContent = function ({ children }) {
  return (
    <main className="relative h-full w-full overflow-y-auto pl-4">
      {children}
    </main>
  );
};

export default DashLayout;
