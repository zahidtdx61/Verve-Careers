const { Mongoose } = require("../configs");

const userSchema = new Mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  uid: {
    type: String,
    required: true,
    unique: true,
  },
});

const User = Mongoose.model("User", userSchema);

module.exports = User;
