import { useEffect, useState } from "react";

export default function useDebounce(input){
    const [debounced , setDebounced ] = useState({
        search :'',
        catagory :'',
        min : '',
        max : ''
    });

    useEffect(()=>{
        const timer = setTimeout(()=>{
            setDebounced(input);
        } , 1000);
        return () => clearTimeout(timer)
    } ,[input])

    return debounced
}


