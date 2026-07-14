import { createSlice } from "@reduxjs/toolkit"


const cartSlice = createSlice({
    name:'cart',
    initialState: [],
    reducers : {
        addToCart(state ,action ){
            const ind = state.findIndex((item)=>item.id  === action.payload.product.id)
            console.log(ind, state, "ind")
            
            if(ind > -1){
                console.log("calling if")
                state[ind].quantity += 1;

            }else{
                action.payload.product.quantity = 1;


                state.push(action.payload.product);

            }       

            localStorage.setItem('cart' , JSON.stringify(state));
            
            return state;
        },
        decreaseQuantity(state,action){
            console.log("decreaseQuantity" , action.payload)
            if(action.payload.quantity === 1){

                const ans = state.filter((item)=>{
                    return item.id !== action.payload.id;
                })
                return ans;
            }else{
                const ind = state.findIndex((item)=>item.id === action.payload.id);
                state[ind].quantity -= 1;
                return state;
            }
        },
        removeFromCart(state, action){
           const ans =  state.filter((item)=> item.id !== action.payload)
           return ans
        },
        setCart(state , action ){
            return action.payload;
        }
        
    }
})

export const {addToCart , decreaseQuantity , removeFromCart, setCart} =  cartSlice.actions;


export default cartSlice.reducer
