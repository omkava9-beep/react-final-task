import { useContext, useEffect } from 'react';
import Button from '../components/Button';
import CartItem from '../components/CartItem';
import { dummyProducts } from '../services/dummyProducts';
import CartContext from '../context/CartContext';
import useLocalStorage from '../hooks/useLocalStorage';
import { useDispatch, useSelector } from 'react-redux';
import { setCart } from '../store/cartSlice';
import { useNavigate } from 'react-router-dom';

// Static placeholder cart items, built from the first two dummy products.
// Phase 2 replaces this with real cart state (useState), Phase 3 migrates it
// to CartContext + useReducer, and Phase 6 migrates it again to Redux Toolkit.


export default function Cart() {
  const cart =  useSelector((state)=>state.cart);
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleCheckout(){
    navigate('/checkout');
  }
  return (
    <main className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold text-gray-900">Your Cart</h1>

      <div className="rounded-xl border border-gray-200 bg-white p-4">
        {cart && cart.length > 0 ? cart.map((item) => (
          <CartItem key={item.id} item={item} />
        )) : <p>your cart is empty</p>}
      </div>

      <div className="mt-6 flex items-center justify-between rounded-xl border border-gray-200 bg-white p-4">
        <span className="text-base font-semibold text-gray-700">Subtotal</span>
        <span className="text-xl font-bold text-gray-900">${subtotal.toFixed(2)}</span>
      </div>

      <div className="mt-6 flex justify-end">
        <Button variant="primary" className="px-6 py-3" onClick={handleCheckout}>
          Proceed to Checkout
        </Button>
      </div>
    </main>
  );
}
