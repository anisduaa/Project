const express = require('express');
const TaskModel = require('../models/Task');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const tasks = await TaskModel.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/', async (req, res) => {
  const { title, description, deadline, completed, user } = req.body;

  try {
    const task = new TaskModel({
      title,
      description,
      deadline,
      completed,
      user,
    });
    const newTask = await task.save();
    res.status(201).json(newTask);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.put('/:id', async (req, res) => {
  const { title, description, deadline, completed, user } = req.body;

  try {
    const updatedTask = await TaskModel.findByIdAndUpdate(
      req.params.id,
      { title, description, deadline, completed, user },
      { new: true }
    );
    res.json(updatedTask);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await TaskModel.findByIdAndDelete(req.params.id);
    res.json({ message: 'Task deleted' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
