
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
            if (responseText) {
            data = JSON.parse(responseText);
            }
        }
        if (data) {
            return data.price;
        } else {
            throw new Error("Failed to fetch equity price data");
        }
    }
    catch(error){
        throw new Error("Not able to fetch data");
    }

}

// API call to get the constituents and exchange details
export const getInstrumentDetails = async () => {
    try{
        const response = await fetch("http://localhost:8083/trading/instruments")
        
        if(response.ok){
            const jsonData = await response.json();
            return jsonData;
        }
        else{
            throw new Error("Failed to fetch data");
        }
        
    }
    catch(error){
        console.log(error)
        throw new Error("Not able to fetch data");
    }
}

// API call to post the weightage and get the quantity and total price
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
            if(responseText){
                data = JSON.parse(responseText);
            }
        }
        if(data){
            return data.quantity;
        } else {
            throw new Error("Failed to fetch the quantity data");
        }
    }
    catch(error){
        throw new Error("Not able to fetch data");
    }
}