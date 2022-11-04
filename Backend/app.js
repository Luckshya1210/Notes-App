const connecttomongo=require('./db');
const express = require('express')
connecttomongo();
var cors = require('cors')
const app = express()
const port = 5000
//middleware to access body
// var app = express()
 
app.use(cors())
app.use(express.json())

//available routes
app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

app.listen(port, () => {
  console.log(`iNotebook backend listening on port ${port}`)
})