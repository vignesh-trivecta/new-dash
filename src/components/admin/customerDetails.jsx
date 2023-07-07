'use client';

import Link from "next/link";
import { useSelector } from "react-redux";
import { Table } from 'flowbite-react';

const CustomerDetails = () => {

    const loggedIn = useSelector((state) => state.auth.loggedIn);

    return(
        loggedIn ? (<div className="container">

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
                        <tr className="bg-white border dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                1
                            </th>
                            <td className="px-6 py-4">
                                Vinod Kumar
                            </td>
                            <td className="px-6 py-4">
                                vinod12@gmail.com
                            </td>
                            <td className="px-6 py-4">
                                9876543210
                            </td>
                        </tr>
                        <tr className="bg-white border dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                2
                            </th>
                            <td className="px-6 py-4">
                                Meera Velu
                            </td>
                            <td className="px-6 py-4">
                                meera12@gmail.com
                            </td>
                            <td className="px-6 py-4">
                                9856326985
                            </td>
                        </tr>
                        <tr className="bg-white border dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                3
                            </th>
                            <td className="px-6 py-4">
                                Veera Vel
                            </td>
                            <td className="px-6 py-4">
                                veeragg12@gmail.com
                            </td>
                            <td className="px-6 py-4">
                            7964852348
                            </td>
                        </tr>
                        <tr className="bg-white border dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                4
                            </th>
                            <td className="px-6 py-4">
                                Shriram Kumar
                            </td>
                            <td className="px-6 py-4">
                                shrirams@gmail.com
                            </td>
                            <td className="px-6 py-4">
                                9856327981
                            </td>
                        </tr>
                        <tr className="bg-white border dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                5
                            </th>
                            <td className="px-6 py-4">
                                Baskar Shiva
                            </td>
                            <td className="px-6 py-4">
                                baskivek@gmail.com
                            </td>
                            <td className="px-6 py-4">
                                9742836754
                            </td>
                        </tr>
                        <tr className="bg-white border dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                6
                            </th>
                            <td className="px-6 py-4">
                                Kumar Vel
                            </td>
                            <td className="px-6 py-4">
                                kumarvv@gmail.com
                            </td>
                            <td className="px-6 py-4">
                                8796579816
                            </td>
                        </tr>
                        
                    </tbody>
                </table>
            </div>
            

        </div>)
        : (<div className="d-flex row container m-5">
            <p>No authorized Access</p>
            <p>Please <Link href='../auth/login'>login</Link></p>
          </div>
        )
    );
};

export default CustomerDetails;