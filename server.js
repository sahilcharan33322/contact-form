const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/mydatabase');


// Middleware
app.use(bodyParser.json());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Define a schema and model
const DataSchema = new mongoose.Schema({
    name: String,
    email: String,
    message: String
});

const Data = mongoose.model('Data', DataSchema);

// Handle POST requests to save data
app.post('/send-data', async (req, res) => {
    const { name, email, message } = req.body;
    const newData = new Data({ name, email, message });
    await newData.save();
    res.send('Data saved to MongoDB');
});

// Start the server
app.listen(5000, () => {
    console.log('Server is running on http://localhost:5000');
});
