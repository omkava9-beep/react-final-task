import { createContext, useEffect, useReducer } from "react";

export const AuthContext = createContext({
    authState : {
        isAuth:false,
        userId : null
    },
    authDispatch : ()=>{},
    loadingState : true,
    loadingdispatch : ()=>{}
})

function authReducer(state , action){
    console.log('caleed reducer')
    if(action.type === 'LOGIN'){
        
        console.log('called auth reducer')
        const userId = action.userId;
        localStorage.setItem('userId' , JSON.stringify(userId))

        return {
            userId : userId,
            isAuth : true,
        }
    }if(action.type ==='LOGOUT'){
        localStorage.removeItem('userId');

        return {
            userId:null,
            isAuth: false
        }
    }
    if(action.type == 'SET'){
        console.log('SET');
        console.log({
            userId : action.userId,
            isAuth : action.isAuth
        });
        return {
            ...state,
            userId : action.userId,
            isAuth : action.isAuth
        }

    }

    return state;

}
function loadingReducer(state , action){
    return action;

}
export const AuthContextProvider = ({children})=>{
    const [authState , authDispatch] = useReducer(authReducer , {
        isAuth:false,
        userId : null
    })
    const [loading  , loadingdispatch ] = useReducer(loadingReducer , true)


    useEffect(()=>{
        const data = JSON.parse(localStorage.getItem('userId')) ||null;
        console.log('data' , data)
        if(data){
            authDispatch({
                type:'SET',
                isAuth: true,
                userId : data
            })
        }
        loadingdispatch(false)

    } , [authDispatch , loadingdispatch])
    const value = {
        authState : authState,
        loadingState : loading,
        loadingdispatch : loadingdispatch,
        authDispatch : authDispatch
    }
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )

}

export default AuthContextProvider