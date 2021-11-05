const express = require('express');
const app = express();
const basket = require('./fruitBasket');
const { Pool } = require('pg');

const connectionString = process.env.DATABASE_URL || 'postgresql://codex:codex123@localhost:5432/fruitBasket';

const pool = new Pool({
	connectionString: connectionString,
	ssl: {
		rejectUnauthorized: false
	}
});

const PORT = process.env.PORT || 1919;
app.listen(PORT, function(){
    console.log("App started at port", PORT);
});