'use client';

import AddRecord from '@/components/admin/addRecord';
import React, { useEffect, useState } from 'react';
import { Button, Label, Modal } from 'flowbite-react';
import { useDispatch, useSelector } from 'react-redux';
import { setBasketAmount, setBasketName } from '@/store/basketSlice';
import BasketName from '@/utils/basketName';
import BasketAmount from '@/utils/basketAmount';
import { getRecords } from '@/app/api/basket/route';
import BasketRecords from '@/components/admin/basketRecords';
import SubmitBasket from '@/components/admin/submitBasket';

const CreateBasket = () => {

  const [openModal, setOpenModal] = useState(false);
  const props = { openModal, setOpenModal };

  const [records, setRecords] = useState([]);
  const [handleFetch, setHandleFetch] = useState(false);

  const dispatch = useDispatch();
  const adminId = useSelector((state) => state.user.username);
  const basketName = useSelector((state) => state.basket.basketName);
  const basketAmount = useSelector((state) => state.basket.basketAmount);

  useEffect(() => {
    dispatch(setBasketName(""));
    dispatch(setBasketAmount(""));
    props.setOpenModal("form-elements");
  }, [])

    useEffect(() => {
    const fetchData = async () => {
      const response = await getRecords(adminId, basketName);
      console.log(response);
      setRecords(response);
    }
    fetchData();
  }, [handleFetch]);

  return (
    <div className='container mx-auto my-8'>
      <h3 className='mb-2 font-bold'>Create new Basket</h3>
      
      {/* Investment details row */}
      <div className="grid grid-cols-3 gap-4 mb-2">
        <div className="flex items-center">
          <p className="text-black dark:text-white mr-2">Basket Name</p>
          <input disabled type="text" value={basketName} className="border border-gray-200 rounded-lg w-44" />
        </div>
        <div className="flex items-center">
          <p className="text-black dark:text-white mr-2">Investment</p>
          <input disabled type="number" value={basketAmount} className="border border-gray-200 rounded-lg w-44" />
        </div>
        <div className="flex items-center">
          <p className="text-black dark:text-white mr-2">Basket Value</p>
          <input disabled type="number" className="border border-gray-200 rounded-lg w-44" />
        </div>
      </div>

      {/* Table showing Create Basket Records */}
      <div className='flex shadow border-b' style={{ height: '300px' }}>
        <div className='overflow-y-auto'>
          <table className="w-full text-sm text-left text-gray-900 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th  scope="col" className="px-6 py-3">S.No</th>
                <th  scope="col" className="px-6 py-3">Stock</th>
                <th  scope="col" className="px-6 py-3">Exchange</th>
                <th  scope="col" className="px-6 py-3">Order Type</th>
                <th  scope="col" className="px-6 py-3">Weights %</th>
                <th  scope="col" className="px-6 py-3">Price &#8377;</th>
                <th  scope="col" className="px-6 py-3">Quantity</th>
                <th  scope="col" className="px-6 py-3">Actions</th>
              </tr>
            </thead>
            { 
              <tbody className='bg-white'>

                {/* Component for showing table records */}
                {records && records.length > 0 ? (records.map((record, index) => (
                  <BasketRecords 
                    record={record} 
                    index={index} 
                    handleFetch={handleFetch} 
                    setHandleFetch={setHandleFetch}
                    // deleteRecord={deleteRecordHandler} 
                    // updateRecord={updateRecordHandler} 
                  />
                  ))) : <p>No table data</p>}
                  
              </tbody>
            }
          </table>
        </div>
      </div>


      
      <div className='flex justify-center items-center mt-4'>

        {/* Add Record Component */}
        <AddRecord handleFetch={handleFetch} setHandleFetch={setHandleFetch} />

        {/* Submit Basket Button */}
        <SubmitBasket />

      </div>

      {/* Create Basket Modal */}
      <div>
        <Modal show={props.openModal === 'form-elements'} popup onClose={() => props.setOpenModal(undefined)}>
            <Modal.Header />
            <Modal.Body className='overflow-hidden'>
              <h4 className="text-xl font-medium text-gray-900 dark:text-white mb-4">Create New Basket</h4>
              <hr />
              <div className='grid grid-rows-2 grid-cols-2 gap-4 mt-4'>
                
                <div className='flex items-center justify-start'>
                  <Label htmlFor='basketName' value="Basket Name" className='' /> 
                </div>
                <BasketName autoFocus={true} />

                <div className='flex items-center justify-start'>
                  <Label htmlFor='basketAmount' value="Basket Amount" className='' /> 
                </div>                
                <BasketAmount />
              </div>
              <div className='flex justify-center mt-4'>
                <button type='submit' onClick={() => {props.setOpenModal(undefined); setHandleFetch(!handleFetch) }} className='bg-cyan-700 text-white p-2 rounded-md hover:bg-cyan-800'>Create</button>
              </div>
            </Modal.Body>
        </Modal>
    </div>
    </div>
  )
}

export default CreateBasket;