const express = require('express');
const cors = require('cors')
const app = express();
const config = require('./config');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

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

var corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use(require('./routes/auth.routes'));
app.use(require('./routes/instaPost.routes'));

app.get('/', (req, res) => {
    res.send("Instagram Clone");
})

app.listen(config.PORT, () => {
    console.log("Running this on port", config.PORT);
})