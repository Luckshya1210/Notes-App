import React, { useState } from "react";
import NoteContext from "./noteContext";

const NoteState=(props)=>{
  const host="http://localhost:5000"
    // const s1={
    //     "name":"Harry",
    //     "class":"5b"
    // }
    // const [state,setstate]=useState(s1);
    // const update=()=>{
    //     setTimeout(() => {
    //         setstate({
    //             "name":"Larry",
    //             "class":"11s"
    //         })
    //     }, 1000);
    // }
    const notesinitial=[]

    const [notes,setnotes]=useState(notesinitial)
    const getnotes=async()=>{
      //api
      const response = await fetch(`${host}/api/notes/fetchallnotes`, {
        method: 'GET', 
        headers: {
          'Content-Type': 'application/json',
          "auth-token":localStorage.getItem('token')
        },
      
        // body: JSON.stringify({title,description,tag}) 
      });
      //  const json=response.json();
      const json=await response.json()
      console.log(json)
      // console.log(json)/
      setnotes(json)
    }
    //Add a note

    const addnote=async (title,description,tag)=>{
      //api
      const response = await fetch(`${host}/api/notes/addnote`, {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json',
          "auth-token":localStorage.getItem('token')
        },
      
        body: JSON.stringify({title,description,tag}) 
      });
      //  const json=await response.json();
      //  console.log(json)
        const note=await response.json()
        setnotes(notes.concat(note))
    }
    //delete a note
    const deletenote=async(id)=>{

      const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
        method: 'DELETE', 
        headers: {
          'Content-Type': 'application/json',
          "auth-token":localStorage.getItem('token')
        },
      
   //     body: JSON.stringify({title,description,tag}) 
      });

      // console.log("delete"+id);
       const json=await response.json(); 
       console.log(json);
      const newnotes=notes.filter((note)=>{return note._id!==id})
      setnotes(newnotes)
    }



    //edit a note
    const editnote=async (id,title,description,tag)=>{
      //api call
      
      const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
        method: 'PUT', 
        headers: {
          'Content-Type': 'application/json',
          "auth-token":localStorage.getItem('token')
        },
      
        body: JSON.stringify({title,description,tag}) 
      });
       const json=await response.json(); 
       console.log(json)
       let newNotes = JSON.parse(JSON.stringify(notes))     
      for (let index = 0; index < newNotes.length; index++) {
        const element = newNotes[index];
        if(element._id===id){
          newNotes[index].title = title;
          newNotes[index].description = description;
          newNotes[index].tag = tag; 
          break;
        }
      }
      setnotes(newNotes)
    }
    return (
        <NoteContext.Provider value={{notes,addnote,deletenote,editnote,getnotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}


export default NoteState