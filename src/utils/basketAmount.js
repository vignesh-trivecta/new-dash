import { setBasketAmount } from '@/store/basketSlice';
import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const BasketAmount = () => {
  const dispatch = useDispatch();
  const basketAmount = useSelector((state) => state.basket.basketAmount);

  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    // Set the focus to the input element whenever basketName changes
    inputRef.current.focus();
  }, [basketAmount]);

  const handleChange = (e) => {
    const inputValue = e.target.value;
    console.log(inputValue);
    setInputValue(inputValue);
    dispatch(setBasketAmount(inputValue));
  };

  return (
    <div>
      <input
        type='text'
        className='w-24 rounded-md border-gray-300'
        onChange={handleChange}
        ref={inputRef}
      />
    </div>
  );
};

export default BasketAmount;
