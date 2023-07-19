// API call to fetch the table records
export const getRecords = async(adminId, basketName) => {
    try{
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {
                      "adminId": adminId,
                      "basketName": basketName
                    }
                
            )
        };
        let data;
        const response = await fetch("http://localhost:8083/basket/temp/list", requestOptions);

        if (response.ok) {
            const responseText = await response.text();
            data = JSON.parse(responseText);
            console.log(data)
            return data;
        } else {
            const errorText = await response.text();
            throw new Error(`Failed to fetch data: ${errorText}`);
        }
    }
    catch(error){
        console.log(error)
    }
}


// API call to add a new record
export const addRecord = async({record}) => {
    try{
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                record
            })
        };
        let data;
        const response = await fetch("http://localhost:8083/basket/temp", requestOptions);

        if (response.ok) {
            const responseText = await response.text();
            data = JSON.parse(responseText);
            console.log("Response ok", data)
            return data;
        } else {
            const errorText = await response.text();
            throw new Error(`Failed to fetch data: ${errorText}`);
        }
    }
    catch(error){
        console.log(error);
    }
}


// API  call to edit a record in table



// API call to delete a record from table
export const deleteRecord = async(index) => {
    try{
        const requestOptions = {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "index": index,
            })
        }
        const response = await fetch("http://localhost:8083/", requestOptions);

        if (response.ok) {
            return true;
        }
        else {
            return false;
        }
    }
    catch(error){
        console.log(error);
    }
}





// API call for getting the price of Equity
export const getEquityPrice = async (instrumentName, exchange) => {
    try {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "instrumentName": instrumentName,
                "exchangeValue": exchange,
            })
        };

        let data;
        const response = await fetch("http://localhost:8083/equity-price", requestOptions);
        
        if (response.ok) {
            const responseText = await response.text();
            data = JSON.parse(responseText);
            console.log("Response ok", data);
            return data.price;
        } else {
            const errorText = await response.text();
            throw new Error(`Failed to fetch data: ${errorText}`);
        }
    }
    catch(error){
        console.log(error);
    }

}

// API call to get the stocks details
export const getInstrumentDetails = async () => {
    try{
        const response = await fetch("http://localhost:8083/instruments")
        
        if(response.ok){
            const jsonData = await response.json();
            console.log(jsonData)
            return jsonData;
        }
        else {
            const errorText = await response.text();
            throw new Error(`Failed to fetch data: ${errorText}`);
        }
        
    }
    catch(error){
        return [
            "ASIAN PAINTS", "YES BANK", "SUZLON ENERGY", "RELIANCE POWER", "OIL AND NATURAL GAS CORP",
            "DCB BANK", "KARUR VYSYA BANK"];
    }
}

// API call to post the weightage and get the quantity
export const sendWeightage = async(weightage, totalAmount, priceofAsset) => {
    try{
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "weightAge": weightage,
                "totalAmount": totalAmount,
                "priceofAsset": priceofAsset,
            })
        }

        let data;
        const response = await fetch("http://localhost:8083/quantity-calc", requestOptions);

        if(response.ok) {
            const responseText = await response.text();
            data = JSON.parse(responseText);
            console.log(data)
            return data.quantity;
        } else {
            const errorText = await response.text();
            console.log(errorText);
        }
    }
    catch(error){
        console.log(error);
    }
}

// API call to get the Customer details
export const getCustomers = async() => {
    try{
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const response = await fetch("https://localhost:8083/", requestOptions);

        if(response.ok){
            const jsonData = await response.json();
            return jsonData;
        }
        else {
            const errorText = await response.text();
            throw new Error(`Failed to fetch data: ${errorText}`);
        }
    }
    catch(error){
        return [
{
"name": "Muthu Kumar",
"contactOne": "9812937972",
"email": "muthu787@gmail.com"
},
{
"name": "Raji Vinod",
"contactOne": "7773177888",
"email": "raji345@hotmail.com"
},
{
"name": "Aadhan Madhankumar",
"contactOne": "6213612398",
"email": "aadhan@gmail.com"
},
{
"name": "Shravan Madhankumar",
"contactOne": "2187827889",
"email": "shravan@hotmail.com"
},
{
"name": "vimala parmasivam",
"contactOne": "9095555569",
"email": "vimala@gmail.com"
}
];
    }
}