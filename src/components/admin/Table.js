'use client';

import React, { useEffect, useState } from 'react';
import { getRecords, deleteRecord } from '@/app/api/basket/route';
import BasketRecords from '@/components/admin/basketRecords';
import UpdateRecord from './updateRecord';
import { setInstrumentName, setExchange, setOrderType, setWeightage, setQuantity, setPrice, setRecId } from '@/store/addRecordSlice';
import { useDispatch, useSelector } from 'react-redux';

const Table = ({record}) => {

  let [records, setRecords] = useState([]);
  // let [userId, setUserId] = useState(null);
  let [responseRecord, setResponseRecord] = useState(false);

  const dispatch = useDispatch();
  const basketName = useSelector((state) => state.basket.basketName);
  const adminId = useSelector((state) => state.user.user);
  const recId = useSelector((state) => state.add.recId);
  // const instrumentName = useSelector((state) => state.add.instrumentName);
  // const exchange = useSelector((state) => state.add.exchange);
  // const orderType = useSelector((state) => state.add.orderType);
  // const weightage = useSelector((state) => state.add.weightage);
  // const price = useSelector((state) => state.add.price);
  // const quantity = useSelector((state) => state.add.quantity);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getRecords(adminId, basketName);
      console.log(response);
      setRecords(response);
    }
    fetchData();
  }, [record, responseRecord, basketName, recId]);

  const updateCall = () => {
    setResponseRecord(!responseRecord);
  }

  const updateRecordHandler = (e, index, instrumentName, exchange, orderType, weightage, price, quantity) => {
    e.preventDefault();
    dispatch(setInstrumentName(instrumentName));
    dispatch(setExchange(exchange));
    dispatch(setOrderType(orderType));
    dispatch(setWeightage(weightage));
    dispatch(setPrice(price));
    dispatch(setQuantity(quantity));
    dispatch(setRecId(index));
    console.log(index, instrumentName, exchange, orderType, weightage, price, quantity)
  }

  const deleteRecordHandler = async(e, index, recordId) => {
    e.preventDefault();
    const deletionSuccessful = await deleteRecord(recordId, basketName, adminId);
    setResponseRecord(!responseRecord);
  }

  return (
    <div className='container mx-auto my-8'>
      <div className='flex shadow border-b'>
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
              {records && records.length > 0 ? (records.map((record, index) => (
                <BasketRecords 
                  record={record} 
                  index={index} 
                  deleteRecord={deleteRecordHandler} 
                  updateRecord={updateRecordHandler} 
                />
                ))) : <p>No table data</p>}
            </tbody>
          }
        </table>
      </div>
      <UpdateRecord 
        recId={recId}  
        setResponseRecord={setResponseRecord} 
        setRecId={setRecId} 
        responseRecord={responseRecord}
        updateCall={updateCall}
      />   
    </div>
  )
}

export default Table;