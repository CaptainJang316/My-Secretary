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

app.post('/toggleIsComplishTask', (req,res) => {

  console.log("+++++++++++++++++++++++++++++++++++++++++++++++++");
  console.log("req: ", req);

  const sql = "UPDATE `todolist`.`dailytodolist_table` SET `isComplished` = ? WHERE `id` = ?";

  db.query(sql, req.body.params, (err, data) => {
    if(!err) {
        res.send(data)
    } else {
        res.send(err)
    }});
})


app.post('/addNewTask', (req,res) => {

  const sql = "INSERT INTO `todolist`.`dailytodolist_table` (`id`, `text`, `isComplished`, `date`) VALUES (?, ?, ?, ?)";

  db.query(sql, req.body.params, (err, data) => {
    if(!err) {
        res.send(data)
    } else {
        res.send(err)
    }});
})

 
module.exports = app;