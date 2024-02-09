// server.js
const express = require('express');
const bodyParser = require('body-parser'); // Add this line for parsing JSON in the request body
const zillowApi = require('./zillow_api'); // Import your zillow_api module

const app = express();
app.use(bodyParser.json()); // Use body-parser middleware for parsing JSON in the request body

// Enable CORS for all routes
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

// Define your API endpoint for handling the SEARCH type
app.post('/search', (req, res) => {
    const { city, state } = req.body; // Assuming you're sending data in the request body

    // Call your Zillow API function with the received parameters
    const zillowData = zillowApi.get_zillow_data(`${city}, ${state}`);

    // Respond with the Zillow data
    res.json(zillowData);
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
