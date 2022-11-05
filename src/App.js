import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';
import Login from './components/Login';
import Signup from './components/Signup';
import { Navigate } from 'react-router-dom';
import {useState} from 'react'
import Menu from './components/Menu';
function App() {
  const [alert, setAlert] = useState(null);
  const showAlert = (message, type)=>{
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
        setAlert(null);
    }, 1500);
}
  return (
    <>
    <NoteState>
    <Router>
      
      <Navbar/>
      
      <Alert alert={alert}/>
      <div className='container'>
      <Routes>
      {/* <Route exact path="/" element={ <Navigate to="/login" /> } /> */}
          <Route path="/" element={<Menu />} />
          <Route exact path="/dashboard" element={<Home showAlert={showAlert}/>} />
          <Route path="/about" element={<About/>} />
          <Route path="/login" element={<Login showAlert={showAlert}/>} />
          <Route path="/signup" element={<Signup showAlert={showAlert}/>} />    
          <Route
            path="*"
            element={
              <div>
                <h2 style={{textAlign:'center'}}>404 Page not found</h2>
              </div>
            }
          />  
        </Routes>
        </div>
    </Router>
    </NoteState>
    </>
  );
}

export default App;
