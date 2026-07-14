import { useContext, useEffect, useState } from 'react';
import { dummyOrders } from '../services/dummyProducts';
import { useSelector } from 'react-redux';
import { AuthContext } from '../context/AuthContext';

const STATUS_STYLES = {
  Delivered: 'bg-green-100 text-green-700',
  Processing: 'bg-amber-100 text-amber-700',
};

// Static placeholder list. Phase 6 replaces this with a Redux async thunk
// that fetches the logged-in user's orders from Firestore, and this page
// becomes protected (ProtectedRoute) once auth/routing land in Phase 7.
export default function Orders() {
  const [ orders , setOrders] = useState([]);
 const context = useContext(AuthContext);
 const userId = context.authState.userId;
 async function getOrders(){
  const resp = await fetch(`http://localhost:4000/orders?userId=${userId}`);

  const data = await resp.json();
  console.log("dataaaaaa",data);
  setOrders(data);
 }
 useEffect(()=>{
  getOrders();
 },[])



  return (
    <main className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold text-gray-900">My Orders</h1>

      <div className="flex flex-col gap-4">
        {orders.map((order) => (
          <div key={order.id} className="rounded-xl border border-gray-200 bg-white p-4">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-gray-800">{order.id}</span>
              <span
                className={`rounded-full px-3 py-1 text-xs font-medium ${STATUS_STYLES[order.status]}`}
              >
                {order.status}
              </span>
            </div>
            <p className="mt-1 text-sm text-gray-500">Placed on {order.date}</p>

            <div className="mt-3 flex flex-col gap-1 border-t border-gray-100 pt-3">
              {order.items.map((item) => (
                <div key={item.productId} className="flex justify-between text-sm text-gray-600">
                  <span>
                    {item.title} × {item.quantity}
                  </span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="mt-3 flex justify-end border-t border-gray-100 pt-3 text-sm font-bold text-gray-900">
              Total: ${order.total.toFixed(2)}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
