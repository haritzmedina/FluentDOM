const express = require('express');
let app = express();

const PORT = process.env.PORT || 5000;

app.use('/build', express.static(__dirname + '/build'));
app.use('/', express.static(__dirname + '/examples'));


app.get('/', function (req, res) {
	res.sendFile('index.html');
});

app.listen(PORT, function () {
	console.log('Example app listening on port '+PORT+'!');
});
