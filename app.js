import express from 'express'

const app = express();

const PORT  = process.env.PORT || 1234

app.listen(PORT, ()=>{
    console.log('This application litening on the port http://localHost:'+PORT)
})