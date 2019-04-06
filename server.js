// lt --port 3000 --subdomain victor
var http = require('http');
var express = require('express');
var mysql = require('mysql');

var app = express()
var PORT = process.env.PORT || 3000;

app.listen(PORT);

console.log('*------------------------------*');  
console.log('Listening on port:' + PORT);  

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "bancodedados",
  database: "webserver"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

app.all('/', function (req, res) {
	res.send('web server working!');
})

app.post('/insertEdge/:a/:b/:v', function (req, res) {
  var a = req.params.a;
  var b = req.params.b;
  var v = req.params.v;

  var sql = "INSERT INTO edge (a, b, v) VALUES ('"+a+"','"+b+"',"+v+");";
  
  con.query(sql, function (err, result) {
    if (err) throw err;
    res.send("Inserido! :" + result.insertId);
  });
})

app.post('/insertHeuristic/:a/:b/:v', function (req, res) {
  var a = req.params.a;
  var b = req.params.b;
  var v = req.params.v;

  var sql = "INSERT INTO heuristic (a, b, v) VALUES ('"+a+"','"+b+"',"+v+");";
  
  con.query(sql, function (err, result) {
    if (err) throw err;
    res.send("Inserido! :" + result.insertId);
  });
})

app.post('/clearEdge', function (req, res) {
  var sql = "TRUNCATE edge;";

  con.query(sql, function (err, result) {
    if (err) throw err;
    res.send("Edges Apagado!");
  });
})

app.post('/clearHeuristic', function (req, res) {
  var sql = "TRUNCATE heuristic;";

  con.query(sql, function (err, result) {
    if (err) throw err;
    res.send("Heuristics Apagado!");
  });
})

app.get('/getEdge/:a/:b', function (req, res) {
  var a = req.params.a;
  var b = req.params.b;

  var sql = "SELECT * FROM edge WHERE a = '"+a+"' AND b = '"+b+"';";

  con.query(sql, function (err, result) {
    if (err) throw err;
    res.send({result});
  });
})

app.get('/getHeuristic/:a/:b', function (req, res) {
  var a = req.params.a;
  var b = req.params.b;

  var sql = "SELECT * FROM heuristic WHERE a = '"+a+"' AND b = '"+b+"';";

  con.query(sql, function (err, result) {
    if (err) throw err;
    res.send({result});
  });
})

app.get('/getEdges/:id', function (req, res) {
  var id = req.params.id;
    
  var sql = "SELECT * FROM edge WHERE a = '"+id+"' OR b = '"+id+"';";

  con.query(sql, function (err, result) {
    if (err) throw err;
    res.send({result});
  });
})
  
app.get('/getHeuristic/:id', function (req, res) {
  var id = req.params.id;
    
  var sql = "SELECT * FROM heuristic WHERE a = '"+id+"' OR b = '"+id+"';";

  con.query(sql, function (err, result) {
    if (err) throw err;
    res.send({result});
  });
})
