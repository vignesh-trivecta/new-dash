export const segregate = (num) => {

    if (num == "" || num == undefined){
        return "";
    }
    let val = String(num).split('');
    let len = val.length;
    let iterations = Math.round(len/3);

    while(iterations!=0)
    {
        let i = -3;
        let j = (i*iterations);
        val.splice(j,0,',');
        if(val[0] == ','){
            val.shift();
        }
        iterations--;
    }
    return val.join('');
}