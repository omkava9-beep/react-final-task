import { useContext, useEffect } from 'react';
import CartContext from '../context/CartContext';
import CartIcon from './CartIcon';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

// Nav links are plain <a href="#"> placeholders — swap for React Router's
// <Link>/<NavLink> once routing is set up in Phase 7.
export default function Navbar() {
  const cart = useSelector((state)=>state.cart)
  const authState = useContext(AuthContext);

  const count = cart.reduce((acc ,val)=>{
    return acc + val.quantity;
  },0)
  
   
  return (
    <header className="sticky top-0 z-20 border-b border-gray-200 bg-white">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <NavLink to="/" className="text-xl font-bold text-indigo-600">
          ShopEase
        </NavLink>

        <ul className="hidden items-center gap-6 text-sm font-medium text-gray-600 md:flex">
          <li>
            <NavLink to='/' className="hover:text-indigo-600">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to='/orders' className="hover:text-indigo-600">
              My Orders
            </NavLink>
          </li>
          {
            authState.authState.isAuth ? <NavLink to='/checkout'>Checkout</NavLink> : ( <><li>
            <NavLink to="/login" className="hover:text-indigo-600">
              Login
            </NavLink>
          </li>
          <li>
            <NavLink to="/signup" className="hover:text-indigo-600">
              Sign Up
            </NavLink>
          </li> </>)
          }
          
        </ul>

        <NavLink to="/cart" aria-label="Cart">
          <CartIcon itemCount={count} />
        </NavLink>
      </nav>
    </header>
  );
}
