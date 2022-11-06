import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import Navbar from './components/Navbar';
import LoadingBar from 'react-top-loading-bar'
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
const [progress, setprogress] = useState(0)
  return (
    <>
    <NoteState>
    <Router>
      
      <Navbar setprogress={setprogress} />
      <LoadingBar
          color='  #ff0000      '
          progress={progress}
          height={5}
        />
      <Alert alert={alert}/>
      <div className='container'>
      <Routes>
      {/* <Route exact path="/" element={ <Navigate to="/login" /> } /> */}
          <Route path="/" element={<Menu />} />
          <Route exact path="/dashboard" element={<Home setprogress={setprogress} showAlert={showAlert}/>} />
          <Route path="/about" element={<About/>} />
          <Route path="/login" element={<Login setprogress={setprogress} showAlert={showAlert}/>} />
          <Route path="/signup" element={<Signup setprogress={setprogress} showAlert={showAlert}/>} />    
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
