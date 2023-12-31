import React, { useEffect, useState } from 'react';
import { LuEdit } from "react-icons/lu";
import { Button, Label, Modal } from 'flowbite-react';
import { useDispatch, useSelector } from 'react-redux';
import Weightage from '@/utils/weightage';
import { getEquityPrice, updateRecordAPI } from '@/app/api/basket/route';
import UpdateSearchDropdown from '@/utils/updateSearchDropdown';
import Image from 'next/image';
import Link from 'next/link';
import { segregate } from '@/utils/priceSegregator';
import { setExchange, setOrderType, setPrice, setQuantity, setSelectedStock, setTransType, setWeightage } from '@/store/addRecordSlice';

const UpdateRecord = ({ recId, instrumentName, exchange, transType, orderType, weightage, price, quantity, handleFetch, setHandleFetch }) => {

    // modal state
    const [openModal, setOpenModal] = useState(false);
    const props = { openModal, setOpenModal };
    
    // local state variables
    let [localPrice, setLocalPrice] = useState(price);
    let [localExchange, setLocalExchange] = useState(exchange);
    let [localOrderType, setLocalOrderType] = useState(orderType);
    let [localQuantity, setLocalQuantity] = useState(quantity);
    let [localStock, setLocalStock] = useState(instrumentName);
    const [toggle, setToggle] = useState(transType);
    // let [localTransType, setLocalTransType] = useState(transType);

    const dispatch = useDispatch();
    
    
    // redux store variables
    const basketName = useSelector((state) => state.basket.basketName);
    const basketAmount = useSelector((state) => state.basket.basketAmount);
    const adminId = useSelector((state) => state.user.username);
    const selectedStock = useSelector((state) => state.add.selectedStock);
    // let exchange = useSelector((state) => state.update.exchange);
    // let transType = useSelector((state) => state.update.transType);
    // let weightage = useSelector((state) => state.update.weightage);
    // let price = useSelector((state) => state.update.price);
    // let quantity = useSelector((state) => state.update.quantity);


    // handling update button click
    const handleUpdate = () => {
        const localtransType = toggle;
        console.log(localtransType);
        const postDataAPI = async() => {
            const data = await updateRecordAPI(recId, basketName, adminId, selectedStock, localExchange, localtransType, quantity, weightage, localPrice, basketAmount);
        }
        postDataAPI();
        setHandleFetch(!handleFetch);
        console.log(handleFetch)
        props.setOpenModal(undefined);
        
        dispatch(setSelectedStock(''));
    }

    // handling exchange radio button selection
    const handleExchange = (exchange) => {
        setLocalExchange(exchange);
        const fetchPrice = async () => {
            const data = await getEquityPrice(selectedStock, localExchange);
            setLocalPrice(data);
            console.log(selectedStock, localExchange);
        }
        fetchPrice();
    }

    // handling orderType radio button selection
    const handleOrderType = (type) => {
        setLocalOrderType(type); // Update localOrderType when a radio button is clicked
        dispatch(setOrderType(type)); // Update Redux state with the selected orderType
    }

    // handling transaction type toggle button
    const handleTransType = () => {
        if(toggle == 'BUY'){
            setToggle('SELL');
        }
        else if(toggle == 'SELL'){
            setToggle('BUY')
        }
    }


    // // Set localOrderType based on orderType when the component mounts
    // useEffect(() => {
    //     setLocalOrderType(orderType);
    // }, [orderType, openModal]);

    // useEffect(() => {
    //     if(transType == 'BUY'){
    //         setToggle('BUY');
    //     }
    //     else{
    //         setToggle('SELL')
    //     }
    // }, [])


  return (
    <div>

        {/* SVG icon for updating */}
        <Link href='#' onClick={() => {props.setOpenModal('update-form-elements')}}>
            <svg className="w-4 h-4 text-gray-500 hover:text-gray-800 dark:text-white" ariaHidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                <path d="M12.687 14.408a3.01 3.01 0 0 1-1.533.821l-3.566.713a3 3 0 0 1-3.53-3.53l.713-3.566a3.01 3.01 0 0 1 .821-1.533L10.905 2H2.167A2.169 2.169 0 0 0 0 4.167v11.666A2.169 2.169 0 0 0 2.167 18h11.666A2.169 2.169 0 0 0 16 15.833V11.1l-3.313 3.308Zm5.53-9.065.546-.546a2.518 2.518 0 0 0 0-3.56 2.576 2.576 0 0 0-3.559 0l-.547.547 3.56 3.56Z"/>
                <path d="M13.243 3.2 7.359 9.081a.5.5 0 0 0-.136.256L6.51 12.9a.5.5 0 0 0 .59.59l3.566-.713a.5.5 0 0 0 .255-.136L16.8 6.757 13.243 3.2Z"/>
            </svg>
        </Link>        
        
        {/* Modal for updating a record */}
        <Modal show={props.openModal === 'update-form-elements'}  popup 
        onClose={() => {
            props.setOpenModal(undefined);
        }}>
            <Modal.Header className={toggle == "SELL" ? "bg-orange-500" : "bg-cyan-800"}>
                    
                <label className="relative inline-flex items-center mb-4 cursor-pointer">
                    <input type="checkbox" value={toggle} onClick={handleTransType} className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-gray-300"></div>
                    <span className="ml-3 text-sm font-medium text-white dark:text-gray-300">{toggle}</span>
                </label>

            </Modal.Header>            
            <Modal.Body>
                <div className='grid grid-rows-4 grid-cols-3 gap-x- gap-y-4 mt-4'>

                    {/* Search Dropdown */}
                    <Label htmlFor="stock" value="Stock" className='text-md' />
                    <div className=''>
                        <UpdateSearchDropdown instrumentName={instrumentName} id="stock" />
                    </div>

                    {/* Price element */}
                    <div className='relative col-start-3 row-start-1 flex flex-col ml-8'>
                        <Label htmlFor="price" value="Price" className='absolute left-2 bg-white px-1 -top-2 text-sm z-10' />
                        <input disabled id='price' name="price" value={localPrice} type="number" className='absolute pl-8 w-full bg-gray-50 rounded-md border border-gray-200' />
                    </div>

                    {/* Exchange element */}
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

                    {/* Weightage element */}
                    <Label htmlFor="weightage" value="Weightage %" className='col-start-1 row-start-3 text-md' />
                    <div className='rounded-md col-start-2 row-start-3 h-10'>
                        <Weightage lweightage={weightage} lprice={localPrice} />
                    </div>

                    {/* <Label value="Transaction Type" className='col-start-1 row-start-4 text-md'/>
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
                    </div> */}  

                    {/* Order type element */}
                    <Label value="Order Type" className='col-start-1 row-start-4 text-sm'/>
                    <div className='col-start-2'>
                        <input id="market" name="orderType" type='radio' value="MARKET" checked={localOrderType === "MARKET"} onClick={() => handleOrderType("MARKET")} />
                        <label htmlFor='market' className='ml-1 text-sm'>MARKET</label>
                        <input id="limit" name="orderType" type='radio' value="LIMIT" className='ml-1' checked={localOrderType === "LIMIT"} onClick={() => handleOrderType("LIMIT")} />
                        <label htmlFor='limit' className='ml-1 text-sm'>LIMIT</label>
                    </div>
                                {/* {orderType === "LIMIT" && (
                                    <>
                                        <Label className='text-sm row-start-5 col-start-1'>Validity</Label>
                                        <div className='row-start-5 col-start-2'>
                                        <StockValidity />
                                        </div>
                                    </>
                                )} */}

                    {/* Quantity element */}
                    <div className='relative col-start-3 row-start-3 flex flex-col ml-8'>
                        <Label htmlFor='quantity' value="Quantity" className='absolute left-2 -top-2 bg-white px-1 text-sm z-10' />
                        <input disabled id='quantity' name='quantity' value={segregate(localQuantity)} type="string" className='absolute pl-8 p-2 w-full bg-gray-50 border border-gray-200 rounded-md' />
                    </div>


                </div>

                {/* Modal Butttons */}
                <div className="flex justify-center mt-4">
                    <button type='submit'  onClick={handleUpdate} className={`${toggle == 'SELL' ? "bg-orange-500 hover:bg-orange-600" : "bg-cyan-800 hover:bg-cyan-700"} border p-2 rounded-md text-white w-20`}>Update</button>
                    <Button color="gray" onClick={() => { props.setOpenModal(undefined)}} className='ml-2 text-md'>Cancel</Button>
                </div>
            </Modal.Body>
        </Modal>   
    </div>
  )
}

export default UpdateRecord;