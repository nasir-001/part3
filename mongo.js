const mongoose = require('mongoose')
require("dotenv").config();

if (process.argv.length < 3) {
    console.log('Please provide the password as an argument: node mongo.js <password>');
    process.exit(1)
}

const db_password = process.env.DB_PASSWORD

const password = process.argv[2]

const url = 
    `mongodb+srv://fullstack:${db_password}@cluster0.ovg4t.mongodb.net/fullstack?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

const noteSchema = new mongoose.Schema({
    content: String,
    data: Date,
    important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

const note = new Note({
    content: 'HTML is easy',
    date: new Date(),
    important: true,
})

Note.find({}).then(result => {
    result.forEach(note => {
        console.log(note);
    })
    mongoose.connection.close()
})

note.save()
    .then(result => {
        console.log('note saved');
        mongoose.connection.close()
    })
    .catch(error => {
        console.log(error);
    })
