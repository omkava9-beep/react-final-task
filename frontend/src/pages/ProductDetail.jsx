import { useNavigate, useParams } from 'react-router-dom';
import Button from '../components/Button';
import { dummyProducts } from '../services/dummyProducts';
import { useEffect, useState } from 'react';
import { getProducts } from '../services/products';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/cartSlice';

// Static placeholder — hardcoded to the first dummy product.
// Phase 5 wires this to `/products/:id` (via React Router in Phase 7) and
// fetches the real product by id, with loading/error states.
const product = dummyProducts[0];

export default function ProductDetail() {
  const {id} = useParams();
  const [product  , setProduct] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();


  async function getData(){
    const resp = await getProducts()

    console.log("asdfasdf",resp)
    if(!resp.ok){
      setError('something went wrong whole fetching the Data');
    }
    const data  = await resp.json();
    console.log("dataaa" ,data)
    const filter = data.find((item)=>{
      return item.id == id;
    })
    setProduct(filter);
  }
  useEffect(()=>{
    getData();
    
  }, [])
  
  return (
    <main className="mx-auto max-w-5xl px-4 py-8">
      <div className="grid gap-8 md:grid-cols-2">
        <div className="flex aspect-square items-center justify-center rounded-xl border border-gray-200 bg-gray-50 p-10">
          <img src={product.image} alt={product.title} className="h-full w-full object-contain" />
        </div>

        <div className="flex flex-col gap-4">
          <span className="text-xs font-medium uppercase tracking-wide text-indigo-500">
            {product.category}
          </span>
          <h1 className="text-2xl font-bold text-gray-900">{product.title}</h1>

          <div className="flex items-center gap-1 text-sm text-gray-500">
            <span className="text-amber-500">★</span>
            <span>{product?.rating?.rate}</span>
            <span className="text-gray-400">({product?.rating?.count} reviews)</span>
          </div>

          <p className="text-3xl font-bold text-gray-900">${product?.price?.toFixed(2)}</p>
          <p className="text-sm leading-relaxed text-gray-600">{product.description}</p>

          <div className="mt-4 flex gap-3">
            <Button variant="primary" className="px-6 py-3" onClick={()=>{dispatch(addToCart({
              product:product
            }))}}>
              Add to Cart
            </Button>
            <Button variant="secondary" className="px-6 py-3" onClick={()=>navigate('/')}>
              Back to Catalog
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
