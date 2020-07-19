const express = require('express');
const app = express();
const config = require('./config');
const mongoose = require('mongoose');

mongoose.connect(config.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
mongoose.connection.on('connected', () => {
    console.log("Connected to Mongo");
})
mongoose.connection.on('error', () => {
    console.log("Error in connecting to Mongo DB");
})

require('./models/user');
require('./models/instaPost');

app.use(express.json());
app.use(require('./routes/auth.routes'));

app.get('/', (req, res) => {
    res.send("Instagram Clone");
})

app.listen(config.PORT, () => {
    console.log("Running this on port", config.PORT);
})