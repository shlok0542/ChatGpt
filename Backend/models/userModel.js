const moongoose = require('mongoose');
const userSchema = new moongoose.Schema({
  name: String,
  email: String,
  password : String
});

const EmployeeModel = moongoose.model("employees", userSchema);
module.exports = EmployeeModel;