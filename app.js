const express = require('express');
const mysql = require('mysql');

// Create connection
const db = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'my_db',
  port: '8889'
})

// Connect
db.connect((err) => {
    if(err) throw err;
    console.log('MySql Connected...')
})

const app = express();

// Insert item
app.get('/add-car', (req, res) => {
    let car = {model: 'Focus', make:'Ford', year: '2011'};
    let sql = 'INSERT INTO cars SET ?';
    let query = db.query(sql, car, (err, result) => {
      if(err) throw err;
      console.log(result)
      res.send('Car created')
    })
})

// Select all items
app.get('/get-cars', (req, res) => {
    let sql = 'SELECT * FROM cars';
    let query = db.query(sql, (err, results) => {
      if(err) throw err;
      res.send(results)
    })
})

// Select single item
app.get('/get-car/:id', (req, res) => {
    let sql = `SELECT * FROM cars WHERE id = ${req.params.id}`;
    let query = db.query(sql, (err, result) => {
      if(err) throw err;
      res.send(result)
    })
})

// Update single item
app.get('/update-car/:id', (req, res) => {
    let newMake, newModel
    newMake = 'Toyota'
    newModel = 'Celica'
    let sql = `UPDATE cars SET model = '${newModel}', make = '${newMake}' WHERE id = ${req.params.id}`;
    let query = db.query(sql, (err, result) => {
      if(err) throw err;
      res.send('Car updated')
    })
})

// Delete single item
app.get('/delete-car/:id', (req, res) => {
    let sql = `DELETE FROM cars WHERE id = ${req.params.id}`
    let query = db.query(sql, (err, result) => {
        if(err) throw err;
        res.send('Car deleted')
    })
})

app.listen('3000', () => {
    console.log('Server started on port 3000');
});