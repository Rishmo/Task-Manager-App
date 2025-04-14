import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import fs from 'fs';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// Read data from db.json
const readDb = () => {
  const data = fs.readFileSync('./db.json', 'utf-8');
  return JSON.parse(data);
};

// Write data to db.json
const writeDb = (data) => {
  fs.writeFileSync('./db.json', JSON.stringify(data, null, 2));
};

// Root route to confirm the server is running
app.get('/', (req, res) => {
  res.send('🎯 Task Manager Backend is Running!');
});

// Register a new user
app.post('/api/register', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ msg: 'Email and password are required.' });

  const db = readDb();
  const newUser = { email, password, _id: Date.now().toString() }; // Simple ID generation
  db.users.push(newUser);

  writeDb(db); // Save to file

  res.status(201).json({ msg: 'User registered successfully!', userId: newUser._id });
});

// Login user
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ msg: 'Email and password are required.' });

  const db = readDb();
  const user = db.users.find(u => u.email === email && u.password === password);

  if (!user) return res.status(404).json({ msg: 'User not found or incorrect password.' });

  res.json({ msg: 'Login successful', userId: user._id });
});

// Create Task
app.post('/api/tasks', (req, res) => {
  const task = req.body;
  if (!task.title || !task.description) return res.status(400).json({ msg: 'Title and description are required.' });

  const db = readDb();
  const newTask = { ...task, _id: Date.now().toString(), completed: false }; // Add a simple ID
  db.tasks.push(newTask);

  writeDb(db); // Save to file

  res.status(201).json(newTask);
});

// Get All Tasks for a specific user
app.get('/api/tasks/:userId', (req, res) => {
  const userId = req.params.userId;
  const db = readDb();
  const tasks = db.tasks.filter(task => task.userId === userId);

  res.json(tasks);
});

// Update Task
app.patch('/api/tasks/:id/complete', (req, res) => {
  const taskId = req.params.id;
  const db = readDb();

  const task = db.tasks.find(task => task._id === taskId);
  if (!task) return res.status(404).json({ msg: 'Task not found' });

  task.completed = true;

  writeDb(db); // Save to file

  res.json({ success: true, updated: task });
});

// Delete Task
app.delete('/api/tasks/:id', (req, res) => {
  const taskId = req.params.id;
  const db = readDb();

  const taskIndex = db.tasks.findIndex(task => task._id === taskId);
  if (taskIndex === -1) return res.status(404).json({ msg: 'Task not found' });

  db.tasks.splice(taskIndex, 1); // Remove the task

  writeDb(db); // Save to file

  res.json({ success: true });
});

// Server listening
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
