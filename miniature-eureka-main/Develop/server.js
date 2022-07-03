//require express
const express = require('express'); 
// instantiate the server
const app = express(); 
// require notes data
const notes = require('./db/db.json'); 

const PORT = process.env.PORT || 3001




app.get('/api/notes', (req, res) => {
    res.json('notes'); 
}); 




// Listen for requests method
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`); 
}); 