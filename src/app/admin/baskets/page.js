'use client'

import { Button, Checkbox, Label, Modal, TextInput } from 'flowbite-react';
import { useState } from 'react';
import { useRouter } from "next/navigation";
import { setBasketName, setBasketAmount } from '@/store/basketSlice';
import { useDispatch } from 'react-redux';
import BasketDetails from '@/components/admin/basketDetails';
// import { Button, Checkbox, Label, Modal, TextInput } from 'flowbite-react';
// import { useState, useRef } from 'react';
// import { useRouter } from "next/navigation";
// import { setBasketName, setBasketAmount } from '@/store/basketSlice';
// import { useDispatch } from 'react-redux';
// import BasketDetails from '@/components/admin/basketDetails';
// import { Tabs } from 'flowbite-react';
// import { MdOutlineAddShoppingCart, MdOutlineShoppingBasket } from 'react-icons/md';
// import Link from 'next/link';

const Customers = () => {

  const router = useRouter();
  const dispatch = useDispatch();



  function navigate() {
    router.push('/admin/baskets/create');
  }

  return (
    <div>
      <div>

          <BasketDetails />
          {/* <Tabs.Group
        aria-label="Default tabs"
        style="underline"
        ref={props.tabsRef}
        onActiveTabChange={(tab) => properties.setActiveTab(tab)}
      >
        <Tabs.Item active title="Baskets" icon={MdOutlineShoppingBasket}>
          This is <span className="font-medium text-gray-800 dark:text-white">Profile tab's associated content</span>.
          Clicking another tab will toggle the visibility of this one for the next. The tab JavaScript swaps classes to
          control the content visibility and styling.
        </Tabs.Item>
        <button title='afasafdfsa' icon={MdOutlineAddShoppingCart} onClick={() => setOpenModal('form-elements')}>
        <Tabs.Item>
          This is <span className="font-medium text-gray-800 dark:text-white">Dashboard tab's associated content</span>.
          Clicking another tab will toggle the visibility of this one for the next. The tab JavaScript swaps classes to
          control the content visibility and styling.
        </Tabs.Item>
        
        </button>
      </Tabs.Group> */}
      </div>      

      
    </div>
  )
}

export default Customers