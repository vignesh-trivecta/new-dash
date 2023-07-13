import React, {useState, useEffect} from 'react';


 const Weightage = ({quantityAPI}) => {

    const [weightage, setWeightage] = useState(null);

    // //function to get the quantity of stocks based on weightage
    // const quantityAPI = async () => {
    // const quantity = await sendWeightage(weightage, basketAmount, equityPrice);
    //     setQuantity(quantity);
    // }

    return(
        <div className=''>
            <div className="font-normal">
                <label>Weightage %</label>
            </div>
            <div>
                <input type='text' 
                    onChange={(e) => {
                    setWeightage(e.target.value);
                    quantityAPI();
                    }} 
                    className='w-32 border border-gray-300 rounded-md' 
                />
            </div>
        </div>
    )
}

export default Weightage;