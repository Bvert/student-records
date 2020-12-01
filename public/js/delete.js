// This assumes you've already installed 'jsonfile' via npm
var jsonfile = require('jsonfile');

// This assumes you've already created an app using Express.
// You'll need to pass the 'id' of the object you need to edit in
// the 'PUT' request from the client.
app.put('/edit/:id', function(req, res) {
    var id = req.params.id;
    var newText = req.body.text;

    // read in the JSON file
    jsonfile.readFile('/path/to/file.json', function(err, obj) {
        // Using another variable to prevent confusion.
        var fileObj = obj;

        // Modify the text at the appropriate id
        fileObj[id].text = newText;

        // Write the modified obj to the file
        jsonfile.writeFile('/path/to/file.json', fileObj, function(err) {
            if (err) throw err;
        });
    });
});