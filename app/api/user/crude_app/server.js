const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { readdirSync } = require('fs');

const app = express();
app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.json());

// Load routes
readdirSync('./Routes').map((r) => app.use('/api', require('./Routes/' + r)));

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server is Running on port ${PORT}`));

// MongoDB connection
mongoose.connect("mongodb://127.0.0.1:27017/SugarNana", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log("MongoDB connection error:", err));