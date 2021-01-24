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
require('./models/comment');
require('./models/follower');

app.use(cookieParser());
app.use(express.json());
require('./app.routes')(app);

app.get('/', (req, res) => {
   res.send("Instagram Clone");
})

if (process.env.NODE_ENV === 'production') {
   app.use(express.static('client/build'));
   const path = require('path');
   app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
   })
}

app.listen(process.env.PORT || config.PORT, () => {
   console.log("Running this on port", config.PORT);
})