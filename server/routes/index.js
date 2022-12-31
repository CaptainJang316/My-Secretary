const express = require('express');
const router = express();
const db = require('../config/db')
 
// http://localhost:4000/ 으로 접속 시 응답메시지 출력
router.get('/todolist', (req,res) => {
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
 
module.exports = router;