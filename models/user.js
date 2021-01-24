const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
   name: {
      type: String,
      required: true
   },
   username: {
      type: String,
      required: true
   },
   profilePicURL: {
      type: String,
      required: false
   },
   password: {
      type: String,
      required: true
   },
   followers: {
      type: Number,
      default: 0
   },
   following: {
      type: Number,
      default: 0
   }
})

mongoose.model("User", userSchema);