// Static placeholder data for Phase 1 (static UI wiring).
// From Phase 5 onward, replace this with a real fetch to https://fakestoreapi.com/products
// inside services/products.js, and delete this file.
export const dummyProducts = [
  {
    id: 1,
    title: 'Classic Canvas Backpack',
    price: 49.99,
    category: 'accessories',
    image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
    rating: { rate: 4.3, count: 120 },
    description:
      'A durable canvas backpack with padded laptop sleeve, perfect for daily commutes.',
  },
  {
    id: 2,
    title: 'Wireless Over-Ear Headphones',
    price: 89.99,
    category: 'electronics',
    image: 'https://fakestoreapi.com/img/71HblAHs5xL._AC_UY879_-2.jpg',
    rating: { rate: 4.6, count: 340 },
    description:
      'Noise-isolating wireless headphones with 30-hour battery life and crisp bass.',
  },
  {
    id: 3,
    title: "Men's Slim Fit Cotton Shirt",
    price: 24.5,
    category: "men's clothing",
    image: 'https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg',
    rating: { rate: 4.1, count: 88 },
    description: 'Breathable slim-fit cotton shirt, machine washable, available in multiple sizes.',
  },
  {
    id: 4,
    title: "Women's Lightweight Jacket",
    price: 64.0,
    category: "women's clothing",
    image: 'https://fakestoreapi.com/img/81XH0e8fefL._AC_UY879_.jpg',
    rating: { rate: 4.4, count: 210 },
    description: 'A packable, water-resistant jacket ideal for layering in unpredictable weather.',
  },
  {
    id: 5,
    title: '18K Gold Plated Necklace',
    price: 32.0,
    category: 'jewelery',
    image: 'https://fakestoreapi.com/img/51Y5NI-I5jL._AC_UX679_.jpg',
    rating: { rate: 4.0, count: 55 },
    description: 'Delicate gold plated necklace with adjustable chain, hypoallergenic finish.',
  },
  {
    id: 6,
    title: 'Smart Fitness Watch',
    price: 129.99,
    category: 'electronics',
    image: 'https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg',
    rating: { rate: 4.7, count: 512 },
    description: 'Track heart rate, sleep, and workouts with a week-long battery life.',
  },
  {
    id: 7,
    title: 'Stainless Steel Water Bottle',
    price: 18.75,
    category: 'accessories',
    image: 'https://fakestoreapi.com/img/61pHAEJ4NML._AC_UX679_.jpg',
    rating: { rate: 4.5, count: 175 },
    description: 'Double-walled insulated bottle that keeps drinks cold for 24 hours.',
  },
  {
    id: 8,
    title: "Men's Slim Fit Jeans",
    price: 45.0,
    category: "men's clothing",
    image: 'https://fakestoreapi.com/img/71z3kpMAYsL._AC_UY879_.jpg',
    rating: { rate: 4.2, count: 96 },
    description: 'Stretch denim slim fit jeans, five-pocket styling, fades well over time.',
  },
];

export const dummyOrders = [
  {
    id: 'ORD-1001',
    date: '2026-06-18',
    total: 139.98,
    status: 'Delivered',
    items: [
      { productId: 2, title: 'Wireless Over-Ear Headphones', quantity: 1, price: 89.99 },
      { productId: 7, title: 'Stainless Steel Water Bottle', quantity: 1, price: 18.75 },
      { productId: 5, title: '18K Gold Plated Necklace', quantity: 1, price: 32.0 },
    ],
  },
  {
    id: 'ORD-1002',
    date: '2026-06-30',
    total: 49.99,
    status: 'Processing',
    items: [{ productId: 1, title: 'Classic Canvas Backpack', quantity: 1, price: 49.99 }],
  },
];
