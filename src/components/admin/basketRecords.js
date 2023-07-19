import Link from 'next/link'
import React from 'react'

const BasketRecords = ({ record, index, deleteRecord, updateRecord }) => {
  return (
        <tr key={index} className="bg-white border dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600">
              <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                <div className='text-sm text-gray-700'>{index}</div>
              </th>
              <td className="px-6 py-4">
                <div className='text-sm text-gray-700'>{record.instrumentName}</div>
              </td>
              <td className="px-6 py-4">
                <div className='text-sm text-gray-700'>{record.exchange}</div>
              </td>
              <td className="px-6 py-4">
                <div className='text-sm text-gray-700'>{record.orderType}</div>
              </td>
              <td className="px-6 py-4">
                <div className='text-sm text-gray-700'>{record.weightage}</div>              
              </td>
              <td className="px-6 py-4">
                <div className='text-sm text-gray-700'>{record.price}</div>
              </td>
              <td className="px-6 py-4">
                <div className='text-sm text-gray-700'>{record.quantity}</div>
              </td>
              <td className="px-6 py-4">
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