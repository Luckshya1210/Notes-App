import React from 'react'
import { useContext } from 'react';
import noteContext from '../context/notes/noteContext';
const NoteItem = (props) => {

  const context = useContext(noteContext);
  const { deletenote } = context;
  const { note, updatenote } = props
  return (

    <div className='col-md-3'>

      <div className="card my-3">

        <div className="card-body">
          <div className='d-flex align-items-center' style={{height:'50px'}}>

            <h5 className="card-title">{note.title}</h5>
            <i className="fa-regular fa-trash-can mx-2" onClick={() => { deletenote(note._id); props.showAlert("Deleted successfully!", "success") }} ></i>
            <i className="fa-regular fa-pen-to-square mx-2" onClick={() => { updatenote(note) }}></i>
          </div>
          <p className="card-text"> {note.description}</p>
          {/* <a href="#" className="btn btn-primary">Go somewhere</a> */}
        </div>
      </div>
    </div>
  )
}

export default NoteItem
