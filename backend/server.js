//import express to create a server
const express = require('express');

//create an instance of express
const app = express();

//define a port for the server to listen on
const PORT = process.env.PORT || 3001;

//middleware to handle JSON data in requests
app.use(express.json());

//route to hndle POST requests for form submission
app.post('/submit-ad', (req, res) => {
    const {productName, description, audience} = req.body;
    console.log('ad content recieved:', { productName, description, audience});
    res.status(200).json({
        message:'ad content recieved successfully',
        data: {productName,description,audience}
    });
});

//start
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

const cors = require('cors');
app.use(cors());
