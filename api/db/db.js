const { Pool, Client } = require('pg');

const pool = new Pool();

module.exports = {

	// executes a query into postgres database
	query: (text, params, callback) => {
		return pool.query(text, params, callback)
	},

	// creates a new client
	startClient: (callback) => {
		const connectionString = `postgres://${ process.env.USER }:${ process.env.PASSWORD }@${ process.env.HOST }:${ process.env.DBPORT }/${ process.env.DATABASE }`;
		const client = new Client({
			connectionString: connectionString,
		});
		return client;
	}
}