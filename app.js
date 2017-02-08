const express = require('express');
let app = express();

app.use('/build', express.static(__dirname + '/build'));
app.use('/', express.static(__dirname + '/examples'));


app.get('/', function (req, res) {
	res.sendFile('index.html');
});

app.listen(5000, function () {
	console.log('Example app listening on port 5000!');
});
