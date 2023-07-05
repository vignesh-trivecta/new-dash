
// API call for getting the price of Equity
export const getEquityPrice = async (constituent, exchange) => {
    try {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "isinNumber": constituent,
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
        return 123;
    }

}

// API call to get the constituents and exchange details
export const getInstrumentDetails = async () => {
    try{
        const response = await fetch("http://localhost:8083/")
        
        if(response.ok){
            const jsonData = await response.json();
            return jsonData;
        }
        else{
            throw new Error("Failed to fetch data");
        }
        
    }
    catch(error){
        return [{"isinNo":"INE021A01026","instrumentName":"ASIAN PAINTS"},{"isinNo":"INE528G01035","instrumentName":"YES BANK"},{"isinNo":"INE040H01021","instrumentName":"SUZLON ENERGY"},{"isinNo":"INE614G01033","instrumentName":"RELIANCE POWER"},{"isinNo":"INE213A01029","instrumentName":"OIL AND NATURAL GAS CORP"},{"isinNo":"INE503A01015","instrumentName":"DCB BANK"},{"isinNo":"INE036D01028","instrumentName":"KARUR VYSYA BANK"}];
    }
}

// API call to post the weightage and get the quantity and total price
export const sendWeightage = async({weightAge, totalAmount, priceofAsset}) => {
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
        return 24;
    }
}