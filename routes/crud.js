const router = require("express").Router();
const fs = require("fs");
const fileName = "StudentGrades.json";

let rawData = fs.readFileSync(fileName);
let data = JSON.parse(rawData);


//This is the route to delete
router.get('/', (req, res) => {
    res.render('students')
})
router.get('/studentsInfo', (req, res) => {
    data.sort((a, b) => (a.name > b.name) ? 1 : -1);
    res.send(data);
})

router.post("/", (req, res) => {
    var exists = false;
    data.forEach(student => {
        if (student.id === req.body.id) {
            exists = true;
            res.status(400).json({ text: "This student has already been registered", error: true });
        }
    });
    if (!exists) {
        try {
            data.push(req.body);
            fs.writeFileSync(fileName, JSON.stringify(data, null, 2));
            res.status(200).json({ text: "Success", error: false });
        } catch (e) {
            res.status(400).json({ text: "An error occured", error: true });
        }
    }
})

router.delete("/students", (req, res) => {
    var newData = data.filter((studentItem) => studentItem.id != req.body.id);
    fs.writeFileSync(fileName, JSON.stringify(newData, null, 2));
    newData.sort((a, b) => (a.name > b.name) ? 1 : -1);
    res.send(newData);
});

module.exports = router;