/*
*/

"use strict";

var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

io.on('connection', function(client) {
	client.on('message', function(data) {
		data = client.nickname + ":" + data;
		client.broadcast.emit('message', data);
		client.emit('message', data);
		console.log(data);
	});
	client.on('connect', function(data) {
		console.log('connect:' + data);
	});
	client.on('join', function(name) {
		client.nickname = name;
	});
});


app.get('/', function(req, res) {
	res.sendfile(__dirname + '/index.html');
});

server.listen(8080);
