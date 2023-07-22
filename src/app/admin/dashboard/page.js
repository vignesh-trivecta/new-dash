'use client';
// import { PieChart } from "@/components/admin/piechart";
import React from "react";

export const metadata = {
    title: 'Wealth Spring | Login',
    description: 'Generated by create next app',
}

const DashCards = () => {
    return(
        <div>
            <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 p-20">
                <div className="bg-white border border-gray-300 rounded-lg p-4 sm:p-6 xl:p-8 ">
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <span className="text-xl leading-none font-bold text-gray-900">2,340</span>
                            <h3 className="text-base font-normal text-gray-500">Transactions</h3>
                        </div>
                    </div>
                </div>
                <div className="bg-white  border border-gray-300 rounded-lg p-4 sm:p-6 xl:p-8 ">
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <span className="text-xl leading-none font-bold text-gray-900">55</span>
                            <h3 className="text-base font-normal text-gray-500 break-words">Baskets executed</h3>
                        </div>
                    </div>
                </div>
                <div className="bg-white  border border-gray-300 rounded-lg p-4 sm:p-6 xl:p-8 ">
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <span className="text-xl leading-none font-bold text-gray-900">50,00,000</span>
                            <h3 className="text-base font-normal text-gray-500">Value of orders</h3>
                        </div>
                    </div>
                </div>
            </div>
            {/* <div>
                <PieChart />
            </div> */}
        </div>
    )
}

export default DashCards;