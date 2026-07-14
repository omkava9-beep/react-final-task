import { useContext, useEffect, useState } from 'react';
import Button from '../components/Button';
import { NavLink, redirect, useNavigate } from 'react-router-dom';
import { login } from '../services/auth';
import { useSelector } from 'react-redux';
import { AuthContext } from '../context/AuthContext';


// Static markup only — controlled inputs + Firebase Auth wiring happen in Phase 7.
export default function Login() {
  const context = useContext(AuthContext);
  const [error , setError] = useState(null);
  const [succes , setSuccess] = useState(null);
  const navigate = useNavigate();
  


  function handleSuccesss(message){
    setSuccess(message);
    setTimeout(()=>{
      navigate('/');
    } , 2000)
  }
  useEffect(()=>{
    if(context.authState.isAuth){
      navigate('/');
    }
    

  },[])
  async function handleLogin(e){
    e.preventDefault();

    const fd = new FormData(e.target);


    const formData = Object.fromEntries(fd.entries());
    
    const data = await login(formData.email , formData.password);
    if(data.length === 0){
      setError('email or password is invalid.')
      return;
    }else{
       console.log("response data from api" , data[0].id);
       setError(null);
        context.authDispatch({
          type:'LOGIN',
          userId : data[0].id
        });

      handleSuccesss('Login SuccessFull , redirecting to the home page')
    }
    e.target.reset()
  }

  return (
    <main className="mx-auto flex max-w-md flex-col gap-4 px-4 py-16">
      <h1 className="text-2xl font-bold text-gray-900">Log In</h1>

      <form onSubmit={handleLogin} className="flex flex-col gap-4 rounded-xl border border-gray-200 bg-white p-6">
        <label className="flex flex-col gap-1 text-sm text-gray-600">
          Email
          <input
            type="email"
            name='email'
            required
            className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none"
          />
        </label>

        <label className="flex flex-col gap-1 text-sm text-gray-600">
          Password
          <input
            type="password"
            name='password'
            required
            className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none"
          />
        </label>
        {
          error && <p className=' text-red-400'>{error}</p>
        }

        <Button type="submit" variant="primary" className="mt-2 w-full py-3">
          Log In
        </Button>
        {
          succes ? <p>{succes}</p>:null
        }
      </form>

      <p className="text-center text-sm text-gray-500">
        Don't have an account?{' '}
        <NavLink to="/signup" className="font-medium text-indigo-600 hover:underline">
          Sign up
        </NavLink>
      </p>
    </main>
  );
}
