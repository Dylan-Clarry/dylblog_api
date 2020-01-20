// // ====================
// // imports
// // ====================
const { Client } = require('pg');
const { startClient } = require('../db/db');

// // ====================
// // exports
// // ====================

module.exports = {

	// return a list of all users in database
	getUsers: (req, res, next) => {
		
		// start client and start connection
		const client = startClient();
		client.connect();
		
		// build sql statement and query from database
		let sql = 'SELECT * FROM users';
		client.query(sql, (err, response) =>{

			// close client
			client.end();

			// create response objects from query
			let resObj = response.rows.map(row => {
				return {
					id: row.id,
					username: row.username,
					email: email,
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

	// create a new user
	newUser: (req, res, next) => {

		// destructure request
		const { username, password, email } = req.body;
		
		// start client and start connection
		const client = startClient();
		client.connect();
		
		// build sql statement and query from database
		let sql = `INSERT INTO users (username, password, email) VALUES (${username}, ${password}, ${email})`;
		client.query(sql, (err, response) =>{

			// status 201 user not created
			if(err) {
				res.status(201).send({ success: false });
			}

			// status 200 user created
			else {
				res.status(200).send({ success: true });
			}
		});
	},
}
