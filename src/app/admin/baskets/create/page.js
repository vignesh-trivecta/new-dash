'use client';

import AddRecord from '@/components/admin/addRecord';
import React, { useEffect, useState } from 'react';
import { Button, Label, Modal } from 'flowbite-react';
import { useDispatch, useSelector } from 'react-redux';
import { setBasketAmount, setBasketName } from '@/store/basketSlice';
import BasketName from '@/utils/basketName';
import BasketAmount from '@/utils/basketAmount';

const CreateBasket = () => {

  const [openModal, setOpenModal] = useState(false);
  const props = { openModal, setOpenModal };

  const dispatch = useDispatch();
  const basketName = useSelector((state) => state.basket.basketName);
  const basketAmount = useSelector((state) => state.basket.basketAmount);

  useEffect(() => {
    dispatch(setBasketName(""));
    dispatch(setBasketAmount(""));
    props.setOpenModal("form-elements");
  }, [])

  return (
    <div className='container mx-auto my-8'>
      <h3 className='mb-2 font-bold'>Create new Basket</h3>
        {/* Investment details row */}
      <div className="grid grid-cols-3 gap-4 mb-2">
        <div className="flex items-center">
          <p className="text-black dark:text-white mr-2">Investment Amount</p>
          <input disabled type="number" value={basketAmount} className="border border-gray-200 rounded-lg w-44" />
        </div>
        <div className="flex items-center">
          <p className="text-black dark:text-white mr-2">Basket Value</p>
          <input disabled type="number" className="border border-gray-200 rounded-lg w-44" />
        </div>
        <div className="flex items-center">
          <p className="text-black dark:text-white mr-2">Basket Name</p>
          <input disabled type="text" value={basketName} className="border border-gray-200 rounded-lg w-44" />
        </div>
      </div>
      <AddRecord />
      <div>
        <Modal show={props.openModal === 'form-elements'} size={'sm'} popup onClose={() => props.setOpenModal(undefined)}>
            <Modal.Header />
            <Modal.Body>
              <h4 className="text-xl font-medium text-gray-900 dark:text-white mb-4">Create New Basket</h4>
              <hr />
              <div className='grid grid-rows-2 grid-cols-2 gap-4 mt-4'>
                
                <div className='flex items-center justify-end'>
                  <Label htmlFor='basketName' value="Basket Name" className='' /> 
                </div>
                <BasketName autoFocus={true} />

                <div className='flex items-center justify-end'>
                  <Label htmlFor='basketAmount' value="Basket Amount" className='' /> 
                </div>                
                <BasketAmount />
              </div>
              <div className='flex justify-center mt-4'>
                <button type='submit' onClick={() => props.setOpenModal(undefined)} className='bg-cyan-700 text-white p-2 rounded-md hover:bg-cyan-800'>Submit</button>
              </div>
            </Modal.Body>
        </Modal>
    </div>
    </div>
  )
}

export default CreateBasket;