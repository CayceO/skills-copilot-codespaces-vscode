// Create web server to serve comments

// Imports
const express = require('express');
const fs = require('fs');
const path = require('path');

// Create web server
const app = express();

// Set up middleware
app.use(express.static('public'));
app.use(express.json());

// GET /comments
// Responds with all comments in the comments.json file
app.get('/comments', (req, res) => {
    // Read the contents of the comments.json file
    const comments = JSON.parse(fs.readFileSync(path.join(__dirname, 'comments.json')));
    // Respond with the comments
    res.json(comments);
});

// POST /comments
// Add a new comment to the comments.json file
app.post('/comments', (req, res) => {
    // Read the contents of the comments.json file
    const comments = JSON.parse(fs.readFileSync(path.join(__dirname, 'comments.json'));
    // Add the new comment to the comments
    comments.push(req.body);
    // Write the updated comments back to the comments.json file
    fs.writeFileSync(path.join(__dirname, 'comments.json'), JSON.stringify(comments));
    // Respond with a success message
    res.json({message: 'Comment added successfully'});
});

// Start the web server
app.listen(3000, () => {
    console.log('Server started on http://localhost:3000');
});