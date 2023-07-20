'use client';

import Link from "next/link";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getCustomers } from "@/app/api/basket/route";

const CustomerDetails = () => {

    const loggedIn = useSelector((state) => state.auth.loggedIn);
    const [ customers, setCustomers ] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
          const customersData = await getCustomers();
          setCustomers(customersData);
        };
      
        fetchData();
      }, []);      

    return(
       <div className="container">

            <h5 className="font-bold">Customer Details</h5>

            {/* Customer Details table */}
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left text-gray-900 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                S.No
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Email
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Contact
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {customers.map((data, index) => {
                            return <tr className="bg-white border dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600">
                                        <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                                            {index+1}
                                        </td>
                                        <td className="px-6 py-4">
                                            {data.name}
                                        </td>
                                        <td className="px-6 py-4">
                                            {data.email}
                                        </td>
                                        <td className="px-6 py-4">
                                            {data.contactOne}
                                        </td>
                                    </tr>
                        })}
                    </tbody>
                </table>
            </div>
            

        </div>
    );
};

export default CustomerDetails;