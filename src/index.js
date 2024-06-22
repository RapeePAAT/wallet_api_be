const express = require('express')
const cors = require('cors');
const bodyParser = require('body-parser');
const app  = express();
const port = 3001 ;
const {Migrate} = require('./models/model')

app.use(bodyParser.json())


//router v1
app.use(require('./routes/router'))

app.get('/',(req,res)=>{
    res.status(200).json({
        status:true , 
        message:"Hello to my server"
    }).end()
})


app.listen(port , ()=>{
    console.log("server is running on : http://localhost:3001/")
})