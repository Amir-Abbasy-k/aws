const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');

const app = express();
app.use(cors());

const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Create connection
const db = mysql.createConnection({
  host     : 'test.clllnzt0myvb.us-east-2.rds.amazonaws.com',
  user     : 'admin',
  password : 'amirtest',
  database : 'users'
});

// Connect
db.connect((err) => {
  if(err){
      throw err;
  }
  console.log('MySql Connected...');
});




///////////////////////		GET STARTED	//////////////////////
app.get('/getusers', (req, res) => {
  const sql = `SELECT * FROM clients`;
  db.query(sql, (err, results) => {
  if(err){ return res.send(err) }
  else { return res.json({data: results})}
  })
})



app.get('/addUser', (req, res) => {
  const {username, pass} = req.query
  let post = {username: username, pass: pass};
  let sql = 'INSERT INTO clients SET ?';
  let query = db.query(sql, post, (err, result) => {
      if(err) throw err;
      console.log(result);
      res.send('User successfully added...');
  });
});




app.listen(port, () => console.log(`Listening on port ${port}`));