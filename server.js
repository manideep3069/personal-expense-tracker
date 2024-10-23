const express = require('express');
const app = express();
const db = require('./db');
const transactionsRoute = require('./routes/transactions');

app.use(express.json());

// Root route
app.get('/', (req, res) => {
    res.send('Welcome to the Personal Expense Tracker API');
});

// Transactions routes
app.use('/transactions', transactionsRoute);

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});