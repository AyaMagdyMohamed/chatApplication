var mongoose=require("mongoose")
// register model
var Schema=mongoose.Schema
var users=new Schema({
  name:String,
  email:String,
  password:String,
  status:Number
})
// ORM
mongoose.model("users",users)
