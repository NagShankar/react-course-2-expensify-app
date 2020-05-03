const path = require('path');
const express = require('express');
const app = express();
const publicPath = path.join(__dirname, '..', 'public'); //public directory

const port = process.env.PORT || 3000;

app.use(express.static(publicPath)); //telling express to serve up public directory

//refer express.js doc to know more
//if the requested file by the user is not present in public folder then give them back the index.html folder
app.get('*', (req,res)=>{
   res.sendFile(path.join(publicPath, 'index.html'));    
})

//start server for heroku or local running
app.listen(port, ()=>{
    console.log('server is up')
})