export const login  = async(email , password)=>{
    try{
        console.log('email , password' , email ,password);
        console.log(`http://localhost:4000/users?email=${email}&password=${password}`)
        const resp = await fetch(`http://localhost:4000/users?email=${email}&password=${password}`);
        if(!resp.ok){
            throw new Error('something went wrong while login');
        }
        const data = await resp.json();
        console.log("On login Success",data);
        return data;
    }catch(e){
        console.log("login error message",e)
        return {
            error : e
        }
    }
}

export const signUp = async(name , email , password)=>{
    try{
        const resp = await fetch('http://localhost:4000/users' , {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                name,
                email,
                password
            })
        })
        if(!resp.ok){
            throw new Error('server side issue')
        }

        const data = await resp.json();

        return data;


    }catch(e){
        console.log("signup erorr message",e)
        throw e;
    }
}