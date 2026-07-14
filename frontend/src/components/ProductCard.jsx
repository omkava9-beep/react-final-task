import { memo, useContext } from 'react';
import Button from './Button';
import CartContext from '../context/CartContext';
import { useDispatch, useSelector } from 'react-redux';
import useLocalStorage from '../hooks/useLocalStorage';
import { addToCart } from '../store/cartSlice';
import { useNavigate } from 'react-router-dom';

// Presentational only — holds no state. onAddToCart/onViewDetails are optional
// callbacks the parent wires up once cart logic (Phase 2) and routing (Phase 7) exist.
const  ProductCard = memo (({ product })=> {
  const {id ,title, price, category, image, rating } = product;
  const dispatch = useDispatch()
  const navigate = useNavigate();

  function clickHanlder(){
    navigate(`/products/${id}`);
  }
  return (
    <div className="flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md">
      <button
        type="button"
        onClick={clickHanlder}
        className="block aspect-square w-full overflow-hidden bg-gray-50"
      >
        <img
          src={image}
          alt={title}
          className="h-full w-full object-contain p-6 transition-transform hover:scale-105"
        />
      </button>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <span className="text-xs font-medium uppercase tracking-wide text-indigo-500">
          {category}
        </span>
        <h3 className="line-clamp-2 text-sm font-semibold text-gray-800">{title}</h3>

        <div className="flex items-center gap-1 text-xs text-gray-500">
          <span className="text-amber-500">★</span>
          <span>{rating?.rate ?? '—'}</span>
          <span className="text-gray-400">({rating?.count ?? 0})</span>
        </div>

        <div className="mt-auto flex items-center justify-between pt-2">
          <span className="text-lg font-bold text-gray-900">${price.toFixed(2)}</span>
          <Button variant="primary" className="px-3 py-1.5" onClick={() => dispatch(addToCart({
            product:product,
          })) }>
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
}
)
export default ProductCard;