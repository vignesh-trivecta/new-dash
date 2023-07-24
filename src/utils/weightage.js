import React, { useState } from 'react';
import { setQuantity, setWeightage } from '@/store/addRecordSlice';
import { sendWeightage } from '@/app/api/basket/route';
import { useDispatch, useSelector } from 'react-redux';


const Weightage = ({ lweightage, lprice }) => {

  // local state variable
  const [inputValue, setInputValue] = useState(lweightage || '');

  // redux state values
  const weightage = useSelector((state) => state.add.weightage);
  const price = useSelector((state) => state.add.price);
  const basketAmount = useSelector((state) => state.basket.basketAmount);
  const dispatch = useDispatch();

  // Event handler
  const handleChange = (e) => {
    const newValue = e.target.value;
    console.log(newValue)
    setInputValue(newValue);
    dispatch(setWeightage(newValue));
    quantityAPI();
  };

  // //function to get the quantity of stocks based on weightage
  const quantityAPI = async () => {
      console.log('api call enter');
      console.log(weightage, basketAmount, price)
      const quantity = await sendWeightage(weightage, basketAmount, price);
      console.log("setting price")
      dispatch(setQuantity(quantity));
  }

  return (
    <div className=''>
      <input
        type='number'
        value={inputValue}
        onChange={handleChange}
        className='w-full border border-gray-200 rounded-md'
        autoFocus
      />
    </div>
  );
};

export default Weightage;



// 'use client';
// import React, {useState, useEffect} from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { sendWeightage } from '@/app/api/basket/route';
// import { setBasketAmount } from '@/store/basketSlice';
// import { setQuantity, setWeightage } from '@/store/addRecordSlice';


// const Weightage = ({ lweightage }) => {
    
//     const weightage = useSelector((state) => state.add.weightage);
//     const price = useSelector((state) => state.add.price);
//     const basketAmount = useSelector((state) => state.basket.basketAmount);
//     const dispatch = useDispatch();

//     const [inputValue, setInputValue] = useState('');


//     // //function to get the quantity of stocks based on weightage
//     const quantityAPI = async () => {
//         console.log('api call enter')
//         const quantity = await sendWeightage(weightage, basketAmount, price);
//         console.log("setting price")
//         dispatch(setQuantity(quantity));
//     }

//     // Event handler
//     const handleChange = (e) => {
//         e.preventDefault();
//         const newValue = e.target.value;
//         dispatch(setWeightage(newValue));
//         quantityAPI();
//     };

//     return(
//         <div className=''>
//             <input type='number' 
//                 value={lweightage}
//                 onChange={handleChange} 
//                 className='w-full border border-gray-200 rounded-md' 
//                 autoFocus
//             />
//         </div>
//     )
// }

// export default Weightage;