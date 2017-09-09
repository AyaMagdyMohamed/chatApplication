var mongoose=require("mongoose")
// register model
var Schema=mongoose.Schema
var chats=new Schema({
  message:String,
  timeSent:Date,
  user:{
    type:Schema.ObjectId,
    ref:"users"
  }

})
// ORM
mongoose.model("chats",chats)
