const express = require('express');
const cors = require('cors');
const connectDb = require("./db/connectdb")

const userRoutes = require('./routes/userRoutes');


const app = express();

// Middleware
app.use(express.json());
app.use(cors()); // Allow Cross-Origin Resource Sharing

// Database connection
connectDb();

// Root path route
app.get('/', (req, res) => {
    res.send('Welcome to the backend server!');
});

// Routes
app.use('/api/users', userRoutes);


// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


