var express = require('express');
var app = express();

// set the port of our application
// process.env.PORT lets the port be set by Heroku
var port = process.env.PORT || 8080;

app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));

var favicon = require('serve-favicon');
app.use(favicon(__dirname + '/public/images/favicon.ico'));

var bodyParser = require('body-parser')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

app.get('/', function(req, res) {

	// ejs render automatically looks in the views folder
	res.render('pages/index');
});

app.post('/report', function(req, res) {
	
	var report = require('./routes/report');
	var result = report.report(req.body['landingpages'], req.body['keywords'], res);
});

app.get('/help', function(req, res) {

	res.render('pages/help');
});

app.get('/contact', function(req, res) {

	res.render('pages/contact');
});

app.get('/emailsubmitted', function(req, res) {

	res.render('pages/emailsubmitted');
});

app.listen(port, function() {
	console.log('Our app is running on http://localhost:' + port);
});
