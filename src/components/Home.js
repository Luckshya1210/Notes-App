import React,{useContext} from 'react'


import Notes from './Notes';
const Home = (props) => {
  
  return (
    <div>
    
      <Notes showAlert={props.showAlert} setprogress={props.setprogress}/>
    {/* </div> */}
    </div>
  )
}

export default Home
