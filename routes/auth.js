var express=require("express");
var router=express.Router();
var bodyParser=require("body-parser");
var mongoose=require("mongoose");
var middleareBodyParser=bodyParser.urlencoded({extended:false})
var app=express();
var http=require('http').Server(app);
var io = require('socket.io')(http);


module.exports = function (app,io){
app.get("/login",function(req,resp){
  resp.render("auth/login")
})


var  user_email="";
var users={};
var keys={};

var onlineuers=[];


app.post("/login",middleareBodyParser,function(req,resp){
  //req.body
  mongoose.model("users").findOne({email:req.body.email,password:req.body.password},function(err,data){
  if(data)
  {

   

   user_email=req.body.email;
//    var myquery = { email: user_email};
//    var newvalues = { status:"1" };
//    db.collection("users").updateOne(myquery, newvalues, function(err, res) {
//     if (err) throw err;
//        console.log("1 document updated");
//       db.close();
// });
// mongoose.model("users").find({status:"1"},function(err,data){
 
//     resp.render("home/index",{"users":data});
//   })
    // io.emit('test',user_email)
      resp.render("home/list")
    // resp.send("success");
  
  }else{
    resp.send("invalid user");
  }
})
})

app.get("/",function(req,resp){
  
  resp.render("home/index");

})

io.on('connection',function(socket){
  io.on('test',function()
{

  console.log("henaaaaaaaaaaaaaaa")
})
    // console.log("Connection :User is connected  "+ user_email);
  //  console.log("Connection : " +socket.id);
  //  io.to(socket.id).emit('handle', handle);
  // users[ user_email]=socket.id;
  // keys[socket.id]= user_email;
  // console.log(onlineuers.indexOf(user_email))
  // io.on('login', function(data){
  //   console.log("hhhhhhhhhhhhhhh")
  //   console.log('a user ' + data.userId + ' connected');
  //   //saving userId to array with socket ID
  //   onlineuers[socket.id] = data.userId;
    //  socket.broadcast.emit("user",user_email)
  // });
  console.log("index of ",user_email,onlineuers.indexOf(user_email))
   if((onlineuers.indexOf(user_email))==-1)
     {
     onlineuers.push(user_email)
    }
  // // console.log("Users list : "+users);
  // // console.log("keys list : "+keys[user_email]);
    io.emit('users',onlineuers);
  //  socket.broadcast.send(user_email);
  // //update status
  // var myquery = { email: user_email};
  // var newvalues = { status:"1" };
  // db.collection("users").updateOne(myquery, newvalues, function(err, res) {
  //   if (err) throw err;
  //   console.log("1 document updated");
  //   db.close();
  // });
  //
  // models.users.find({"email" : email},{friends:1,_id:0},function(err,doc){
  //     if(err){res.json(err);}
  //     else{
  //         friends=[];
  //         pending=[];
  //         all_friends=[];
  //         console.log("friends list: "+doc);
  //         list=doc[0].friends.slice();
  //         console.log(list);
          
  //         for(var i in list){
  //             if(list[i].status=="Friend"){
  //                 friends.push(list[i].name);
  //             }
  //             else if (list[i].status=="Pending"){
  //                 pending.push(list[i].name);
  //             }
  //             else{
  //                 continue;
  //             }
  //         }
  //         console.log("pending list: "+pending);
  //         console.log("friends list: "+friends);
  //         io.to(socket.id).emit('friend_list', friends);
  //         io.to(socket.id).emit('pending_list', pending);
  //         io.emit('users',users);
  //     }
  // });
  
})

app.get("/register",function(req,resp){
  resp.render("auth/register")
})
app.post("/register",middleareBodyParser,function(req,resp){
  
  mongoose.model("users").findOne({email:req.body.email},function(err,data){
        if(!data)
          {
            var userModel=mongoose.model("users")
            var new_user=new userModel()
            new_user.name=req.body.username;
            new_user.password=req.body.password;
            new_user.email=req.body.email;
            new_user.status=0;
            new_user.save(function(err){
              console.log("saved");
            })
            resp.redirect("/login")
          }
          else{
            // console.log("This email already exists")
            resp.send("This email already exists!!");
           
          }
    })
    //resp.render("home/index",{"products_data":data});
  })
 
  

// router.get("/logout",function(req,resp){
//   req.session.destroy()
//   resp.redirect("/")
// })
}
 //module.exports=router;
