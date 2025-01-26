const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5001;

// Middleware
app.use(cors({ origin: "http://localhost:3000" })); // Explicitly allow requests from frontend
app.use(express.json()); // For parsing JSON

// Mock Data
const investments = [
    { id: 1, name: 'Apple Inc. (AAPL)', amount: 1500 },
    { id: 2, name: 'Tesla Inc. (TSLA)', amount: 3000 },
    { id: 3, name: 'Amazon.com Inc. (AMZN)', amount: 2500 },
    { id: 4, name: 'Microsoft Corp. (MSFT)', amount: 4000 },
    { id: 5, name: 'Alphabet Inc. (GOOGL)', amount: 1200 },
    { id: 6, name: 'NVIDIA Corp. (NVDA)', amount: -800 },
    { id: 7, name: 'Meta Platforms Inc. (META)', amount: 2200 },
    { id: 8, name: 'Netflix Inc. (NFLX)', amount: -500 },
    { id: 9, name: 'Coca-Cola Co. (KO)', amount: 1800 },
    { id: 10, name: 'Procter & Gamble Co. (PG)', amount: 250 },
];

// API Endpoint to get investments
app.get('/api/investments', (req, res) => {
    res.json(investments);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Backend server running on http://localhost:${PORT}`);
});
