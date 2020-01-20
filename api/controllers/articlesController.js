// // ====================
// // imports
// // ====================
const { Client } = require('pg');
const { startClient } = require('../db/db');

// // ====================
// // exports
// // ====================

module.exports = {

	// get all articles from database
	getArticles: (req, res, next) => {
		
		// start client and start connection
		const client = startClient();
		client.connect();
		
		// build sql statement and query from database
		let sql = 'SELECT * FROM articles';
		client.query(sql, (err, response) =>{

			// close client after query is executed
			client.end();

			// create response objects from query
			resRow = response.rows[0];
			let resObj = response.rows.map(row => {
				return {
					id: row.id,
					title: row.title,
					author: row.author,
					date: row.date,
					content: row.content,
					slug: row.slug,
				};
			});

			// status 500 internal server error
			if(err) {
				res.status(500).send(err);
			}

			// status 200 ok send response
			else {
				res.status(200).send(resObj);
			}
		});
	},

	// get an article by its id
	getArticleById: (req, res, next) => {

		// destructure request
		const { id } = req.body;
		console.log('id:' + id);
		
		// start client and start connection
		const client = startClient();
		client.connect();
		
		// build sql statement and query from database
		let sql = `SELECT * FROM articles WHERE id=${id}`;
		client.query(sql, (err, response) =>{

			// close client after query is executed
			client.end();

			// create response objects from query
			resRow = response.rows[0];
			let resObj = response.rows.map(row => {
				return {
					id: row.id,
					title: row.title,
					author: row.author,
					date: row.date,
					content: row.content,
					slug: row.slug,
				};
			});

			// status 500 internal server error
			if(err) {
				res.status(500).send(err);
			}

			// status 200 ok send response
			else {
				res.status(200).send(resObj);
			}
		});
	},

	// create a new article
	createArticle: (req, res, next) => {

		// destructure request
		const { title, author, date, content, slug } = req.body;
		
		// start client and start connection
		const client = startClient();
		client.connect();
		
		// build sql statement and query from database
		let sql = `INSERT INTO articles (title, author, date, content, slug) VALUES (${title}, ${author}, ${date}, ${content}, ${slug})`;
		client.query(sql, (err, response) =>{

			// close client after query is executed
			client.end();

			// status 201 article not created
			if(err) {
				res.status(201).send({ success: false });
			}

			// status 200 article created
			else {
				res.status(200).send({ success: true });
			}
		});
	},
}