const mongoose = require('mongoose');

console.log("Connecting to DB...")

mongoose.connect('mongodb://localhost/arare');

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function callback() {
    console.log("MongoDB Connected...");
});

module.exports = db
