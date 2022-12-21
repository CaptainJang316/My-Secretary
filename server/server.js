const express = require('express');
const path = require('path');
const app = express();
// const api = require('./src/index');
// app.use('/api', api);

const PORT = process.env.PORT || 4000;

// app.get('/', (req, res) => {
//     res.send({ test : 'this is test!!'});
// })

app.use( express.static( path.join(__dirname, '../build') ) );

app.get('*',function(request, response){
    response.sendFile( path.join(__dirname, '../build/index.html'))
  })

app.listen(PORT, () => {
    console.log(`Server run : http://localhost:${PORT}/`)
})
