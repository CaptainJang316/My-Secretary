const express = require('express');
const db = require('../config/db');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
 
app.get('/todolist', (req,res) => {
    db.query('SELECT * FROM dailyToDoList_table', (err, data) => {
        if(!err) {
          console.log("response: ", res);
          res.send({ products : data});
        } else {
          console.log("err: ", err);
          res.send(err);
        }
    })
})

app.post('/updateTodolist', (req,res) => {

  console.log("+++++++++++++++++++++++++++++++++++++++++++++++++");
  console.log("req: ", req);

  db.query(req.body.sql, req.body.params, (err, data) => {
    if(!err) {
        res.send(data)
    } else {
        res.send(err)
    }});
})

 
module.exports = app;