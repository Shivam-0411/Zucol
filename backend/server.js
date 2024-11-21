const express = require('express');
const connectDB = require('./config/db');
const employeeRoutes = require("./routes/employeeRoutes");
// const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
connectDB();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.use('/api/employees', employeeRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));