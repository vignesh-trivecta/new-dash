import { setSelectedStock } from '@/store/addRecordSlice';
import Link from 'next/link'
import React from 'react'
import { useDispatch } from 'react-redux'
import UpdateRecord from './updateRecord';

const BasketRecords = ({ record, index, deleteRecord, handleFetch, setHandleFetch }) => {

  const dispatch = useDispatch();
  return (
        <tr key={index} className="bg-white border dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600">
              <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                <div className='text-sm text-gray-700'>{index+1}</div>
              </th>
              <td className="px-6 py-4">
                <div className='text-sm text-gray-700'>{record.instrumentName}</div>
              </td>
              <td className="px-6 py-4">
                <div className='text-sm text-gray-700'>{record.exchangeUsed}</div>
              </td>
              <td className="px-6 py-4">
                <div className='text-sm text-gray-700'>{record.transType}</div>
              </td>
              <td className="px-6 py-4">
                <div className='text-sm text-gray-700'>{record.weightValue}</div>              
              </td>
              <td className="px-6 py-4">
                <div className='text-sm text-gray-700'>{record.priceValue}</div>
              </td>
              <td className="px-6 py-4">
                <div className='text-sm text-gray-700'>{record.quantityValue}</div>
              </td>
              <td className="px-6 py-4">
                < UpdateRecord 
                recId={record.recId} 
                instrumentName={record.instrumentName} 
                exchange={record.exchangeUsed}
                orderType={record.transType}
                weightage={record.weightValue}
                price={record.priceValue}
                quantity={record.quantityValue}
                handleFetch={handleFetch} 
                setHandleFetch={setHandleFetch}
                />
                {/* <Link
                href="#"
                onClick={(e) => {
                  updateRecord(e, record.recId, record.instrumentName, record.exchangeUsed, record.transType, record.weightValue, record.priceValue, record.quantityValue);
                  dispatch(setSelectedStock(record.instrumentName));
                }}
                className='text-indigo-600 hover:text-indigo-800 hover:cursor-pointer px-4'
                >
                  Update
                </Link> */}
                <Link
                href="#"
                onClick={(e) => deleteRecord(e, index, record.recId)}
                className='text-indigo-600 hover:text-indigo-800 hover:cursor-pointer'
                >
                  Delete
                </Link>
              </td>
            </tr>
  )
}

export default BasketRecords