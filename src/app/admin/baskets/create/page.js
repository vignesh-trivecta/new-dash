'use client';

import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux/es/hooks/useSelector';
// import basket from '@/data/basketData';
import { getInstrumentDetails, getEquityPrice, sendWeightage } from '@/app/api/basket/route';
import { Button, Checkbox, Label, Modal, TextInput } from 'flowbite-react';
import { setBasketAmount, setBasketName } from '@/store/basketSlice';
// import Select from "react-tailwindcss-select";
import { useDispatch } from 'react-redux';

const options = [
  { value: "fox", label: "🦊 Fox" },
  { value: "Butterfly", label: "🦋 Butterfly" },
  { value: "Honeybee", label: "🐝 Honeybee" }
];


const CreateBasket = () => {

  const basketName = useSelector((state) => state.basket.basketName);
  const basketAmount = useSelector((state) => state.basket.basketAmount);
  const dispatch = useDispatch();

  //modal values
  const [openModal, setOpenModal] = useState('');
  const props = { openModal, setOpenModal };

  // add row modal data
  let [equityData, setEquityData] = useState([]);
  let [selectedEquity, setSelectedEquity] = useState('');
  let [selectedExchange, setSelectedExchange] = useState('');
  let [selectedOrderType, setSelectedOrderType] = useState('');
  let [weightage, setWeightage] = useState(undefined);
  let [equityPrice, setEquityPrice] = useState(undefined);
  let [quantity, setQuantity] =useState(undefined);
  

  // const handleChange = value => {
  //   setSelectedEquity(value);
  // };

  const [basket, setBasket] = useState([]);

  // Function to create a new record
  const createRecord = () => {
    const newRecord = {
      constituent: selectedEquity,
      exchange: selectedExchange,
      orderType: selectedOrderType,
      weightage: weightage,
      price: equityPrice,
      quantity: quantity
    };
  
    setBasket(prevBasket => [...prevBasket, newRecord]);
    setSelectedEquity('');
    setSelectedExchange('');
    setSelectedOrderType('');
    setWeightage(null);
    setEquityPrice(null);
    setQuantity(null);
    props.setOpenModal(undefined);
  };

  // Function to delete a record
  const deleteRecord = (index) => {
    setBasket(prevBasket => {
      const updatedBasket = [...prevBasket];
      updatedBasket.splice(index, 1);
      return updatedBasket;
    });
  };

  // function to get equity price
  const equityPriceAPI = async () => {
    const price = await getEquityPrice(selectedEquity, selectedExchange);
    setEquityPrice(price);
  }

  // function to get the quantity of stocks based on weightage
  const quantityAPI = async () => {
    const quantity = await sendWeightage(weightage, basketAmount, equityPrice);
    setQuantity(quantity);
  }

  useEffect(() => {
    const fetchData = async () => {
      let details = await getInstrumentDetails();
      setEquityData(details);
    }
    fetchData();
  }, []);

  return (
    <div>
        <p className='mb-2 font-bold underline-offset-1'>Create new Basket</p>
        {/* Investment details row */}
      <div className="grid grid-cols-3 gap-2 mb-2">
        <div className="flex items-center">
          <p className="text-black dark:text-white mr-2">Investment Amount</p>
          <input disabled type="number" value={basketAmount} className="border border-gray-300 rounded-lg w-44" />
        </div>
        <div className="flex items-center">
          <p className="text-black dark:text-white mr-2 ml-2">Basket Value</p>
          <input disabled type="number" className="border border-gray-300 rounded-lg w-44" />
        </div>
        <div className="flex items-center">
          <p className="text-black dark:text-white mr-2">Basket Name</p>
          <input disabled type="text" value={basketName} className="border border-gray-300 rounded-lg w-44" />
        </div>
      </div>

      {/* Modal pop-up */}
      <Button onClick={() => props.setOpenModal('form-elements')} className="bg-blue-500">
        <svg class="w-4 h-4 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16"/>
        </svg>
        &nbsp; Add new row
      </Button>
      <Modal show={props.openModal === 'form-elements'} popup onClose={() => props.setOpenModal(undefined)} className='px-64 py-24'>
        <Modal.Body className="p-4 flex justify-center">
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">Add row</h3>
            
            {/* 1st row */}
            <div className='flex'>
              {/* Constituent */}
              <div>
                <div className="">
                  <Label htmlFor="name" value="Select Constituents" />
                </div>
                <div className=''>
                  <select name="constituent" id="constituent" value={selectedEquity} onChange ={(e) => setSelectedEquity(e.target.value)} className='w-56 border border-gray-300 text-gray-500 rounded-md'>
                    <option value="" disabled>Select</option>
                    {
                      equityData.map((data, index) => {
                        return <option value={data.instrumentName}>{data.instrumentName}</option>
                      })
                    }
                  </select> 
                  {/* <Select
                      value={selectedEquity}
                      onChange={handleChange}
                      options={equityData}
                      isSearchable={true}
                  /> */}
                </div>
              </div>
              {/* Exchange */}
              <div className='ml-6'>
                <div className="">
                  <Label htmlFor="exchange" value="Select Exchange" />
                </div>
                <div>
                  <select name="exchange" id="exchange" value={selectedExchange} onChange={(e) => {
                    setSelectedExchange(e.target.value);
                    equityPriceAPI();
                  }} className='w-44 border border-gray-300 text-gray-500 rounded-md'>
                    <option value="" selected disabled>Select</option>
                    <option value="BSE">BSE</option>
                    <option value="NSE">NSE</option>
                  </select> 
                </div>
              </div>
              {/* Price */}
              <div className='ml-6'>
                <div className="">
                  <Label htmlFor="price" value="Price" />
                </div>
                <div>
                  <input disabled type='number' className='border border-gray-300 rounded-md w-32 bg-gray-300' placeholder={equityPrice} />
                </div>
              </div>
            </div>
            
            {/* 2nd row */}
            <div className='flex'>
              {/* Order Type */}
              <div>
                <div className="">
                  <Label htmlFor="orderType" value="Select Order Type" />
                </div>
                <div className='w-56'>
                  <select name="orderType" id="orderType" value={selectedOrderType} onChange={(e) => setSelectedOrderType(e.target.value)} className='w-56 border border-gray-300 text-gray-500 rounded-md'>
                    <option value="" selected disabled>Select</option>
                    <option value="Buy">Buy</option>
                    <option value="Sell">Sell</option>
                  </select> 
                </div>
              </div>
              {/* Weightage */}
              <div className='ml-6'>
                <div className="">
                  <Label htmlFor="weightage" value="Enter weightage %" />
                </div>
                <div>
                  <input type='number' onChange={(e) => {
                    setWeightage(e.target.value);
                    quantityAPI();
                  }} className='w-44 border border-gray-300 rounded-md' />
                </div>
              </div>
            </div>
            {/* Quantity */}
            <div className='flex'>
              <div>
                <div className="">
                  <Label htmlFor="quantity" value="Quantity" />
                </div>
                <div>
                  <input type='number' disabled value={quantity} name='quantity' className='w-56 bg-gray-300 border border-gray-300 rounded-md' />
                </div>
              </div>
              <div className="ml-6">
                {/* <div>
                  <Label htmlFor="totalAmount" value="Total Price" />
                </div> */}
                {/* <div>
                  <input type='number' disabled name='totalAmount' className='w-44 bg-gray-300 border border-gray-300 rounded-md' />
                </div> */}
              </div>
            </div>
            
            {/* Modal buttons */}
            <div className="flex justify-between">
              <Button className="bg-blue-500" onClick={() => createRecord()}>Create</Button>
              <Button className="bg-white border-gray-500 text-black" onClick={() => props.setOpenModal(undefined)}>Back</Button>
            </div>
          </div>
          
        </Modal.Body>
      </Modal>

      
      {/* Table */}
      <div className="overflow-x rounded-lg border border-gray-200 shadow-md mt-2">
        <table className="overflow-scroll w-full border-collapse bg-white text-left text-sm text-gray-500">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">S.No</th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">Constituents</th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">Exchange</th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">Order Type</th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">Weights %</th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">Price &#8377;</th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">Quantity</th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">Options</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 border-t border-gray-100">

            {/* Iterating the JSON object to show certain no.of rows based on length */}
            {basket.map((data, index) => {
              return (
                <tr>
                  <td className="px-6 py-4 font-medium text-gray-900">{index + 1}</td>
                  <td className="px-6 py-4 font-medium text-gray-900">{data.constituent}</td>
                  <td className="px-6 py-4 font-medium text-gray-900">{data.exchange}</td>
                  <td className="px-6 py-4 font-medium text-gray-900">{data.orderType}</td>
                  <td className="px-6 py-4 font-medium text-gray-900">{data.weightage}</td>
                  <td className="px-6 py-4 font-medium text-gray-900">{data.price}</td>
                  <td className="px-6 py-4 font-medium text-gray-900">{data.quantity}</td>
                  <td>
                    <button onClick={() => deleteRecord(index)}>
                      <svg class="w-6 h-6 text-gray-800 dark:text-white hover:text-red-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M1 5h16M7 8v8m4-8v8M7 1h4a1 1 0 0 1 1 1v3H6V2a1 1 0 0 1 1-1ZM3 5h12v13a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5Z"/>
                      </svg>
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
        <div className='text-end mt-4'>
          <button className='border border-gray-300 rounded-md p-2 bg-green-400 text-white' onClick={() => {
            dispatch(setBasketAmount(null));
            dispatch(setBasketName(''));
          }}>Submit</button>
        </div>
    </div>
  )
}

export default CreateBasket