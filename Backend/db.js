const mongoose=require('mongoose');
const mongoURL="mongodb://localhost:27017/inotebook"
const connecttomongo=()=>{
    mongoose.connect(mongoURL,()=>{
        console.log("Connected")
    })
}
module.exports=connecttomongo;