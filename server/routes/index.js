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

  const sql = "INSERT INTO `todolist`.`dailytodolist_table` (`text`, `isComplished`, `date`) VALUES (?, ?, ?)";

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



app.get('/scheduleList/:date', (req, res) => {
  console.log("scheduleList -> req.params.date: ", req.params.date);
  console.log("scheduleList -> req.params: ", req.params);
  db.query('SELECT * FROM schedule_table WHERE `date` = ?', req.params.date, (err, data) => {
      if(!err) {
        res.send({ products : data});
      } else {
        console.log("err: ", err);
        res.send(err);
      }
  })
})

app.post('/addNewScheduleItem', (req, res) => {
  const sql = "INSERT INTO schedule_table (`text`, `date`) VALUES (?, ?)";

  db.query(sql, req.body.params, (err, data) => {
    if(!err) {
        res.send(data)
    } else {
        res.send(err)
    }});
})

app.post('/deleteScheduleItem', (req, res) => {
  const sql = "DELETE FROM schedule_table WHERE `id` = ?";

  db.query(sql, req.body.params, (err, data) => {
    if(!err) {
        res.send(data)
    } else {
        res.send(err)
    }});
})

 
module.exports = app;