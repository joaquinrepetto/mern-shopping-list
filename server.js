const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path')

const app = express();

const items = require('./routes/api/items');

// Body Parser
app.use(bodyParser.json());

// DB Config
const db = require('./config/keys').mongoURI;

// Connect to Mongo
mongoose
    .connect(db, { useNewUrlParser: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

const port = process.env.PORT || 5000;

// Use Routes
app.use('/api/items', items);

// Server static assets if in production
if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
};

app.listen(port, () => console.log(`Server started on port ${port}`));