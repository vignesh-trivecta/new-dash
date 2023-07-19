'use client';
import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sendWeightage } from '@/app/api/basket/route';
import { setBasketAmount } from '@/store/basketSlice';
import { setQuantity, setWeightage } from '@/store/addRecordSlice';


const Weightage = () => {
    
    const weightage = useSelector((state) => state.add.weightage);
    const price = useSelector((state) => state.add.price);
    const basketAmount = useSelector((state) => state.basket.basketAmount);
    const dispatch = useDispatch();

    const [inputValue, setInputValue] = useState('');

    // //function to get the quantity of stocks based on weightage
    const quantityAPI = async () => {
        const quantity = await sendWeightage(weightage, basketAmount, price);
        dispatch(setQuantity(quantity));
    }

    // Event handler
    const handleChange = (e) => {
        e.preventDefault();
        const newValue = e.target.value;
        setInputValue(e.target.value);
        dispatch(setWeightage(newValue));
        quantityAPI();
    };

    return(
        <div className=''>
            <input type='number' 
                value={inputValue}
                onChange={handleChange} 
                className='w-full border border-gray-200 rounded-md' 
                autoFocus
            />
        </div>
    )
}

export default Weightage;