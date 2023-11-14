const nameInput = document.querySelector("#nameInput");
const passwordInput = document.querySelector("#passwordInput");
const enterButton = document.querySelector("#enterButton");

const sendButton = document.querySelector("#sendButton");
const messagesArea = document.querySelector(".messagesArea");
const messageInput = document.querySelector("#messageInput");

const socket = io();

sendButton.addEventListener("click", ()=>{
    let li = document.createElement("li").innerText = messageInput;
    socket.emit("sendMessage", li);
})

socket.on("sendMessageToAll", (data)=>{
    messagesArea.appendChild(data);
})