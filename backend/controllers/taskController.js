const Task = require('../models/Task');

const createTask = async (req,res) => {
    try {
        const {title,description} = req.body;

        if (!title) {
            return res.status(400).json({message: 'Title is Required'});
        }

        const task = await Task.create({title,description});
        res.status(201).json(task);
    } catch (error) {
        re.status(500).json({message: 'Server Error', error:error.message});
    }
};

const getTasks = async (req,res) => {
    try{
        const tasks = await Task.find().sort({ createdAt: -1 });
        res.status(200).json(tasks);

    }catch (error) {
        res.status(500).json({message:'Server Error', error: error.message});
    }
};

const getTaskById = async (req,res) => {
    try{
        const task = await Task.findById(req.params.id);

        if(!task) {
            return res.status(404).json({message:'Task Not Found'});

        }

        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({message: 'Server Error', error: error.message});
    }
};

module.exports = { createTask, getTasks, getTaskById };