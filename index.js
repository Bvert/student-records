const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const port = 3000;
const jsonParser = bodyParser.json();
const fileName = "students.json";


// Load data from file
let rawData = fs.readFileSync(fileName);
let data = JSON.parse(rawData);


app.set('views', 'views');
app.set('view engine', 'hbs');
app.use(express.static('public'));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }))


app.get('/', (request, response) => {

    response.render('home');

});

// This is a RESTful GET web service
app.get('/students', (request, response) => {
    data.sort((a, b) => (a.name > b.name) ? 1 : -1);
    response.send(data);
});

//Delete
app.delete('/students/delete', (req, res) => {
    const id = req.body.id;

    const deleted = data.find(item => item.id == id);
    if (deleted) {
        data = data.filter(item => item.id != id);
        var dataNew = JSON.stringify(data, null, 2);
        fs.writeFile('students.json', dataNew, finished);


        function finished(err) {
            console.log(`${deleted.name} deleted succesfully`);
        }

    } else {
        res.status(404).json({ message: 'Not found yoh!' })
    }

})


// This is a RESTful POST web service
app.post('/students', jsonParser, (req, res) => {

    var exists = false;
    let id = req.body.id;

    data.forEach(student => {
        if (student.id === id) {
            exists = true;
        }
    });
    if (!exists) {
        try {
            data.push(req.body);
            fs.writeFileSync(fileName, JSON.stringify(data, null, 2));
            res.end();
        } catch (e) {
            console.log('Error');
        }
    }

});

app.listen(port);
console.log(`server listening on port ${port}`);