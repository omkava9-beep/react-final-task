import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


export const createOrder = createAsyncThunk('orders/createOrder', 
    async(orderData)=>{
        console.log('create order called')
        return fetch('http://localhost:4000/orders',{
            method:'POST',
            headers:{
                'Content-Type' : 'application/json'
            },
            body:JSON.stringify(orderData)
        }).then((resp)=>resp.json()).catch(e=>e)
    }
)

const orderSlice = createSlice({
    initialState: {
        orders : [],
        loading : false,
        error  : null,
        success : false
    },
    name:'orders',
    reducers : {
        resetOrderState : (state)=>{
            state.loading= false;
            state.error = null;
            state.success= false;
        }
    },
    extraReducers: (builder)=>{
        builder.addCase(createOrder.pending ,
            (state)=>{
                console.log('pending');

                state.loading = true;
                state.error = null;
                state.success = false
            }
        )
        .addCase(createOrder.fulfilled ,
            (state,action)=>{
                state.loading = false;
                if(state.orders){
                    state.orders.push(action.payload) ;

                }else{
                    console.log('state.orders undefined');
                    state.orders = []
                }
                state.success = true;
                state.error = null;
                console.log("inside create order and successfully created this order ",state.orders  , action.payload);
            }
        )
        .addCase(createOrder.rejected , 
            (state, action)=>{
                state.error = action.payload;
                state.success= false;
                state.loading = false;
            }

        )
    }
})
export const {resetOrderState} = orderSlice.actions;
export default orderSlice.reducer