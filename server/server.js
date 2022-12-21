const express = require('express');
const app = express();
const api = require('./src/index');
app.use('/api', api);

const PORT = process.env.PORT || 4000;

app.get('/', (req, res) => {
    res.send({ test : 'this is test!!'});
})

app.listen(PORT, () => {
    console.log(`Server run : http://localhost:${PORT}/`)
})
