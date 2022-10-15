const mongoose = require('mongoose');
const {Schema}=mongoose
const NotesSchema = new Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
        //adding userid for specific notes to a specific person
    },
    title:{
        type:String,
        required:true,  
    },
    description:{
        type:String,
        required:true, 
        // unique:true 
    },
    tag:{
        type:String,
        required:true, 
        default:"General" 
    },
    date:{
        type:Date,
        default:Date.now    
    },
    

  });
  module.exports=mongoose.model('notes',NotesSchema)