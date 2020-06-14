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

// function objejctToTxt(data) {
//     const {}
// }

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
    const employee = JSON.stringify(req.body);
    console.log(employee)
    //Validation
    if (
        req === undefined
        // typeof employee.name != 'string' || typeof employee.surname != 'string'
        ) {
        res.sendStatus(400);
    } else {
        const body = req.body;
        const bodyValuesArr = Object.values(body);
        const newEmployee = uuid()+','+bodyValuesArr.join()
        console.log(newEmployee)

        //Save resource
        // const newEmployee= '31,Clara,Dios,"1925 Mattson Street",503-431-9711,DonaldBSchmidt@rhyta.com,11/27/1952';
        fs.appendFileSync('employees.txt',"\n"+newEmployee);
        //Return new resource
        res.json(newEmployee);
    }
});


app.listen(3000, () => { console.log('Server started in port 3000') });
