const express=require("express");
const app=express();//creating express server.
const http=require("http");//http module no need to install ,automatically installed with node
const path=require("path");
const server=http.createServer(app);//creating http server,and for request handling i am using express server ie -app
const socketio=require("socket.io");
const io=socketio(server);//evolving http server in to socket.io server.
app.use("/",express.static(path.join(__dirname,"public")));
const user={};
io.on("connection",(socket)=>{//"connection " event are built-in
    console.log(`someone got connected width id-${socket.id}`);
    socket.on("join",(data)=>{
          socket.join(data.roomId);
          user[socket.id]=data.name;
    })
    
    socket.on("send-msg",(data)=>{
            io.to(data.roomId).emit("received-msg",{
                name:user[socket.id],message:data.message
            })
    })
    socket.on("leave",(data)=>{
        socket.leave(data.roomId);
    })
})
const port=process.env.PORT || 3000;
server.listen(port,()=>{//this listen is the method of http server provided by node (not of express)
    
    console.log(`http server is started at port number ${port}`);
})