import { useDispatch, useSelector } from 'react-redux';
import Button from '../components/Button';
import { dummyProducts } from '../services/dummyProducts';
import { useContext, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from '../components/Modal';
import { setCart } from '../store/cartSlice';
import { createOrder } from '../store/orderSlice';
import { AuthContext } from '../context/AuthContext';

// Static markup only — no controlled inputs, validation, useRef auto-focus,
// or the order-confirmation Modal/portal yet. All of that is Phase 5.
// This page should also become auth-protected in Phase 7 (ProtectedRoute).


const initialstate ={
    error:false
  }

export default function Checkout() {
  const cartItems = useSelector((state)=>state.cart);
  console.log('cartItemssss' , cartItems)
  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const formRef = useRef(null);
  const [validationErrors , setValidationErrors] = useState(initialstate);
  const [modalOpen , setModalOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const context = useContext(AuthContext);
  const orderState = useSelector((state)=>state.orders);

  console.log('orderState' , orderState);
  

  function handleSubmit(e){

    e.preventDefault();

    const formData = new FormData(formRef.current);

    const data = Object.fromEntries(formData.entries());
    const validate = validateData(data);
    

    setValidationErrors(validate);
    console.log('handlesubmitttt');
    if(!validate.error){
      console.log("formd",data);
      e.target.reset();
      setValidationErrors({
        error:false
      })

      setModalOpen(true)
      dispatch(createOrder({ userId : context.authState.userId , items : cartItems , total : total , shipping : 'pending' }))
    }


  }
  function validateData(data){
    const error = {}
    if(!data['fullname']){
      error['fullname'] = 'Name is required'
    }
    if(!data['email']){
      error['email'] = 'Email is required'
    }
    if(!data['address']){
      error['address'] = 'Address is required'
    }
    if(!data['city']){
      error['city'] = 'City is required'
    }
    if(!data['postal-code']){
      error['postal-code'] = 'Postal Code is required'
    }
    if(!data['card-number']){
      error['card-number'] = 'Card Number is required'
    }
    if(!data['expiry']){
      error['expiry'] = 'Expiry Date is required'
    }

    if(Object.keys(error).length !== 0){
      return {
        ...error,
        error: true
      }
    }
    return {
      error : false
    }
  }
  function handleClose(){
    setModalOpen(false);
    localStorage.removeItem('cart');


    navigate('/');
  }
  if(orderState.error){
    return <p>error occured...</p>
  }
  if(orderState.loading){
    return <p>loading </p>
  }
  if(orderState.success){
    localStorage.removeItem('cart');
    return (<Modal isOpen={modalOpen} onClose={handleClose} title={'Order Placed Successfuly'}>
      <p>We will reach you out soon on entered email</p>
    </Modal>)
  }

  return (
    <>
    <main className="mx-auto max-w-5xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold text-gray-900">Checkout</h1>

      <div className="grid gap-8 md:grid-cols-3">
        <form onSubmit={handleSubmit} ref={formRef} className="md:col-span-2 flex flex-col gap-4 rounded-xl border border-gray-200 bg-white p-6">
          <h2 className="text-lg font-semibold text-gray-800">Shipping Details</h2>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="flex flex-col gap-1 text-sm text-gray-600">
              Full Name
              <input
                type="text"
                className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none"
                name='fullname'
                required
              />
              {
                validationErrors && validationErrors.error && 
                <p className=' text-red-400'>{validationErrors.fullname}</p>
              }
            </label>

            <label className="flex flex-col gap-1 text-sm text-gray-600">
              Email
              <input
                type="email"
                name='email'
                className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none"
                required
              />
              {
                validationErrors && validationErrors.error && 
                <p className=' text-red-400'>{validationErrors.email}</p>
              }

            </label>
          </div>

          <label className="flex flex-col gap-1 text-sm text-gray-600">
            Address
            <input
              type="text"
              name='address'
              className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none"
              required
            />
              {
                validationErrors && validationErrors.error && 
                <p className=' text-red-400'>{validationErrors.address}</p>
              }
          </label>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="flex flex-col gap-1 text-sm text-gray-600">
              City
              <input
                type="text"
                name='city'
                className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none"
                required
              />
              {
                validationErrors && validationErrors.error && 
                <p className=' text-red-400'>{validationErrors.city}</p>
              }
            </label>

            <label className="flex flex-col gap-1 text-sm text-gray-600">
              Postal Code
              <input
                type="text"
                name='postal-code'
                className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none"
                pattern='[0-9]{6}'
              />
              {
                validationErrors && validationErrors.error && 
                <p className=' text-red-400'>{validationErrors['postal-code']}</p>
              }
            </label>
          </div>

          <h2 className="mt-2 text-lg font-semibold text-gray-800">Payment (dummy)</h2>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="flex flex-col gap-1 text-sm text-gray-600">
              Card Number
              <input
                type="text"
                name='card-number'
                placeholder="4242 4242 4242 4242"
                className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none"
              />
              {
                validationErrors && validationErrors['card-number'] && 
                <p className=' text-red-400'>{validationErrors['card-number']}</p>
              }
            </label>

            <label className="flex flex-col gap-1 text-sm text-gray-600">
              Expiry
              <input
                type="text"
                name='expiry'
                placeholder="MM/YY"
                className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none"
              />
              {
                validationErrors && validationErrors.error && 
                <p className=' text-red-400'>{validationErrors['expiry']}</p>
              }
            </label>
          </div>

          <Button type="submit" variant="primary" className="mt-4 self-start px-6 py-3">
            Place Order
          </Button>
        </form>

        <aside className="flex flex-col gap-3 rounded-xl border border-gray-200 bg-white p-6">
          <h2 className="text-lg font-semibold text-gray-800">Order Summary</h2>
          {cartItems.map((item) => (
            <div key={item.id} className="flex justify-between text-sm text-gray-600">
              <span>
                {item.title} x {item.quantity}
              </span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
          <div className="mt-2 flex justify-between border-t border-gray-100 pt-3 text-base font-bold text-gray-900">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </aside>
      </div>
    </main>
    </>
  );
}
