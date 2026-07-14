import React, { createContext, useEffect, useReducer } from 'react'
import useLocalStorage from '../hooks/useLocalStorage';

export const CartContext = createContext({
    items : [],
    cartDispatch : ()=>{}
})
function cartReducer(state , action){
    if(action.type === 'add'){
        const current = structuredClone(state);
        const ind = state.findIndex((item)=>item.id  === action.product.id)
        console.log(ind, state, "ind")
        
        if(ind > -1){
            console.log("calling if")
            
            const item = current[ind];
            item.quantity += 1;
            current[ind] = item;
            const newCurrent = current;
            console.log("lsadkjflsd",newCurrent)
            action.setLocalStorage('cart' , newCurrent)
            
            return newCurrent;

        }else{
            console.log("calling else")
            const item = action.product;
            item.quantity = 1;

            current.push(item);
            action.setLocalStorage('cart' , current);
            return current;
        }
    }
    if(action.type == 'decrease'){
        const current = structuredClone(state);
        if(action.product.quantity === 1){
            const ans = current.filter((item)=>{
                return item.id !== action.product.id;
            })
            return ans;
        }else{
            const prod = action.product;
            const ans = current.map((item)=>{
                if(item.id === action.product.id){
                    item.quantity -=1 ;
                    return item;
                }
                return item;

            })

            return ans;
        }
    }
    if(action.type === 'remove'){
        const current = structuredClone(state);
        const ans = current.filter((item)=>{
            return item.id !== action.product.id;
        })

        return ans;
    }
    if(action.type == 'set'){
        let current = action.items
        console.log("current",current)
        return current;
    }
}

export const CartContextProvider = ({children})=>{
    const [items , dispatch] = useReducer(cartReducer ,[] );
    
    const {getLocalStorage} = useLocalStorage();

    useEffect(()=>{
        const cart = JSON.parse(localStorage.getItem('cart'))|| [];
        console.log(cart)
        console.log('asljfksl')

        dispatch({
            type : 'set',
            items : cart,
        })
    } ,[])
    

    const value = {
        items : items,
        cartDispatch : dispatch
    }
    return <CartContext.Provider value={value}>
        {children}
    </CartContext.Provider>
}

export default CartContext