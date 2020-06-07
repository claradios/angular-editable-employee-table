const fs = require('fs');
const express = require('express');
const app = express();
var cors = require('cors');

app.use(cors())

function transformText(data) {
    const textToArray = data.split("\n");
    
    const finalData = []
    textToArray.forEach((textLine)=>{
        let employeeObj = {}
        const arrayOfValues = textLine.split(",");
        for (i=0; i< arrayOfValues.length; i++) {
            employeeObj.id =arrayOfValues[0];
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

fs.readFile('employees.txt','UTF-8', (e, data) => {
    if (e) throw e;
    const formatedData = transformText(data);
    console.log(formatedData)

});

app.use('/employees', (req, res) => {
    fs.readFile('employees.txt','UTF-8', (e, data) => {
        if (e) throw e;
        const formatedData = transformText(data);
        res.send(formatedData);
    });
});

app.listen(5555);

