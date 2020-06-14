const fs = require('fs');
const express = require('express');
const { uuid } = require('uuidv4');
const bodyParser = require("body-parser");
const app = express();
var cors = require('cors');
const { Console } = require('console');
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());
function transformText(data) {
    const textToArray = data.split("\n");

    const finalData = []
    textToArray.forEach((textLine) => {
        let employeeObj = {}
        const arrayOfValues = textLine.split(",");
        for (i = 0; i < arrayOfValues.length; i++) {
            employeeObj.id = arrayOfValues[0];
            employeeObj.name = arrayOfValues[1];
            employeeObj.surname = arrayOfValues[2];
            employeeObj.address = arrayOfValues[3];
            employeeObj.phone = arrayOfValues[4];
            employeeObj.email = arrayOfValues[5];
            employeeObj.birthdate = arrayOfValues[6];
        }
        finalData.push(employeeObj);
    })
    return finalData;
}

function findEmployeeById(data, id) {
    return data.filter(elem => elem.id === id)[0]
}

app.get('/employees', (req, res) => {
    fs.readFile('employees.txt', 'UTF-8', (e, data) => {
        if (e) throw e;
        const formatedData = transformText(data);
        if (!formatedData) {
            res.sendStatus(404);
        } else {
            res.send(formatedData);
        }
    });
});

app.get('/employees/:id', (req, res) => {
    fs.readFile('employees.txt', 'UTF-8', (e, data) => {
        if (e) throw e;
        const id = req.params.id;
        const formatedData = transformText(data);
        const employee = findEmployeeById(formatedData, id)
        if (!employee) {
            res.sendStatus(404);
        } else {
            res.json(employee);
        }
    })
});

app.post('/employees', (req, res) => {
    const employee = req.body
    //Validation
    if (
        typeof employee.name != 'string' || 
        typeof employee.surname != 'string' ||
        typeof employee.phone != 'string' ||
        typeof employee.address != 'string' ||
        typeof employee.email != 'string' ||
        typeof employee.birthdate != 'string' 
        ) {
        res.sendStatus(400);
    } else {
        const bodyValuesArr = Object.values(employee);
        const newEmployee = uuid()+','+bodyValuesArr.join()
    //Save resource
        fs.appendFileSync('employees.txt',"\n"+newEmployee);
    //Return new resource
        const formatedEmployee = transformText(newEmployee);
        res.send(formatedEmployee[0]);
    }
});


app.listen(3000, () => { console.log('Server started in port 3000') });
