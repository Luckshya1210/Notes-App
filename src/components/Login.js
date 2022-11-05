import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { Link, useLocation } from "react-router-dom";
import { redirect } from "react-router-dom";
const Login = (props) => {
    const [cred, setcred] = useState({email:"",password:""})
    const navigate = useNavigate();
    const Handlesubmit=async(e)=>{
        e.preventDefault();
        
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: 'POST', 
            headers: {
              'Content-Type': 'application/json',
             },
          
             body: JSON.stringify({email:cred.email,password:cred.password}) 
          });

          const json=await response.json();
          console.log(json)
          if(json.success){
            //Save the auth token and redirect 
            localStorage.setItem('token',json.authtoken);
            // redirect("/")
            props.showAlert("Logged in successfully!","success")
            navigate('/dashboard')
            //to redirect usehistory hook
          }else{
            props.showAlert("Invalid Credentials!","danger")
          }
    }
  
    const onchange = (e) => {
        setcred({ ...cred, [e.target.name]: e.target.value })
      }
    return (
        <div className='mt-2'>
            <h2 className='my-2'>Login to continue to EverNote</h2>
            <form onSubmit={Handlesubmit}>
                <div className="my-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control"  onChange={onchange} name="email" value={cred.email}id="email" aria-describedby="emailHelp"/>
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" onChange={onchange}  value={cred.password}name="password" id="password"/>
                </div>
                <button type="submit" className="btn btn-primary" >Submit</button>
                <Link className="btn btn-primary mx-2" to="/signup" role="button">Create a new account</Link>
            </form>
            
        </div>
    )
}

export default Login
