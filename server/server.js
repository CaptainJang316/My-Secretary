const express = require('express');
const path = require('path');
const app = express();
const db = require('./config/db');
const api = require('./routes/index');
const bodyParser = require('body-parser');
app.use('/api', api);

const PORT = process.env.PORT || 4000;

// app.get('/', (req, res) => {
//     res.send({ test : 'this is test!!'});
// })

app.use( express.static( path.join(__dirname, '../build') ) );

app.get('*',function(request, response){
    // db.query('SELECT * FROM dailyToDoList_table', (err, data) => {
    //     if(!err) {
    //       console.log("response: ", response);
    //       response.send({ products : data});
    //     } else {
    //       console.log("err: ", err);
    //       response.send(err);
    //     }
    // })
    response.sendFile( path.join(__dirname, '../build/index.html'))
  })

app.listen(PORT, () => {
    console.log(`Server run : http://localhost:${PORT}/`)
})
