import { useEffect, useState } from 'react';
import ProductGrid from '../components/ProductGrid';
import SearchFilterBar from '../components/SearchFilterBar';
import { dummyProducts } from '../services/dummyProducts';
import useDebounce from '../hooks/useDebounce';
import { getProducts } from '../services/products';

// Static for now: renders the hardcoded dummyProducts list via props.
// Phase 2 adds useState for cart + filtering. Phase 5 replaces dummyProducts
// with a real fetch (loading/error/success states) from services/products.js.
export default function Home() {

  
  const [products , setProducts] = useState([]);
  const [input , setInput] = useState({
    search :'',
    category : '',
    min : 0,
    max:Number.MAX_VALUE
  });
  const [isLoading , setIsLoading] = useState(false);
  const [Error , setError] = useState(null);

  const debouncedInput = useDebounce(input)
  let filtered = products.filter((prod)=>{
    return prod.title.toLocaleLowerCase().includes(debouncedInput.search.toLocaleLowerCase()) && (debouncedInput.category === '' ? true:prod.category === debouncedInput.category) && debouncedInput.min <= prod.price  &&  (debouncedInput.max === '' ? true :  debouncedInput.max >= prod.price); 
  });




  function handleChange(e){
    const {name , value} = e.target;

    setInput((prev)=>{
      return structuredClone({
        ...prev,
        [name]:value
      })
    })
  }

  function handleSelect(e){
    const {value} = e.target;
    console.log('selectedval',value)
    setInput(prev=>{
      return structuredClone({
        ...prev,
        category : value
      })
    })
  }

  async function getData(){
    setIsLoading(true)
    const resp = await getProducts()

    console.log("asdfasdf",resp)
    if(!resp.ok){
      setError('something went wrong whole fetching the Data');
      setIsLoading(false)
    }
    const data  =  await resp.json();
    
    if(data.e){
      setError(data.e);
    }
    setProducts(data);
    setIsLoading(false);

  }
  useEffect(()=>{

    getData();
  } , [])


  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold text-gray-900">Shop the Catalog</h1>
      <SearchFilterBar input={input} onChange={handleChange} onSelect={handleSelect} />
      
        <ProductGrid products={filtered} isLoading={isLoading} Error={Error}/>
    </main>
  );
}
