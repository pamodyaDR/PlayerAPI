const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const players = require('./routes/api/players');


const app = express();

//Bodyparser Middleware
app.use(bodyParser.json());

//DB Config
const db = require('./configs/keys').mongoURI;

//Connect to Mongo
mongoose
    .connect(db)
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));

//Use Routes
app.use('/api/players', players);

const port = process.env.PORT || 5000;

console.log(port);

app.listen(port, () => console.log(`Server started on port ${port}`));