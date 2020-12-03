const server = 'http://localhost:3000';
var studentId;
var studentName;
var studentScore;
var modal = document.querySelector('a')


window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
async function fetchStudents() {
    const url = server + '/students';
    const options = {
        method: 'GET',
        headers: {
            'Accept': 'application/json'
        }
    }
    const response = await fetch(url, options);
    const students = await response.json();
    populateContent(students);
    populatechart(students);
    graphChart(students);
}

async function addStudent() {
    const url = server + '/students';
    const student = { id: studentId, name: studentName, score: studentScore };
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(student)
    }
    const response = await fetch(url, options);
}


// Load data from file



function populateContent(students) {
    var table = document.getElementById('content');
    table.innerHTML = "<tr><th>Student Id</th><th>Full Name</th><th>Total score %</th></tr>";
    students.forEach(student => {
        var row = document.createElement('tr');
        var dataId = document.createElement('td');
        var textId = document.createTextNode(student.id);
        var dataScore = document.createElement('td');
        var textScore = document.createTextNode(student.score);
        dataId.appendChild(textId);
        dataScore.appendChild(textScore);

        //Creating the delete button
        var deleteBtn = document.createElement('a');
        var deleteText = document.createTextNode('Delete');
        deleteBtn.appendChild(deleteText);
        dataScore.appendChild(deleteBtn);
        deleteBtn.setAttribute('onClick', `deleteStudent(${student.id})`);

        var dataName = document.createElement('td');
        var textName = document.createTextNode(student.name);
        dataName.appendChild(textName);
        row.appendChild(dataId);
        row.appendChild(dataName);
        row.appendChild(dataScore);

        table.appendChild(row);

        row.classList.add(student.id);
        var element = student.id;

        // deleteBtn.addEventListener('click', (e) => {
        //     if (confirm(`Are you sure you want to delete ${student.name}'s data?`)) {
        //         deleteBtn.parentElement.parentElement.remove()
        //     }

        // })

    });
    deleteStudent(studentId)
}
//Delet student function
async function deleteStudent(studentId) {
    const url = server + '/students/delete';
    const options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ "id": studentId }),
    }
    const response = await fetch(url, options);
    const students = await response.json()
    populateContent(students);
}

document.querySelector('form').addEventListener('submit', (e) => {
    studentId = document.getElementById('studentId').value;
    studentName = document.getElementById('studentName').value;
    studentScore = document.getElementById('studentScore').value;

    if (studentId && studentName && studentScore) {
        studentId = parseInt(studentId);
        studentScore = parseInt(studentScore);
        addStudent();
        fetchStudents();

    }
    e.preventDefault();
});