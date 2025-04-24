require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./config/db'); // Make sure this path is correct

const app = express();

// Connect to Database
connectDB(); // This should now work

// Middleware
app.use(cors());
app.use(bodyParser.json());

const userRoutes = require('./routes/userRoutes');

const authRoutes = require('./routes/authRoutes');

app.use('/', userRoutes); 
app.use('/',authRoutes);

// Test route
app.get('/', (req, res) => {
  res.send('API is running...');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});