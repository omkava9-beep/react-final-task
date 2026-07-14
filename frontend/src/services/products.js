export const getProducts = async ()=>{
    try{
        const resp = await fetch('https://fakestoreapi.com/products');
        console.log(resp);
        if(!resp.ok){
            return new Error('Error While Fetching Data.');
        }
        return resp;
    }catch(e){
        return {
            error : e
        };
    }
}

