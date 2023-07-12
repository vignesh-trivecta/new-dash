// API call for getting the price of Equity
export const getEquityPrice = async (constituent, exchange) => {
    try {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "instrumentName": constituent,
                "exchangeValue": exchange,
            })
        };

        let data;
        const response = await fetch("http://localhost:8083/equity-price", requestOptions);
        
        if (response.ok) {
            const responseText = await response.text();
            data = JSON.parse(responseText);
            return data.price;
        } else {
            const errorText = await response.text();
            throw new Error(`Failed to fetch data: ${errorText}`);
        }
    }
    catch(error){
        throw new Error("Not able to fetch data");
    }

}

// API call to get the stocks and exchange details
export const getInstrumentDetails = async () => {
    try{
        const response = await fetch("http://localhost:8083/trading/instruments")
        
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
        console.log(error)
        throw new Error("Not able to fetch data");
    }
}

// API call to post the weightage and get the quantity
export const sendWeightage = async(weightAge, totalAmount, priceofAsset) => {
    try{
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "weightAge": weightAge,
                "totalAmount": totalAmount,
                "priceofAsset": priceofAsset,
            })
        }

        let data;
        const response = await fetch("http://localhost:8083/quantity-calc", requestOptions);

        if(response.ok) {
            const responseText = await response.text();
            data = JSON.parse(responseText);
            return data.quantity;
        } else {
            const errorText = await response.text();
            throw new Error(`Failed to fetch data: ${errorText}`);
        }
    }
    catch(error){
        throw new Error("Not able to fetch data");
    }
}

// API call to get the Customer details
export const getCustomers = async() => {
    try{
        const response = await fetch("https://localhost:8083/");

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