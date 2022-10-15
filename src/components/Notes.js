import React from 'react'
import { useContext, useEffect, useRef,useState } from 'react';
import noteContext from '../context/notes/noteContext';
import NoteItem from './NoteItem';
import AddNote from './AddNote';
import {useNavigate} from 'react-router-dom'
const Notes = (props) => {
  const context = useContext(noteContext);
  const navigate = useNavigate()
  const { notes, getnotes,editnote } = context;
  const [note, setnote] = useState({ id:"",etitle: "", edescription: "", etag: "" })
  useEffect(() => {

    if(localStorage.getItem('token')){

      getnotes()
    }
    else{
      navigate('/login')
    }
    // eslint-disable-next-line
  }, [])
  const updatenote = (currnote) => {
    ref.current.click();
    setnote({id:currnote._id,etitle:currnote.title,edescription:currnote.description,etag:currnote.tag})
    // props.showAlert("Updated successfully!","success")
  }
  const handleclick = (e) => {
    console.log("Updating the note..",note);
    //to prevent page form reload
    // e.preventDefault();
    editnote(note.id,note.etitle,note.edescription,note.etag)
    refclose.current.click();
    props.showAlert("Updated successfully!","success")
    // addnote(note.title, note.description, note.tag)
  }
  const onchange = (e) => {
    setnote({ ...note, [e.target.name]: e.target.value })
  }
  const ref = useRef(null)
  const refclose = useRef(null)
  // console.log(notes.title)
  return (
    <>
      <AddNote showAlert={props.showAlert}/>
      {/* <!-- Button trigger modal --> */}
      <button type="button" className="btn btn-primary d-none" ref={ref} data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>

      {/* <!-- Modal --> */}
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note </h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form className='my-3'>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">Title</label>
                  <input type="text" className="form-control" id="etitle" name="etitle" minLength={5} required value={note.etitle} aria-describedby="emailHelp" onChange={onchange} />

                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">Description</label>
                  <input type="text" className="form-control" id="edescription" name='edescription' minLength={5} required value={note.edescription} onChange={onchange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="tag" className="form-label">Tag</label>
                  <input type="text" className="form-control" id="etag" name='etag' value={note.etag} onChange={onchange} />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" ref={refclose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button disabled={note.etitle.length<5 || note.edescription.length<5} type="button" className="btn btn-primary" onClick={handleclick}>Save Note</button>
            </div>
          </div>
        </div>
      </div>
      <div className='row my-3'>
        <h2>Your notes</h2>
        <div className='container mx-2'>
        {notes.length===0 && 'No notes to display!'}
        </div>
        {notes.map((note) => {
          return <NoteItem key={note._id} updatenote={updatenote} note={note} showAlert={props.showAlert} />;
        })}
      </div>
    </>
  )
}

export default Notes
