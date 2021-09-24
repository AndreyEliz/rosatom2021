const express = require('express');
var cors = require('cors')
const excelToJson = require('convert-excel-to-json');
fs = require('fs');



const app = express();
app.use(cors({credentials: true, origin: "http://localhost:3000"}));
const port = 44358;

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

app.get('/', (request, response) => response.send(''))


app.listen(port, (err) => {
    if (err) {
        return console.log('something bad happened', err)
    }
    console.log(`server is listening on ${port}`)
})

/**
 * mocks
 */

app.post('/api/authentication/token',(request, response) => {
    const payload = {
        username: request.body.username
    }
    response.send(payload)
})

let flattenData;

app.post('/api/data', (request, response) => {
    const raw = excelToJson({
        sourceFile: 'Данные для аналитики.xlsx'
    });
    const result = transformdata(raw);

    flattenData = result;

    response.send(result)
})

app.post("/api/rate", (request, response) => {
    response.send("")
})

function transformdata(raw) {
    const mentors = raw["Наставники"].map((person) => ({[person["A"]]: true}));
    delete raw["Наставники"];
    const persons = Object.values(raw).map((month, index) => {
        month.shift();
        month.shift();
        month.shift();
        month.forEach((person) => person.month = index)
        return month;
    });
    const flatten = [].concat(...persons).map((person) => ({
        id: person["A"],
        role: person["B"],
        birth: new Date(person["C"]),
        gender: person["D"],
        familyStatus: person["E"],
        startDate: new Date(person["F"]),
        firedDate: person["G"] ? new Date(person["G"]) : null,
        afkReason: person["H"],
        daysAfk: person["I"],
        salary: person["J"],
        city: person["K"],
        children: person["L"],
        month: person.month
    }))
    flatten.forEach((person) => {
        person.hasMentor = !!mentors[person.id]
    })
    
    return flatten;
}


