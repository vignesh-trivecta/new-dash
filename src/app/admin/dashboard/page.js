'use client';
import React from "react";

const DashCards = () => {
    return(
        <div className="flex justify-between">
            <div className="border border-gray-300 rounded-md p-4">
                <div className="">
                    <h6 className="">Total number of transactions</h6>
                    <p className="">115</p>
                </div>
            </div>
            <div className="border border-gray-300 rounded-md p-4">
                <div className="">
                    <h6 className="">Total number of orders executed</h6>
                    <p className="">34</p>
                </div>
            </div>
            <div className="border border-gray-300 rounded-md p-4">
                <div className="">
                    <h6 className="">Total value of orders</h6>
                    <p className="">5,00,000</p>
                </div>
            </div>
        </div>
    )
}

export default DashCards;