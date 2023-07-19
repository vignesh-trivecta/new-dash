import React, { useEffect, useState } from 'react';
import { Button, Label, Modal } from 'flowbite-react';
import { useDispatch, useSelector } from 'react-redux';
import SearchDropdown from '@/utils/searchDropdown';
import Weightage from '@/utils/weightage';
import { setInstrumentName, setExchange, setOrderType, setWeightage, setQuantity, setPrice } from '@/store/addRecordSlice';


const updateRecord = ({ userId, setResponseRecord, setUserId }) => {

    const [openModal, setOpenModal] = useState(false);
    const props = { openModal, setOpenModal };

    const dispatch = useDispatch();
    let instrumentName = useSelector((state) => state.add.instrumentName);
    let exchange = useSelector((state) => state.add.exchange);
    let orderType = useSelector((state) => state.add.orderType);
    let weightage = useSelector((state) => state.add.weightage);
    let price = useSelector((state) => state.add.price);
    let quantity = useSelector((state) => state.add.quantity);

    const handleUpdate = () => {
        console.log()
    }

    useEffect(() => {
        // Check if the 'userId' prop is present and not null or undefined
        if (userId !== null && userId !== undefined) {
          // Set the modal to open when 'userId' is present
          props.setOpenModal("form-elements");
          setUserId(null);
        }
        console.log( instrumentName, orderType, weightage, price, quantity)

      }, [userId]);
      


  return (
    <div>
        <Modal show={props.openModal === 'form-elements'}  popup onClose={() => props.setOpenModal(undefined)}>
            <Modal.Header />
            <Modal.Body>
                <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-10">Update record</h3>
                <div className='grid grid-rows-4 grid-cols-3 gap-x- gap-y-4'>
                    <Label htmlFor="stock" value="Stock" className='text-md' />
                    <div className=''>
                        <SearchDropdown id="stock" />
                    </div>

                    <div className='col-start-3 row-start-1 flex flex-col ml-8'>
                        <Label htmlFor="price" value="Price" className='' />
                        <input disabled id='price' name="price" type="number" value={price} className='w-full bg-gray-200 rounded-md border border-gray-100' />
                    </div>

                    <Label value="Exchange" className='col-start-1 row-start-2 text-md' />
                    <div className=' col-start-2 row-start-2'>
                        <input id="bse" name="exchange" type='radio' value="BSE" checked={exchange === "BSE"} onChange={() => dispatch(setExchange("BSE"))} />
                        <label htmlFor='bse' className='ml-1'>BSE</label>
                        <input id="nse" name="exchange" type='radio' value="NSE" checked={exchange === "NSE"} className='ml-1' onChange={() => dispatch(setExchange("NSE"))} />
                        <label htmlFor='nse' className='ml-1'>NSE</label>
                    </div>

                    <Label htmlFor="weightage" value="Weightage %" className='col-start-1 row-start-3 text-md' />
                    <div className='rounded-md col-start-2 row-start-3 h-10'>
                        <Weightage />
                    </div>

                    <Label value="Order Type" className='col-start-1 row-start-4 text-md'/>
                    <div className='col-start-2'>
                        <input id="buy" name="orderType" type='radio' value="Buy" checked={orderType === "Buy"} onChange={() => dispatch(setOrderType("Buy"))} />
                        <label htmlFor='buy' className='ml-1'>BUY</label>
                        <input id="sell" name="orderType" type='radio' value="Sell" checked={orderType === "Sell"} className='ml-1' onChange={() => dispatch(setOrderType("Sell"))} />
                        <label htmlFor='sell' className='ml-1'>SELL</label>
                    </div>

                    <div className='col-start-3 row-start-3 flex flex-col ml-8'>
                        <Label htmlFor='quantity' value="Quantity" />
                        <input disabled id='quantity' name='quantity' type="number" value={quantity} className='w-full bg-gray-200 border border-gray-200 rounded-md' />
                    </div>


                </div>
                <div className="flex justify-center mt-4">
                    <button type='submit' onClick={handleUpdate} className='border bg-cyan-800 rounded-md p-2 text-white hover:bg-cyan-700'>Update</button>
                    <button type='button' onClick={(e) => { props.setOpenModal(undefined)}} className='border p-2 border-gray-400 rounded-md ml-4 hover:bg-orange-500 hover:text-white hover:border-orange-500'>Close</button>
                </div>
            </Modal.Body>
        </Modal>   
    </div>
  )
}

export default updateRecord;