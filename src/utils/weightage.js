import React, { useState } from 'react';
import { setQuantity, setWeightage } from '@/store/addRecordSlice';
import { sendWeightage } from '@/app/api/basket/route';
import { useDispatch, useSelector } from 'react-redux';


const Weightage = ({ lweightage }) => {

    const [inputValue, setInputValue] = useState('');
    const weightage = useSelector((state) => state.add.weightage);
    const price = useSelector((state) => state.add.price);
    const basketAmount = useSelector((state) => state.basket.basketAmount);
    const dispatch = useDispatch();

  // Event handler
  const handleChange = (e) => {
    const newValue = e.target.value;
    
    // Parse the input value as an integer
    const parsedValue = parseInt(newValue, 10);

    // Check if the parsed value is a valid number (not NaN) and greater than or equal to 1
    if (!isNaN(parsedValue) && parsedValue >= 1) {
      setInputValue(newValue); // Update the local state only if the value is valid
    } else if (newValue === '') {
      setInputValue(''); // If the input is empty, clear the local state
    }

    dispatch(setWeightage(newValue));
    quantityAPI();
  };

    // //function to get the quantity of stocks based on weightage
    const quantityAPI = async () => {
        console.log('api call enter')
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