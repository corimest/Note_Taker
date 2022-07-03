//require express
const express = require('express'); 
// instantiate the server
const app = express(); 
// require notes data
const notes = require('./db/db.json'); 




app.get('/api/notes', (req, res) => {
    res.json('notes'); 
}); 




// Listen for requests method
app.listen(3001, () => {
    console.log('API serve now on port 3001'); 
}); 