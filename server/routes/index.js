const express = require('express');
const db = require('../config/db');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
 
app.get('/todolist/:date', (req, res) => {
    console.log("req.params.date: ", req.params.date);
    console.log("req.params: ", req.params);
    db.query('SELECT * FROM dailyToDoList_table WHERE `date` = ?', req.params.date, (err, data) => {
        if(!err) {
          res.send({ products : data});
        } else {
          console.log("err: ", err);
          res.send(err);
        }
    })
})

app.get('/getDateData', (req, res) => {
  db.query('SELECT date FROM dailyToDoList_table', (err, data) => {
      if(!err) {
        res.send({ products : data});
      } else {
        res.send(err);
      }
  })
})

app.post('/toggleIsComplishTask', (req,res) => {

  console.log("+++++++++++++++++++++++++++++++++++++++++++++++++");
  // console.log("req: ", req);

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


app.post('/deleteTask', (req,res) => {

  const sql = "DELETE FROM `todolist`.`dailytodolist_table` WHERE `id` = ?";

  db.query(sql, req.body.params, (err, data) => {
    if(!err) {
        res.send(data)
    } else {
        res.send(err)
    }});
})


 
module.exports = app;