import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({children}) => {
    const context = useContext(AuthContext);


  if(context.loadingState){
      return (<p>Loading....</p>)
  }
  
  if(!context.authState.isAuth){
    console.log("context isauth",context.authState.isAuth);
      return (<Navigate to={'/login'}></Navigate>)
  }

  return (children);
}

export default ProtectedRoute