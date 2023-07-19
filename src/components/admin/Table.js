'use client';

import React, { useEffect, useState } from 'react';
import { getRecords, deleteRecord } from '@/app/api/basket/route';
import BasketRecords from '@/components/admin/basketRecords';
import UpdateRecord from './updateRecord';
import { setInstrumentName, setExchange, setOrderType, setWeightage, setQuantity, setPrice } from '@/store/addRecordSlice';
import { useDispatch, useSelector } from 'react-redux';

const Table = ({record}) => {

  let [records, setRecords] = useState([]);
  let [userId, setUserId] = useState(null);
  let [responseRecord, setResponseRecord] = useState([]);

  const dispatch = useDispatch();
  // const instrumentName = useSelector((state) => state.add.instrumentName);
  // const exchange = useSelector((state) => state.add.exchange);
  // const orderType = useSelector((state) => state.add.orderType);
  // const weightage = useSelector((state) => state.add.weightage);
  // const price = useSelector((state) => state.add.price);
  // const quantity = useSelector((state) => state.add.quantity);


  useEffect(() => {
    const fetchData = async () => {
      const response = await getRecords();
      setRecords(response);
    }
    fetchData();
  }, [record, responseRecord]);

  const updateRecordHandler = (e, index, instrumentName, exchange, orderType, weightage, price, quantity) => {
    e.preventDefault();
    dispatch(setInstrumentName(instrumentName));
    dispatch(setExchange(exchange));
    dispatch(setOrderType(orderType));
    dispatch(setWeightage(weightage));
    dispatch(setPrice(price));
    dispatch(setQuantity(quantity));
    setUserId(index);
    console.log(index, instrumentName, exchange, orderType, weightage, price, quantity)
  }

  const deleteRecordHandler = async(e, index) => {
    e.preventDefault();
    const deletionSuccessful = await deleteRecord(index);
    if(deletionSuccessful && records){
      setRecords((prevElement) => {
        return prevElement.filter((record) => record.index != index)
      })
    }
    else{
      console.error("Record deletion failed!");
    }
  }

  return (
    <div className='container mx-auto my-8'>
      <div className='flex shadow border-b'>
         <table className='min-w-full'>
          <thead className='bg-gray-200'>
            <tr>
              <th className='text-center font-medium text-black uppercase tracking-wide py-3 px-6'>S.No</th>
              <th className='text-center font-medium text-black uppercase tracking-wide py-3 px-6'>Stock</th>
              <th className='text-center font-medium text-black uppercase tracking-wide py-3 px-6'>Exchange</th>
              <th className='text-center font-medium text-black uppercase tracking-wide py-3 px-6'>Order Type</th>
              <th className='text-center font-medium text-black uppercase tracking-wide py-3 px-6'>Weights %</th>
              <th className='text-center font-medium text-black uppercase tracking-wide py-3 px-6'>Price &#8377;</th>
              <th className='text-center font-medium text-black uppercase tracking-wide py-3 px-6'>Quantity</th>
              <th className='text-center font-medium text-black uppercase tracking-wide py-3 px-6'>Actions</th>
            </tr>
          </thead>
          { 
            <tbody className='bg-white'>
              {records.map((record, index) => (
                <BasketRecords 
                  record={record} 
                  index={index} 
                  deleteRecord={deleteRecordHandler} 
                  updateRecord={updateRecordHandler} 
                />
                ))}
            </tbody>
          }
        </table>
      </div>
      <UpdateRecord 
        userId={userId}  
        setResponseRecord={setResponseRecord} 
        setUserId={setUserId} 
      />   
    </div>
  )
}

export default Table;