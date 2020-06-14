const fs = require('fs');
const express = require('express');
// const uuid = require('uuid/v4');
const { uuid } = require('uuidv4');
const bodyParser = require('body-parser')
const app = express();
var cors = require('cors');
// https://stackoverflow.com/questions/33418777/node-js-write-a-line-into-a-txt-file
// https://dev.to/sergchr/tricks-on-writing-appending-to-a-file-in-node-1hik
// https://stackoverflow.com/questions/3459476/how-to-append-to-a-file-in-node/43370201#43370201
// https://stackoverflow.com/questions/3459476/how-to-append-to-a-file-in-node
app.use(cors())

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
    const employee = req.body;
    console.log(employee)
    //Validation
    if (
        req === undefined
        // typeof employee.name != 'string' || typeof employee.surname != 'string'
        ) {
        res.sendStatus(400);
    } else {
        //Create object with needed fields and assign id
        // const newEmployee = {
        //     id: uuid(),
        //     name: employee.name,
        //     surname: employee.surname,
        //     address: employee.address,
        //     phone: employee.phone,
        //     email: employee.email,
        //     birthdate: employee.birthdate
        // };
      

        //Save resource
        // const newEmployeeToStr = JSON.stringify(newEmployee)
        // fs.appendFile('employees.txt', newEmployeeToStr, function (err) {
        //     if (err) return console.log(err);
        //     console.log('Appended!');
        //  });
        fs.appendFileSync('employees.txt','31,Clara,Dios,"1925 Mattson Street",503-431-9711,DonaldBSchmidt@rhyta.com,11/27/1952'+"\n");
        //Return new resource
        res.json({hello: 'hello'});
    }
});


app.listen(3000, () => { console.log('Server started in port 3000') });
