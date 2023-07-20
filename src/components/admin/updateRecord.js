import React, { useEffect, useState } from 'react';
import { Button, Label, Modal } from 'flowbite-react';
import { useDispatch, useSelector } from 'react-redux';
import SearchDropdown from '@/utils/searchDropdown';
import Weightage from '@/utils/weightage';
import { setInstrumentName, setExchange, setOrderType, setWeightage, setQuantity, setPrice } from '@/store/addRecordSlice';
import { getEquityPrice, updateRecordAPI } from '@/app/api/basket/route';


const updateRecord = ({ recId, setResponseRecord, setRecId, responseRecord, updateCall }) => {

    const [openModal, setOpenModal] = useState(false);
    const props = { openModal, setOpenModal };

    const dispatch = useDispatch();
    const selectedStock = useSelector((state) => state.add.selectedStock);
    const basketName = useSelector((state) => state.basket.basketName);
    const basketAmount = useSelector((state) => state.basket.basketAmount);
    const adminId = useSelector((state) => state.user.user);
    let exchange = useSelector((state) => state.add.exchange);
    let orderType = useSelector((state) => state.add.orderType);
    let weightage = useSelector((state) => state.add.weightage);
    let price = useSelector((state) => state.add.price);
    let quantity = useSelector((state) => state.add.quantity);

    const handleUpdate = () => {
        console.log(selectedStock, exchange, orderType, weightage, price, quantity);
        const postDataAPI = async() => {
            const data = await updateRecordAPI(recId, basketName, adminId, selectedStock, exchange, orderType, quantity, weightage, price, basketAmount);
        }
        postDataAPI();
        updateCall();
        setResponseRecord(!responseRecord);
        props.setOpenModal(undefined);
    }

    const handleExchange = (exchange) => {
        dispatch(setExchange(exchange));
        const fetchPrice = async () => {
            const data = await getEquityPrice(selectedStock, exchange);
            dispatch(setPrice(data));
            console.log(selectedStock, exchange);
        }
        fetchPrice();
    }

    useEffect(() => {
        // Check if the 'recId' prop is present and not null or undefined
        if (recId !== null && recId !== undefined) {
          // Set the modal to open when 'recId' is present
          props.setOpenModal("form-elements");
          setRecId(null);
        } else {
          // Set the modal to close when 'recId' is not present
          props.setOpenModal(undefined);
        }
      }, [recId]);
      
      


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
                    <input 
                        id="bse" 
                        name="exchange" 
                        type='radio' 
                        value="BSE"
                        checked={exchange === "BSE"}
                        onClick={() => {
                            handleExchange("BSE");
                            console.log('bse')
                        }} 
                    />                                    
                        <label htmlFor='bse' className='ml-1'>BSE</label>
                        <input 
                            id="nse" 
                            name="exchange" 
                            type='radio' 
                            value="NSE" 
                            className='ml-1' 
                            checked={exchange === "NSE"}
                            onClick={() => {
                                handleExchange("NSE");
                                console.log('nse')
                            }} />
                        <label htmlFor='nse' className='ml-1'>NSE</label>
                    </div>

                    <Label htmlFor="weightage" value="Weightage %" className='col-start-1 row-start-3 text-md' />
                    <div className='rounded-md col-start-2 row-start-3 h-10'>
                        <Weightage />
                    </div>

                    <Label value="Order Type" className='col-start-1 row-start-4 text-md'/>
                    <div className='col-start-2'>
                        <input id="buy" name="orderType" type='radio' value="BUY" checked={orderType === "BUY"} onClick={() => {dispatch(setOrderType("BUY"))}} />
                        <label htmlFor='buy' className='ml-1'>BUY</label>
                        <input id="sell" name="orderType" type='radio' value="SELL" checked={orderType === "SELL"} className='ml-1' onClick={() => dispatch(setOrderType("SELL"))} />
                        <label htmlFor='sell' className='ml-1'>SELL</label>
                    </div>

                    <div className='col-start-3 row-start-3 flex flex-col ml-8'>
                        <Label htmlFor='quantity' value="Quantity" />
                        <input disabled id='quantity' name='quantity' type="number" value={quantity} className='w-full bg-gray-200 border border-gray-200 rounded-md' />
                    </div>


                </div>
                <div className="flex justify-center mt-4">
                    <button type='submit' onClick={handleUpdate} className='border bg-cyan-800 rounded-md p-2 text-white hover:bg-cyan-700'>Update</button>
                    <button type='button' onClick={() => { props.setOpenModal(undefined)}} className='border p-2 border-gray-400 rounded-md ml-4 hover:bg-orange-500 hover:text-white hover:border-orange-500'>Close</button>
                </div>
            </Modal.Body>
        </Modal>   
    </div>
  )
}

export default updateRecord;