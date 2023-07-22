'use client';

import Link from "next/link";
import { useSelector } from "react-redux";
import { segregate } from "@/utils/priceSegregator";
const BasketDetails = () => {

    const loggedIn = useSelector((state) => state.user.loggedIn);

    return(
        <div className="container">

            {/* Customer Details table */}
            <div className="mt-4 ml-8 overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left text-gray-900 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                S.No
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Basket Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Stock
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Total &#8377;
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="bg-white border dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                1
                            </th>
                            <td className="px-6 py-4">
                                Vinod
                            </td>
                            <td className="px-6 py-4">
                                10
                            </td>
                            <td className="px-6 py-4">
                                {segregate(500000)}
                            </td>
                        </tr>
                        <tr className="bg-white border dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                2
                            </th>
                            <td className="px-6 py-4">
                                Meera
                            </td>
                            <td className="px-6 py-4">
                                8
                            </td>
                            <td className="px-6 py-4">
                                {segregate(300000)}
                            </td>
                        </tr>
                        <tr className="bg-white border dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                3
                            </th>
                            <td className="px-6 py-4">
                                Veera
                            </td>
                            <td className="px-6 py-4">
                                5
                            </td>
                            <td className="px-6 py-4">
                                {segregate(100000)}
                            </td>
                        </tr>
                        <tr className="bg-white border dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                4
                            </th>
                            <td className="px-6 py-4">
                                Shriram
                            </td>
                            <td className="px-6 py-4">
                                10
                            </td>
                            <td className="px-6 py-4">
                                {segregate(600000)}
                            </td>
                        </tr>
                        <tr className="bg-white border dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                5
                            </th>
                            <td className="px-6 py-4">
                                Baskar
                            </td>
                            <td className="px-6 py-4">
                                9
                            </td>
                            <td className="px-6 py-4">
                                {segregate(1500000)}
                            </td>
                        </tr>
                        <tr className="bg-white border dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                6
                            </th>
                            <td className="px-6 py-4">
                                Kumar
                            </td>
                            <td className="px-6 py-4">
                                4
                            </td>
                            <td className="px-6 py-4">
                                {segregate(4000000)}
                            </td>
                        </tr>
                        
                    </tbody>
                </table>
            </div>
            

        </div>
    );
};

export default BasketDetails;