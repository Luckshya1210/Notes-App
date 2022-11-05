import React from 'react'
import background from './bg1.jpg'
const Menu = (props) => {
    return (
        <>
            <div className='menclass' style={{
                backgroundImage: `url(${background})`, height: '670px',
                width: '117.5%',
                backgroundPosition: 'center center', backgroundSize: ' cover',
                margin: '-50px -116px', opacity: '100%', display: 'flex', alignContent: 'center', alignItems: 'center', textAlign: 'center', justifyContent: 'center',
                
            }}>
                <h1 id="menu">EverNote</h1>
                {/* <h2>One stop solution for all your notes needs!</h2> */}
                <br />
                {/* <img src={props.i}/> */}
            </div>
            <footer>
                <button id='footbtn'><a target='__blank' href='https://github.com/Luckshya1210/React-Notes-App'>This project</a></button>
                Copyright © EverNote Solutions LLP - All rights reserved  .</footer>
        </>
    )
}

export default Menu
