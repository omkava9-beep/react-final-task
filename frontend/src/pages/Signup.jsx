import { Form, NavLink, redirect, useActionData, useNavigate, useRouteLoaderData,useSubmit } from 'react-router-dom';
import Button from '../components/Button';
import { signUp } from '../services/auth';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';

// Static markup only — controlled inputs + Firebase Auth wiring happen in Phase 7.
export default function Signup() {
  const navigate = useNavigate();
  const context = useContext(AuthContext)
  const [signupSuccess , setSignupSuccess ] = useState(false);

  useEffect(()=>{
  if(context.authState.isAuth){
    navigate('/');
  }
    

  },[])
  const handleSignup =async(e)=>{
    e.preventDefault();
    try{
      const formData = new FormData(e.target);
  
      console.log(formData);
      const data = Object.fromEntries(formData.entries());
      const resp = await fetch('http://localhost:4000/users' , {
        method:'POST',
        headers:{ 'Content-Type' : 'application/json'},
        body:JSON.stringify(data)
      })
      const respData = await resp.json();
      setSignupSuccess(true);
    }catch(e){

    }


    e.target.reset()
  }
  
  return (
    <main className="mx-auto flex max-w-md flex-col gap-4 px-4 py-16">
      <h1 className="text-2xl font-bold text-gray-900">Create an Account</h1>
      <form onSubmit={handleSignup} className="flex flex-col gap-4 rounded-xl border border-gray-200 bg-white p-6" >
        <label className="flex flex-col gap-1 text-sm text-gray-600">
          Full Name
          <input
            type="text"
            name='name'
            className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none"
          />
        </label>

        <label className="flex flex-col gap-1 text-sm text-gray-600">
          Email
          <input
            type="email"
            name='email'
            className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none"
          />
        </label>

        <label className="flex flex-col gap-1 text-sm text-gray-600">
          Password
          <input
            type="password"
            name='password'
            className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none"
          />
        </label>
        {
          signupSuccess && <p className='text-green-500'>Signup SuccessFull , Go To Login page from below link</p>
        }

        <button variant="primary" type='submit' className="mt-2 w-full py-3">
          Sign Up
        </button>
      </form>

      <p className="text-center text-sm text-gray-500">
        Already have an account?{' '}
        <NavLink to="/login" className="font-medium text-indigo-600 hover:underline">
          Log in
        </NavLink>
      </p>
    </main>
  );
}


export async function signUpAction({request , params}){
  try{
    console.log("called")
    const formData = await request.formData();
    const name = formData.get('name');
    const email = formData.get('email');
    const password = formData.get('password');

    console.log('signup actions ' , name ,
       email, password
    )
    const value = {
      name : name,
      email : email,
      password : password
    }
    console.log(value)
    const resp = await fetch('http://localhost:4000/users' , {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(value),
            redirect: "manual"
        })
    const data = await resp.json();
    console.log("datatsasdfsadfdsaf",data)
    console.log(resp.status);
console.log(resp.redirected);
console.log(resp.url);



    return {data };



  }catch(e){
    console.log(e);

    return {
      error : e
    }

  }
}