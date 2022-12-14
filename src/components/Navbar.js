import React from 'react'
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from 'react-router-dom'
const Navbar = (props) => {
  let location = useLocation();
  const navigate = useNavigate();
  React.useEffect(() => {
    console.log(location.pathname);

  }, [location]);
  const handlelogout = () => {
    props.setprogress(15);
    localStorage.removeItem('token');
    navigate('/login');
    props.setprogress(100);
  }
  return (

    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-dark" id='navpos'>
        <div className="container-fluid">
          <Link className="navbar-brand" to="/" style={{color:'white'}}>EverNote</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname === "/dashboard" ? "active" : ""}`} aria-current="page" to="/dashboard" style={{color:'white'}}>Home</Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname === "/about" ? "active" : ""}`} to="/about" style={{color:'white'}}>About</Link>
              </li>


            </ul>
            {!localStorage.getItem('token') ? <form className="d-flex" role="search">
              {/* <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" /> */}
              <Link className="btn btn-primary mx-2" to="/login" role="button">Login</Link>
              <Link className="btn btn-primary mx-2" to="/signup" role="button">Sign Up</Link>
            </form> :
            <>
             <Link className="btn btn-primary mx-2" to="/dashboard" role="button">My Dashboard</Link>
             <button className='btn btn-primary' onClick={handlelogout}>Logout</button>
             </>
            }

          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar
