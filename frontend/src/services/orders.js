export const placeOrder = async(userId ,items , total , shipping)=>{
    try{
        const resp = await fetch('http://localhost:4000/orders',{
            method:'POST',
            body:{
                userId,
                items,
                total,
                shipping
            },
            headers:{
                'Content-Type':'application/json'
            }
        })
        if(!resp.ok){
            throw new Error('failed to create order');
    
        }

    }catch(e){
        console.log(e);


    }

}

export const fetchHistory = async(userId)=>{
    try{
        const resp = await fetch('http://localhost:4000/orders?userId=',userId);
        if(!resp.ok){
            throw new Error('failed to fetch order data');
        }
        const data = await resp.json();
        console.log("Order Data",data);

    }catch(e){
        console.log(e);
    }
}