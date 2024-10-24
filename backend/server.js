// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const teacherRoutes = require('./routes/teacherRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// backend/server.js (add this after the middleware)
const classRoutes = require('./routes/classRoutes');
app.use('/api/classes', classRoutes);

// Use teacher routes
app.use('/api/teachers', teacherRoutes);


// Connect to MongoDB (configure your MongoDB URI here)
mongoose.connect('mongodb+srv://alvin:root@cluster0.bjx2i.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

// Basic route
app.get('/', (req, res) => {
  res.send('Timetable App Backend Running');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
