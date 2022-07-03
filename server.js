//required to write new notes to json data
const fs = require('fs'); 
const path = require('path'); 
//require express
const express = require('express'); 
// instantiate the server
const app = express(); 
// require notes data
const { notes } = require('./db/db.json'); 

const PORT = process.env.PORT || 3001

//middleware
app.use(express.urlencoded({ extended: true })); 
app.use(express.json()); 
app.use(express.static('public')); 

//create new note function 
function createNote (body, notes) {
    const note = body;  
    notes.push(note); 
    fs.writeFileSync(
        path.join(__dirname, './db/db.json'), 
        JSON.stringify({ notes: notes }, null, 2)
    ); 
    return note; 
}

//Validate Data
function validateNote (note) {
    if (!note.title || typeof note.title !== 'string') {
        return false; 
    }
    if (!note.text || typeof note.text !== 'string') {
        return false; 
    }
    return true; 
}


app.get('/api/notes', (req, res) => {
    res.json(notes); 
}); 

app.post('/api/notes', (req, res) => {
    //set id based on what the next index of the array will be 
    req.body.id = notes.length.toString(); 

    //if data not validated, send 400 error back
    if (!validateNote(req.body)) {
        res.status(400).send('The note is not properly formatted.')
    } else{
        //add note to json file and notes array
        const note = createNote(req.body, notes); 

        res.json(note); 
    }
});

//GET index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html')); 
});

// GET Notes.html
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html')); 
})

// Listen for requests method
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`); 
}); 