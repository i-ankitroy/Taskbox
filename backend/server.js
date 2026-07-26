const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const taskRoutes = require('./routes/taskRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/', (req,res) => {
    res.send('Taskbox API is Running...');
});

app.use('/api/tasks', taskRoutes);

app.use((req,res) => {
    res.status(404).json({message: 'Route Not Found'});
});

app.use((err, req, res, next) => {
    res.status(500).json({message: 'Something  Went Wrong', error: err.message});
});

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('Connected To MongoDB'))
.catch((err) => console.log('MongoDB Connection Error:',err));

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});