'use client'

import { Button, Checkbox, Label, Modal, TextInput } from 'flowbite-react';
import { useState } from 'react';
import { useRouter } from "next/navigation";
import { setBasketName, setBasketAmount } from '@/store/basketSlice';
import { useDispatch } from 'react-redux';
import BasketDetails from '@/components/admin/basketDetails';

const Customers = () => {

  const router = useRouter();
  const dispatch = useDispatch();

  const [openModal, setOpenModal] = useState('');
  const props = { openModal, setOpenModal };

  function navigate() {
    router.push('/admin/baskets/create');
  }

  return (
    <div>
      <div>
        <div className='flex'>
          <h5 className='mt-4 mr-4 font-bold'>Baskets</h5>
          <Button onClick={() => props.setOpenModal('form-elements')} className="bg-blue-500">
          <svg class="w-4 h-4 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16"/>
          </svg>
            &nbsp;Create new Basket
            </Button>
        </div>
          <BasketDetails />
      </div>      
      <Modal show={props.openModal === 'form-elements'} size="md" popup onClose={() => props.setOpenModal(undefined)} className='py-36'>
        <Modal.Body className="p-4">
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">New Basket</h3>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="name" value="Enter new basket name" />
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
              <Button className="bg-blue-500" onClick={() => navigate()}>Create</Button>
              <Button className="bg-white text-black" onClick={() => props.setOpenModal(undefined)}>Back</Button>
            </div>
          </div>
          
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default Customers