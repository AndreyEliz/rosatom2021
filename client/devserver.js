const express = require('express');
var cors = require('cors')
const excelToJson = require('convert-excel-to-json');
fs = require('fs');


const positions = {
    "Ведущий инженер": 3,
      "машинист": 1,
      "инженер": 3,
      "начальник смены": 2,
      "заведующий хозяйством": 1,
      "заместитель начальника отдела": 1,
      "электрослесарь": 2,
      "эксперт": 3,
      "инспектор": 3,
      "электромонтер ": 2,
      "главный специалист": 3,
      "мастер": 2,
      "Старший оператор ": 1,
      "ведущий специалист": 3,
      "заместитель главного инженера": 3,
      "слесарь": 2,
      "лаборант ": 2,
      "Ведущий экономист": 3,
      "заместитель директора": 3,
      "оператор": 1,
      "заместитель главного бухгалтера": 3,
      "диспетчер": 1,
      "кладовщик 3 разряда": 1,
      "главный бухгалтер": 3,
      "заместитель начальника цеха": 2,
      "аппаратчик": 1,
      "ведущий инструктор": 3,
      "заточник": 1,
      "главный инспектор": 3,
      "главный инженер": 3,
      "Директор": 3,
      "начальник цеха": 3,
      "ведущий юрисконсульт": 3,
      "электрогазосварщик 5 разряда": 1,
      "заместитель начальника управления": 3,
      "экономист": 3,
      "Ведущий специалист": 3,
      "аккумуляторщик ": 1,
      "электромеханик": 2,
      "бухгалтер": 3,
      "Эксперт": 3,
      "ведущий бухгалтер": 3,
      "электрогазосварщик 6 разряда": 1,
      "Специалист": 3,
      "токарь": 2,
      "Главный специалист": 3,
      "фрезеровщик 6 разряда": 1,
      "водитель автомобиля": 1,
      "техник": 1,
      "дежурный": 1,
      "электрогазосварщик 4 разряда": 2,
      "Ведущий инструктор": 2,
      "метролог": 3,
      "шлифовщик 6 разряда": 1,
      "фрезеровщик 5 разряда": 1,
      "шлифовщик 5 разряда": 1,
      "кладовщик 2 разряда": 2,
      "заведующий складом:": 2,
    }


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
    let result;
    if (!flattenData) {
        const raw = excelToJson({
            sourceFile: 'Данные для аналитики.xlsx'
        });
        flattenData = transformdata(raw);
    }
    result = flattenData.filter((data) => {
        return !Object.keys(request.body).find((key) => data[key].toString() !== request.body[key])
    })

    response.send(result)
})

app.post("/api/rate", (request, response) => {
    response.send("")
})

app.post("/api/fired", (request, response) => {
    if (!flattenData) {
        const raw = excelToJson({
            sourceFile: 'Данные для аналитики.xlsx'
        });
        flattenData = transformdata(raw);
    }
    const result = flattenData.filter((person) => !!person.EndDate)
    console.log(result)
    response.send(result)
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
        Id: person["A"],
        Position: positions[person["B"]],
        DateOfBirth: new Date(person["C"]),
        Sex: person["D"],
        MaritalStatus: person["E"],
        StartDate: new Date(person["F"]),
        EndDate: person["G"] ? new Date(person["G"]) : null,
        NameOfAbsence: person["H"],
        CalendarDaysOfAbsence: person["I"],
        Rate: person["J"],
        City: person["K"],
        CountOfChildren: person["L"],
        Month: person.month.toString()
    }))

    flatten.forEach((person) => {
        person.HasMentor = !!mentors[person.id]
    })
    
    return flatten;
}


