const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const taskRoutes = require('./routes/taskRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.get('/', (req,res) => {
    res.send('Taskbox API is Running...');
});

app.use('/api/tasks', taskRoutes);

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('Connected To MongoDB'))
.catch((err) => console.log('MongoDB Connection Error:',err));

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});