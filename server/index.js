const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const taskRoutes = require('./routes/taskRoutes');
const userRoutes = require('./routes/userRoutes');
const projectRoutes = require('./routes/projectRoutes');

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());

app.use(cors());

// Routes
app.use('/api/tasks', taskRoutes);
app.use('/api/users', userRoutes);
app.use('/api/projects', projectRoutes);

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
    console.log("Connected to the database");
  })
  .catch((err) => {
    console.error("Error connecting to the database:", err);
  });
  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
  });
  app.use((err, req, res, next) => {
    console.error(err.stack);
  
    if (process.env.NODE_ENV === 'production') {
      // In production, only provide a generic error message
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      // In development, provide more details about the error
      res.status(500).json({ error: err.message, stack: err.stack });
    }
  });
  