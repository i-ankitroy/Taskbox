const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.get('/', (req,res) => {
    res.send('Taskbox API is Running...');
});

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('Connected To MongoDB'))
.catch((err) => console.log('MongoDB Connection Error:',err));

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});