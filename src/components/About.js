import React, { useContext, useEffect } from 'react'
import img from './abt.png'
// import noteContext from '../context/notes/noteContext'
const About = () => {
  // const a=useContext(noteContext)
  // useEffect(() => {
  // eslint-disable-next-line 
  //   a.update()

  // }, [])

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <h2 style={{ textAlign: 'center' }}>About EverNote</h2>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <img src={img} height='400px' width='500px'></img>
        <div>
          <h3 style={{ textAlign: 'center', margin: '41px 29px' }}>Evernote is one stop solution for all your notes needs!</h3>
          <p style={{ margin: '50px 80px', padding: '2px 2px' }}>Your notes are securely stored in our cloud databases.</p>
        </div>
      </div>
      
    </div>
  )
}

export default About
