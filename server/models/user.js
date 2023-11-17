const mongoose = require('mongoose')
const {Schema} = mongoose

const userSchema = new Schema({
  username: String,
  id: Number,
  gender: String,
  birthday: Date,
  address: String,
  email:{
    type: String,
    unique:true
  },
  password:String
})

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;