import Link from 'next/link'
import React from 'react'

const BasketRecords = ({ record, index, deleteRecord, updateRecord }) => {
  return (
        <tr key={index} className='hover:bg-gray-100'>
              <td className='text-center px-6 py-4 whitespace-nowrap'>
                <div className='text-sm text-gray-700'>{index}</div>
              </td>
              <td className='text-center px-6 py-4 whitespace-nowrap'>
                <div className='text-sm text-gray-700'>{record.instrumentName}</div>
              </td>
              <td className='text-center px-6 py-4 whitespace-nowrap'>
                <div className='text-sm text-gray-700'>{record.exchange}</div>
              </td>
              <td className='text-center px-6 py-4 whitespace-nowrap'>
                <div className='text-sm text-gray-700'>{record.orderType}</div>
              </td>
              <td className='text-right px-6 py-4 whitespace-nowrap'>
                <div className='text-sm text-gray-700'>{record.weightage}</div>              
              </td>
              <td className='text-right px-6 py-4 whitespace-nowrap'>
                <div className='text-sm text-gray-700'>{record.price}</div>
              </td>
              <td className='text-right px-6 py-4 whitespace-nowrap'>
                <div className='text-sm text-gray-700'>{record.quantity}</div>
              </td>
              <td className='text-left px-6 py-4 whitespace-nowrap'>
                <Link
                href="#"
                onClick={(e) => {
                  updateRecord(e, index, record.instrumentName, record.exchange, record.orderType, record.weightage, record.price, record.quantity);
                }}
                className='text-indigo-600 hover:text-indigo-800 hover:cursor-pointer px-4'
                >
                  Update
                </Link>
                <Link
                href="#"
                onClick={(e) => deleteRecord(e, index)}
                className='text-indigo-600 hover:text-indigo-800 hover:cursor-pointer'
                >
                  Delete
                </Link>
              </td>
            </tr>
  )
}

export default BasketRecords