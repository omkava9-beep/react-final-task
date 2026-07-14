import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Cart from './pages/Cart'
import { CartContextProvider } from './context/CartContext';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { store } from './store/store';
import { useEffect } from 'react';
import { setCart } from './store/cartSlice';
import useLocalStorage from './hooks/useLocalStorage';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RootWrapper from './pages/RootWrapper';
import Orders from './pages/Orders';
import Login from './pages/Login'
import Signup, { signUpAction } from './pages/Signup'
import ProductDetail from './pages/ProductDetail'
import Checkout from './pages/Checkout';
import ErrorEle from './components/ErrorEle'

import ProtectedRoute from './components/ProtectedRoute'
import AuthContextProvider from './context/AuthContext';
import ProductCard from './components/ProductCard';
// Phase 1 renders only the Home page — no routing yet (that's Phase 7's job).
// The other pages (ProductDetail, Cart, Checkout, Login, Signup, Orders,
// NotFound) already exist under src/pages/, fully built and ready to be
// dropped into <Routes> once React Router is installed and wired up yourself.
// Feel free to swap the import below to preview any other page in the
// meantime — just don't wire up routing until Phase 7.
const router = createBrowserRouter([
  {
    path:'/',
    element : <RootWrapper/>,
    errorElement: <ErrorEle></ErrorEle>,
    children:[
      {
        index: true,
        element:<Home/>
      },{
        path:'orders',
        element:<ProtectedRoute>

          <Orders/>
        </ProtectedRoute>
      },
      {
        path:'login',

        element:<Login/>
      },
      {
        path:'signup',
        element: <Signup/>,
        // action : signUpAction
      },
      {
        path:'cart',
        element:<Cart/>
      },{
        path:'checkout',

        element:( <ProtectedRoute>
            <Checkout/>
        </ProtectedRoute>)
      },
      {
        path:'products/:id',
        element : <ProductDetail/>
      }
    ]
  }
])
export default function App() {
  console.log("App mounted");

  return (
    <AuthContextProvider>
      <RouterProvider router={router}>
      </RouterProvider>
    </AuthContextProvider>
  );
}
