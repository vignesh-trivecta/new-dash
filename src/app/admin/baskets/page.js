'use client'

import { Button, Checkbox, Label, Modal, TextInput } from 'flowbite-react';
import { useState } from 'react';
import { useRouter } from "next/navigation";
import { setBasketName, setBasketAmount } from '@/store/basketSlice';
import { useDispatch } from 'react-redux';

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
      <Button onClick={() => props.setOpenModal('form-elements')} className="bg-blue-500">Create new Basket</Button>
      <Modal show={props.openModal === 'form-elements'} size="md" popup onClose={() => props.setOpenModal(undefined)}>
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