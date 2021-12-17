const socket=io();
const btn=document.querySelector(".sendbtn");
const textarea=document.querySelector("textarea");
const ul=document.querySelector("ul");
const main=document.querySelector(".main");
main.style.display="none";
const roombox=document.querySelector(".room");
const roomid=document.querySelector(".room-id");
const username=document.querySelector(".username");
const joinbtn=document.querySelector(".joinbtn");
let roomId;
    
joinbtn.addEventListener("click",(e)=>{
    console.log("btnclinked");
    roomId=roomid.value;
    
    const name=username.value;
    roombox.style.display="none";
    main.style.display="block";
    socket.emit("join",{roomId,name});
})
btn.addEventListener("click",(e)=>{
    const message=textarea.value;
    textarea.value="";
    socket.emit("send-msg",{message,roomId});    
});
socket.on("received-msg",(data)=>{
        const li=document.createElement("li");
       
        li.innerHTML=`<strong>${data.name}:-</strong><span>${data.message}</span>`;
        ul.append(li);
       
})