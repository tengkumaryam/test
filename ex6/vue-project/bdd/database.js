const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const con = mysql.createConnection({
    host: '192.168.107.121',
    user: 'root',
    password: 'ZNvZO0Fyxq1JcaVqh2tRVpFm3uGgv2qW',
    database: 'exercice6',
    port: 3306
});

con.connect(err => {
    if (err) {
        console.error('Error in database connection :(', err);
        return;
    }
    console.log('You are connected to the database!');
});

app.get('/', (req, res) => {
    con.query('SELECT * FROM comments;', (err, results) => {
        if (err) {
            return res.status(500).json(err);
        }
        res.json(results);
    });
});

const port = 4000;
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});