import ProductCard from './ProductCard';

export default function ProductGrid({ products , isLoading ,Error}) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
      {
        Error && <p>{Error}</p>
      }
      {!isLoading ? products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
        />
      )) : <p className=' flex items-center justify-center'>Loading...</p> }
    </div>
  );
}
