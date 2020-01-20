// ====================
// imports
// ====================
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const { Client } = require('pg');
const app = express();

// setup static file directory and use json body parser
app.use('/static', express.static('static'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// headers to avoid CORS
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers',
		"Origin, X-Requested-With, Content-Type, Accept, Authorization"
	);
	if(req.method === 'OPTIONS') {
		res.header('Access-Control-Allow-Methods',
			"GET, PUT, POST, PATCH, DELETE",
		);
		return res.status(200).json({});
	}
	next();
});

// ====================
// routes
// ====================
const articlesRoute = require('./api/routes/articles');
const usersRoute = require('./api/routes/users');

// Routes which handle requests
app.use('/articles', articlesRoute);
app.use('/users', usersRoute);

// error handling
app.use((req, res, next) => {
	const error = new Error("404 not found.");
	error.status = 404;
	next(error);
});

app.use((error, req, res, next) => {
	res.status(error.status || 500);
	res.json({
		error: {
			message: error.message,
		}
	});
});

// ====================
// exports
// ====================
module.exports = app;