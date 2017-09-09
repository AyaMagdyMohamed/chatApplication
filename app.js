var express=require("express");
// Load MongoDB Driver
var mongoose=require("mongoose")
var fs=require("fs");

var HomeRoutes=require("./routes/home")
var app=express();
var http=require('http').Server(app);
var io = require('socket.io')(http);
var AuthRoutes=require("./routes/auth")(app,io)
// app.use("/auth",AuthRoutes);
// app.use("/",HomeRoutes);
app.set('view engine','ejs')
app.set('views','./views')


// open connection with mongodb
// Server IP : Port Numner / Database Name..
  mongoose.connect("mongodb://127.0.0.1:27017/chatApp");


var files_arr=fs.readdirSync(__dirname+"/models")
files_arr.forEach(function(file){
  require(__dirname+"/models/"+file);
});

// io.on('connection', function(){ console.log("Conected") });
// server.listen(3000);
http.listen(8080,function(){
  
    console.log("server start listening .... 8080")

});
