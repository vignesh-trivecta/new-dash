'use client';

import React, { useState } from 'react';
import { useSelector } from 'react-redux/es/hooks/useSelector';

const CreateBasket = () => {

  const basketName = useSelector((state) => state.basket.basketName);
  const basketAmount = useSelector((state) => state.basket.basketAmount);
  let [rowData, setRowData] = useState([
    {
      constituents: [],
      isinNo: [],
      exchange: null,
      orderType: null,
      weight: null,
      equityPrice: null,
      quantity: null,
      rowAmount: null,
      selectedIsin: "",
      selectedExchange: "",
    },
  ]);

  return (
    <div>
        {/* Investment row */}
      <div className="flex justify-between mb-2">
        <div className="flex items-center">
          <p className="text-black dark:text-white mr-2">Investment Amount</p>
          <input disabled type="number" value={basketAmount} className="border border-gray-300 rounded-lg w-36" />
        </div>
        <div className="flex items-center">
          <p className="text-black dark:text-white mr-2">Basket Value</p>
          <input disabled type="number" className="border border-gray-300 rounded-lg w-36" />
        </div>
        <div className="flex items-center">
          <p className="text-black dark:text-white mr-2">Basket Name</p>
          <input disabled type="text" value={basketName} className="border border-gray-300 rounded-lg w-36" />
        </div>
      </div>
      
      {/* Table */}
      <div class="overflow-hidden rounded-lg border border-gray-200 shadow-md">
        <table class="w-full border-collapse bg-white text-left text-sm text-gray-500">
          <thead class="bg-gray-50">
            <tr>
              <th scope="col" class="px-6 py-4 font-medium text-gray-900">S.No</th>
              <th scope="col" class="px-6 py-4 font-medium text-gray-900">Constituents</th>
              <th scope="col" class="px-6 py-4 font-medium text-gray-900">Exchange</th>
              <th scope="col" class="px-6 py-4 font-medium text-gray-900">Order Type</th>
              <th scope="col" class="px-6 py-4 font-medium text-gray-900">Weights %</th>
              <th scope="col" class="px-6 py-4 font-medium text-gray-900">Price &#8377;</th>
              <th scope="col" class="px-6 py-4 font-medium text-gray-900">Quantity</th>
              <th scope="col" class="px-6 py-4 font-medium text-gray-900">Total</th>
              <th scope="col" class="px-6 py-4 font-medium text-gray-900">Options</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100 border-t border-gray-100">

          {/* Iterating the JSON object to show certain no.of rows based on length */}
          {rowData.map((data, index) => {
            
          })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default CreateBasket