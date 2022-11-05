import React, { useState } from 'react'
import { useContext } from 'react';
import noteContext from '../context/notes/noteContext';
const AddNote = (props) => {
  const context = useContext(noteContext);
  const { addnote } = context;
  const [note, setnote] = useState({ title: "", description: "", tag: "" })
  const handleclick = (e) => {
    //to prevent page form reload
    e.preventDefault();

    addnote(note.title, note.description, note.tag);
    setnote({ title: "", description: "", tag: "" });
    props.showAlert("Added successfully!","success")
  }
  const onchange = (e) => {
    setnote({ ...note, [e.target.name]: e.target.value })
  }
  return (
    <>
      <div className='container my-3'>
        <h2 style={{textAlign:'center'}}>Welcome Back!</h2>
        <h2>Add a note</h2>
        <form className='my-3'>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Title</label>
            <input type="text" className="form-control" id="title" name="title" value={note.title} aria-describedby="emailHelp" minLength={5} required onChange={onchange} />

          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <input type="text" className="form-control" id="description" name='description' value={note.description} minLength={5} required onChange={onchange} />
          </div>
          <div className="mb-3">
            <label htmlFor="tag" className="form-label">Tag</label>
            <input type="text" className="form-control" id="tag" name='tag' value={note.tag} minLength={5} required onChange={onchange} />
          </div>

          <button disabled={note.title.length<5 || note.description.length<5} type="submit" className="btn btn-primary" onClick={handleclick}>Add Note</button>
        </form>
      </div>
    </>
  )
}

export default AddNote
