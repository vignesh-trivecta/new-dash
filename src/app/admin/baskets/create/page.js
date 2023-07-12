'use client';

import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { getInstrumentDetails, getEquityPrice, sendWeightage } from '@/app/api/basket/route';
import { Button, Checkbox, Label, Modal, TextInput } from 'flowbite-react';
import { setBasketAmount, setBasketName } from '@/store/basketSlice';
import { useDispatch } from 'react-redux';


const CreateBasket = () => {

  // data from redux
  const basketName = useSelector((state) => state.basket.basketName);
  const basketAmount = useSelector((state) => state.basket.basketAmount);
  const dispatch = useDispatch();

  // add record modal values
  const [openRecordModal, setOpenRecordModal] = useState('');
  const props = { openRecordModal, setOpenRecordModal };

  //edit record modal values
  const [openEditModal, setOpenEditModal] = useState('');
  const editProps = { openEditModal, setOpenEditModal };
  
  // basket modal values
  const [openModal, setOpenModal] = useState('');
  const properties = { openModal, setOpenModal };

  // add row modal data
  let [equityData, setEquityData] = useState([]);
  let [selectedEquity, setSelectedEquity] = useState('');
  let [selectedExchange, setSelectedExchange] = useState('');
  let [selectedOrderType, setSelectedOrderType] = useState('');
  let [weightage, setWeightage] = useState(undefined);
  let [equityPrice, setEquityPrice] = useState(undefined);
  let [quantity, setQuantity] =useState(undefined);
  
  const [basket, setBasket] = useState([]);
  const [editBasket, setEditBasket] = useState([]);
  let [editIndex, setEditIndex] = useState(null);
  // const handleChange = value => {
  //   setSelectedEquity(value);
  // };


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
  };

  // Function to edit a record
  const editRecord = () => {
    console.log(editIndex)
  }

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
    properties.setOpenModal('form-elements');
    dispatch(setBasketName(''));
    dispatch(setBasketAmount(null));
    return;
  }, []);

  return (
    <div>
        <p className='mb-2 font-bold underline-offset-1'>Create new Basket</p>
        {/* Investment details row */}
      <div className="grid grid-cols-3 gap-2 mb-2">
        <div className="flex items-center">
          <p className="text-black dark:text-white mr-2">Investment Amount</p>
          <input disabled type="number" value={basketAmount} className="border border-gray-300  bg-gray-200 rounded-lg w-44" />
        </div>
        <div className="flex items-center">
          <p className="text-black dark:text-white mr-2 ml-2">Basket Value</p>
          <input disabled type="number" className="border border-gray-300 bg-gray-200 rounded-lg w-44" />
        </div>
        <div className="flex items-center">
          <p className="text-black dark:text-white mr-2">Basket Name</p>
          <input disabled type="text" value={basketName} className="border border-gray-300 bg-gray-200 rounded-lg w-44" />
          <button className='border-2 rounded-md p-3' onClick={() => properties.setOpenModal('form-elements')}>
            <svg className="w-4 h-4 text-gray-600 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17v1a.97.97 0 0 1-.933 1H1.933A.97.97 0 0 1 1 18V5.828a2 2 0 0 1 .586-1.414l2.828-2.828A2 2 0 0 1 5.828 1h8.239A.97.97 0 0 1 15 2M6 1v4a1 1 0 0 1-1 1H1m13.14.772 2.745 2.746M18.1 5.612a2.086 2.086 0 0 1 0 2.953l-6.65 6.646-3.693.739.739-3.692 6.646-6.646a2.087 2.087 0 0 1 2.958 0Z"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Modal to create a new basket */}
      <Modal show={properties.openModal === 'form-elements'} size="md" popup onClose={() => properties.setOpenModal(undefined)} className='py-36'>
        <Modal.Body className="p-4">
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">New Basket</h3>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="name" value="Enter basket name" />
              </div>
              <TextInput id="name" type="text" onChange={(e) => dispatch(setBasketName(e.target.value))} required />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="amount" value="Enter investment amount" />
              </div>
              <TextInput id="amount" type="number" onChange={(e) => dispatch(setBasketAmount(e.target.value))} required />
            </div>
            <div className="w-full flex justify-between">
              <Button className="bg-blue-500" onClick={() => properties.setOpenModal(undefined)}>Create</Button>
              <Button className="bg-white text-black" onClick={() => properties.setOpenModal(undefined)}>Back</Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      {/* Modal pop-up to add new record */}
      <Modal show={props.openRecordModal === 'form-elements'} popup onClose={() => props.setOpenRecordModal(undefined)} className='px-64 py-24'>
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
              <Button className="bg-white border-gray-500 text-black" onClick={() => props.setOpenRecordModal(undefined)}>Back</Button>
            </div>
          </div>
          
        </Modal.Body>
      </Modal>

      {/* Modal pop-up to edit existing record */}
      <Modal show={editProps.openEditModal === 'form-elements'} popup onClose={() => editProps.setOpenEditModal(undefined)} className='px-64 py-24'>
        <Modal.Body className="p-4 flex justify-center">
          {console.log(editIndex, editBasket)}
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">Edit record</h3>
            
            {/* 1st row */}
            <div className='flex'>
              {/* Constituent */}
              <div>
                <div className="">
                  <Label htmlFor="name" value="Select Constituents" />
                </div>
                <div className=''>
                  <select name="constituent" id="constituent" value={selectedEquity} onChange ={(e) => setSelectedEquity(e.target.value)} className='w-56 border border-gray-300 text-gray-500 rounded-md'>
                    <option value="" disabled>{editBasket.selectedEquity}</option>
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
                    editBasket.exchange = e.target.value;
                    equityPriceAPI();
                  }} className='w-44 border border-gray-300 text-gray-500 rounded-md'>
                    <option value="" selected disabled>{editBasket.exchange}</option>
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
                    <option value="" selected disabled>{editBasket.orderType}</option>
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
                  <input type='number' 
                  placeholder={editBasket.weightage}
                  onChange={(e) => {
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
              <Button className="bg-blue-500" onClick={() => {
                basket[editIndex] = {
                  constituent: selectedEquity,
                  exchange: selectedExchange,
                  orderType: selectedOrderType,
                  weightage: weightage,
                  price: equityPrice,
                  quantity: quantity
                };
                setSelectedEquity('');
                setSelectedExchange('');
                setSelectedOrderType('');
                setWeightage(null);
                setEquityPrice(null);
                setQuantity(null);
              }}>Update</Button>
              <Button className="bg-white border-gray-500 text-black" onClick={() => editProps.setOpenEditModal(undefined)}>Back</Button>
            </div>
          </div>
          
        </Modal.Body>
      </Modal>

      
      {/* Table */}
      <div className="overflow-x rounded-lg border border-gray-200 shadow-md mt-2">
        <table className="overflow-scroll w-full border-collapse bg-white text-left text-sm text-gray-500">
          <thead className="uppercase bg-gray-50 text-xs">
            <tr>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">S.No</th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">Stock</th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">Exchange</th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">Order Type</th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">Weights %</th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">Price &#8377;</th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">Quantity</th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 border-t border-gray-100">

            {/* Iterating the JSON object to show certain no.of rows based on length */}
            {basket.map((data, index) => {
              return (
                <tr className='text-xs'>
                  <td className="px-6 py-4 font-medium text-gray-900">{index + 1}</td>
                  <td className="px-6 py-4 font-medium text-gray-900">{data.constituent}</td>
                  <td className="px-6 py-4 font-medium text-gray-900">{data.exchange}</td>
                  <td className="px-6 py-4 font-medium text-gray-900">{data.orderType}</td>
                  <td className="px-6 py-4 font-medium text-gray-900">{data.weightage}</td>
                  <td className="px-6 py-4 font-medium text-gray-900">{data.price}</td>
                  <td className="px-6 py-4 font-medium text-gray-900">{data.quantity}</td>
                  <td className='flex mt-4'>
                    <button className='mr-2' onClick={() => deleteRecord(index)}>
                      <svg class="w-4 h-4text-gray-800 dark:text-white hover:text-red-500" ariaHidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M1 5h16M7 8v8m4-8v8M7 1h4a1 1 0 0 1 1 1v3H6V2a1 1 0 0 1 1-1ZM3 5h12v13a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5Z"/>
                      </svg>
                    </button>
                    <button onClick={() => {
                      setEditIndex(index);
                      setEditBasket(basket[index]);
                      editProps.setOpenEditModal('form-elements');
                    }}>
                      <svg className="w-4 h-4text-gray-800 dark:text-white hover:text-red-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 21 21">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7.418 17.861 1 20l2.139-6.418m4.279 4.279 10.7-10.7a3.027 3.027 0 0 0-2.14-5.165c-.802 0-1.571.319-2.139.886l-10.7 10.7m4.279 4.279-4.279-4.279m2.139 2.14 7.844-7.844m-1.426-2.853 4.279 4.279"/>
                      </svg>
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
        <div className='mt-6 flex justify-center'>
            <Button onClick={() => props.setOpenRecordModal('form-elements')} className="bg-blue-500 mr-2">
            <svg class="w-4 h-4 text-white" ariaHidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16"/>
            </svg>
            &nbsp; Add record
          </Button>
          <button className='p-2 border border-gray-300 rounded-md bg-green-500 text-white hover:bg-green-700' onClick={() => {
            dispatch(setBasketAmount(null));
            dispatch(setBasketName(''));
          }}>Submit</button>
        </div>
    </div>
  )
}

export default CreateBasket