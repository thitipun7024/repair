var express = require('express')
var cors = require('cors')
var app = express()

var bodyParser = require('body-parser')
var jsonparsor = bodyParser.json()

app.use(cors());
// connect my maraidb
const mysql = require('mysql2');
//create connect database
const connection = mysql.createConnection({
    host: 'localhost'
    , user: 'root'
    , password: '123456'
    , database: 'react-api'
    });



// end point //
app.post('/creates', jsonparsor , function(req, res, next){
  //console.log('test')
  //res.json({msg:req.body})
  
  //insert sql
  connection.execute("INSERT INTO user (fname,lname,username,email,avatar) VALUE (?,?,?,?,?)",[req.body.fname, req.body.lname, req.body.username, req.body.email, req.body.avatar],
        function(err,result,fields){
          
                    if(err){
                      res.json({status:'error',massage:err})
                      return
                    }else{
                      res.json({status:'ok'})
                    }
        });
});
//insert sql


//endpoint
app.get('/listuser', jsonparsor , function(req, res, next){
  //console.log('test')
  //res.json({msg:req.body})
  
  //insert sql
  connection.execute("SELECT * FROM user",
        function(err,result,fields){
          
                    if(err){
                      res.json({status:'error',massage:err})
                      return
                    }else{
                      res.json(result);
                    }
        });
});
//select sql

//update sql
app.post('/update', jsonparsor , function(req, res, next){
  //console.log('test')
  //res.json({msg:req.body})
  
  //insert sql
  connection.execute("UPDATE user SET fname = (?), lname = (?), username = (?), email = (?), avatar = (?) WHERE id = (?)",
  [req.body.fname, req.body.lname, req.body.username, req.body.email, req.body.avatar, req.body.id],
  function(err, result, fields) {
    if (err) {
      res.json({ status: 'error', message: err });
      return;
    }
    res.json({ status: "ok", user: result.id });
  }
);
});
//update sql


// end point //
app.delete('/delete', jsonparsor , function(req, res, next){
  //console.log('test')
  //res.json({msg:req.body})
  
  //delete sql
  connection.execute("DELETE FROM user WHERE id = (?) ",[req.body.id],
        function(err,result,fields){
          
                    if(err){
                      res.json({status:'error',massage:err})
                      return
                    }else{
                      res.json({status:'ok'})
                    }
        });
});
//delete sql


app.post('/useredit/:id', jsonparsor, function(req, res, next) {
  const id = req.params.id;

  connection.execute("SELECT * FROM user WHERE id = ?",
    [id],
    function(err, result, fields) {
      if (err) {
        res.json({ status: 'error', message: err });
        return;
      } else {
        res.json(result);
      }
    });
});


app.listen(3336, function () {
    console.log('CORS-enabled web server listening It work now port 3336')
  });


  