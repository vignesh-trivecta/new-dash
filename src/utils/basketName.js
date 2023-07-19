import { setBasketName } from '@/store/basketSlice';
import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const BasketName = ({autoFocus}) => {
  const dispatch = useDispatch();
  const basketName = useSelector((state) => state.basket.basketName);

  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    // Set the focus to the input element whenever basketName changes
    inputRef.current.focus();
  }, [basketName]);

  const handleChange = (e) => {
    const inputValue = e.target.value;
    setInputValue(inputValue);
    dispatch(setBasketName(inputValue));
  };

  return (
    <div>
      <input
        type='text'
        className='w-32 rounded-md border-gray-300'
        onChange={handleChange}
        autoFocus={true}
        ref={inputRef}
      />
    </div>
  );
};

export default BasketName;
