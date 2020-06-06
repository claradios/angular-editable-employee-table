const fs = require('fs');
const express = require('express');
const app = express();

fs.readFile('employees.txt','UTF-8', (e, data) => {
    if (e) throw e;
    console.log(data);
});

app.use('/', (req, res) => {
    fs.readFile('employees.txt','UTF-8', (e, data) => {
        if (e) throw e;
        res.send(data);
    });
});

app.listen(5555);