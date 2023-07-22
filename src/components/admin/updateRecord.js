import React, { useEffect, useState } from 'react';
import { Button, Label, Modal } from 'flowbite-react';
import { useDispatch, useSelector } from 'react-redux';
import Weightage from '@/utils/weightage';
import { getEquityPrice, updateRecordAPI } from '@/app/api/basket/route';
import UpdateSearchDropdown from '@/utils/updateSearchDropdown';

const UpdateRecord = ({ recId, instrumentName, exchange, transType, weightage, price, quantity, handleFetch, setHandleFetch }) => {

    const [openModal, setOpenModal] = useState(false);
    const props = { openModal, setOpenModal };

    let [localPrice, setLocalPrice] = useState(price);
    let [localExchange, setLocalExchange] = useState(exchange);
    let [localTransType, setLocalTransType] = useState(transType);

    const dispatch = useDispatch();
    const basketName = useSelector((state) => state.basket.basketName);
    const basketAmount = useSelector((state) => state.basket.basketAmount);
    const adminId = useSelector((state) => state.user.username);

    const selectedStock = useSelector((state) => state.add.selectedStock);
    // let exchange = useSelector((state) => state.add.exchange);
    // let transType = useSelector((state) => state.add.transType);
    // let weightage = useSelector((state) => state.add.weightage);
    // let price = useSelector((state) => state.add.price);
    // let quantity = useSelector((state) => state.add.quantity);

    const handleUpdate = () => {
        console.log(selectedStock, localExchange, localTransType, weightage, localPrice, quantity);
        const postDataAPI = async() => {
            const data = await updateRecordAPI(recId, basketName, adminId, selectedStock, localExchange, localTransType, quantity, weightage, localPrice, basketAmount);
        }
        postDataAPI();
        setHandleFetch(!handleFetch);
        props.setOpenModal(undefined);
    }

    const handleExchange = (exchange) => {
        setLocalExchange(exchange);
        const fetchPrice = async () => {
            const data = await getEquityPrice(selectedStock, localExchange);
            setLocalPrice(data);
            console.log(selectedStock, localExchange);
        }
        fetchPrice();
    }

    const handleTransType = (transType) => {
        setLocalTransType(transType);
    }


  return (
    <div>
        <Button onClick={() => {props.setOpenModal('update-form-elements')}}>Update</Button>
        <Modal show={props.openModal === 'update-form-elements'}  popup onClose={() => props.setOpenModal(undefined)}>
            <Modal.Header />
            <Modal.Body>
                <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-10">Update record</h3>
                <div className='grid grid-rows-4 grid-cols-3 gap-x- gap-y-4'>
                    <Label htmlFor="stock" value="Stock" className='text-md' />
                    <div className=''>
                        <UpdateSearchDropdown instrumentName={instrumentName} id="stock" />
                    </div>

                    <div className='col-start-3 row-start-1 flex flex-col ml-8'>
                        <Label htmlFor="price" value="Price" className='' />
                        <input disabled id='price' name="price" type="number" value={localPrice} className='w-full bg-gray-200 rounded-md border border-gray-100' />
                    </div>

                    <Label value="Exchange" className='col-start-1 row-start-2 text-md' />
                    <div className=' col-start-2 row-start-2'>
                    <input 
                        id="bse" 
                        name="exchange" 
                        type='radio' 
                        value="BSE"
                        checked={localExchange === "BSE"}
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
                            checked={localExchange === "NSE"}
                            onClick={() => {
                                handleExchange("NSE");
                                console.log('nse')
                            }} />
                        <label htmlFor='nse' className='ml-1'>NSE</label>
                    </div>

                    <Label htmlFor="weightage" value="Weightage %" className='col-start-1 row-start-3 text-md' />
                    <div className='rounded-md col-start-2 row-start-3 h-10'>
                        <Weightage lweightage={weightage} />
                    </div>

                    <Label value="Transaction Type" className='col-start-1 row-start-4 text-md'/>
                    <div className='col-start-2'>
                        <input 
                            id="buy" 
                            name="transType" 
                            type='radio' 
                            value="BUY" 
                            checked={localTransType === "BUY"} 
                            onClick={() => handleTransType("BUY")} 
                        />
                        <label htmlFor='buy' className='ml-1'>BUY</label>
                        <input 
                            id="sell" 
                            name="transType" 
                            type='radio' 
                            value="SELL" 
                            checked={localTransType === "SELL"} 
                            className='ml-1' 
                            onClick={() => handleTransType("SELL")}  
                        />
                        <label htmlFor='sell' className='ml-1'>SELL</label>
                    </div>

                    <div className='col-start-3 row-start-3 flex flex-col ml-8'>
                        <Label htmlFor='quantity' value="Quantity" />
                        <input 
                            disabled 
                            id='quantity' 
                            name='quantity' 
                            type="number" 
                            value={quantity} 
                            className='w-full bg-gray-200 border border-gray-200 rounded-md' 
                        />
                    </div>


                </div>
                <div className="flex justify-center mt-4">
                    <Button type='submit'  onClick={handleUpdate} className='border bg-cyan-800 rounded-md p-2 text-white hover:bg-cyan-700'>Update</Button>
                    <Button color="gray" onClick={() => { props.setOpenModal(undefined)}} className='border p-2 border-gray-400 rounded-md ml-4 hover:bg-orange-500 hover:text-white hover:border-orange-500'>Close</Button>
                </div>
            </Modal.Body>
        </Modal>   
    </div>
  )
}

export default UpdateRecord;