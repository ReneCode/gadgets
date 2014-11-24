"use strict"

var express = require('express');
var app = express();


app.use(express.cookieParser());
app.use(express.session({secret:'try-key-pass'}));

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');


app.use(function(req, res, next) {
	if (!req.session.userId) {
		if (req.url == '/login') {
			next();
		}
		else {
			res.render('login');
		}

	}
	else {
		next();
	}
});


app.post('/login', function(req, res) {
//	res.send("login ok");
	req.session.userId = "abc";
	res.redirect('/a');
});

app.get('/a', function(req, res) {
	res.send('page A');
});

app.get('/b', function(req, res) {
	res.send('page B');
});

app.get('/c', function(req, res) {
	res.send('page C');
});

var port = process.env.PORT ||  8080;

app.listen(port, function() {
	console.log("listen to port:%s", port);
});