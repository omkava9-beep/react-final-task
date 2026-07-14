import { useContext } from 'react';
import Button from './Button';
import CartContext from '../context/CartContext';
import { useDispatch } from 'react-redux';
import { addToCart, decreaseQuantity, removeFromCart } from '../store/cartSlice';

// item shape: { id, title, price, image, quantity }
export default function CartItem({ item, onIncrement, onDecrement, onRemove }) {
  const context = useContext(CartContext);
  const dispatch = useDispatch();
  return (
    <div className="flex items-center gap-4 border-b border-gray-100 py-4 last:border-none">
      <img
        src={item.image}
        alt={item.title}
        className="h-20 w-20 flex-shrink-0 rounded-lg border border-gray-100 object-contain p-2"
      />

      <div className="flex-1">
        <h4 className="text-sm font-semibold text-gray-800">{item.title}</h4>
        <p className="mt-1 text-sm text-gray-500">${item.price.toFixed(2)} each</p>

        <div className="mt-2 flex items-center gap-2">
          <button
            type="button"
            onClick={() => dispatch(decreaseQuantity(item))}
            className="h-7 w-7 rounded-full border border-gray-300 text-gray-600 hover:bg-gray-100"
          >
          -
          </button>
          <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
          <button
            type="button"
            onClick={() =>dispatch(addToCart({
              product : item
            }))}
            className="h-7 w-7 rounded-full border border-gray-300 text-gray-600 hover:bg-gray-100"
          >
            +
          </button>
        </div>
      </div>

      <div className="flex flex-col items-end gap-2">
        <span className="text-sm font-bold text-gray-900">
          ${(item.price * item.quantity).toFixed(2)}
        </span>
        <Button variant="ghost" className="px-2 py-1 text-xs" onClick={() => dispatch(removeFromCart(item.id))}>
          Remove
        </Button>
      </div>
    </div>
  );
}
