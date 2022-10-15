import React,{useState} from 'react'
import {useNavigate} from 'react-router-dom'
// import { redirect } from "react-router-dom";
const Signup = (props) => {
    const [cred, setcred] = useState({name:"",email:"",password:"",cpassword:""})
    const navigate = useNavigate()
    const handlesubmit=async(e)=>{
        e.preventDefault();

        const {name,email,password,cpassword}=cred;
        if(password==cpassword)
        {const response = await fetch("http://localhost:5000/api/auth/createuser", {
            method: 'POST', 
            headers: {
              'Content-Type': 'application/json',
             },
          
             body: JSON.stringify({name,email,password}) 
          });

          const json=await response.json();
          console.log(json)
          if(json.success){
            //Save the auth token and redirect 
            localStorage.setItem('token',json.authtoken);
            navigate('/');
            props.showAlert("Account created successfully!","success")
            //  redirect("/");
            //to redirect usehistory hook
          }else{
            props.showAlert("User already exists!","danger")
          }}
          else{
            props.showAlert("Password does not match in confirm password","danger")
           
          }
    }
  
    const onchange = (e) => {
        setcred({ ...cred, [e.target.name]: e.target.value })
      }
    return (
        <div className='mt-2'>
        <h2 className='my-2'>Signup to continue to iNotebook</h2>
            <form onSubmit={handlesubmit}>
                <div className="my-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" value={cred.name} id="name" name="name" onChange={onchange} aria-describedby="emailHelp"/>
                        
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" value={cred.email} id="email" name="email" onChange={onchange} aria-describedby="emailHelp"/>
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" name="password" onChange={onchange} value={cred.password} id="password/" minLength={5} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" name="cpassword" onChange={onchange} value={cred.cpassword} id="cpassword/" minLength={5} required/>
                </div>
                
                <button disabled={cred.password.length<5} type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Signup
