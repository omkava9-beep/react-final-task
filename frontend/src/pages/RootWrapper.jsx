import React, { useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { setCart } from '../store/cartSlice';
import Navbar from '../components/Navbar';

import Footer from '../components/Footer';
import Cart from './Cart';
import { AuthContext } from '../context/AuthContext';

const RootWrapper = () => {
    const dispatch = useDispatch();
  const cart = useSelector(state=>state.cart)
  const context = useContext(AuthContext);
  const ordersState = useSelector((state)=>state.orders);
  
  useEffect(()=>{

    const cart = JSON.parse(localStorage.getItem('cart')) || [] ;
    
    dispatch(setCart(cart));    
  } , [dispatch ])
  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
        <Navbar  />
        <div className="flex-1">
          <Outlet></Outlet>
        </div>
        <Footer />
    </div>

  )
}

export default RootWrapper