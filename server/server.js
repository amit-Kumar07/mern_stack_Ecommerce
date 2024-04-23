const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload')

const app = express();
app.use(express.json())
app.use(cookieParser())
app.use(fileUpload({
    useTempFiles:true
}))
app.use(express.urlencoded({extended:true}))
const PORT = process.env.PORT || 4000;

app.listen(PORT, ()=>{
    console.log(`server is running on localhost ${PORT}`)
})

app.get('/', (req, res)=>{
    res.json({msg:"This is Example"})
})

//Routes
app.use('/user', require('./routes/userRouter'))
app.use('/api', require('./routes/categoryRouter'))
app.use("/api", require('./routes/upload'))
app.use('/api', require('./routes/productRouter'))


//connect mongodb
const URI = process.env.MONGODB_URL;

mongoose.connect(URI).then(()=>{
    console.log("Db connected successfully")
}).catch(err=>{
    console.log(err)
})
