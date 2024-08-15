const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./models').sequelize;
const daftarNasabahRoutes = require('./routes/daftarNasabah');
const forgotPasswordRoutes = require('./routes/forgotPassword');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3006;

// Middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/api', daftarNasabahRoutes);
app.use('/api', forgotPasswordRoutes);

// Start Server
sequelize.sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
