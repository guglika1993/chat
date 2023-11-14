const nameInput = document.querySelector("#nameInput");
const passwordInput = document.querySelector("#passwordInput");
const enterButton = document.querySelector("#enterButton");

const sendButton = document.querySelector("#sendButton");
const messagesArea = document.querySelector(".messagesArea");
const messageInput = document.querySelector("#messageInput");

const socket = io();

sendButton.addEventListener("click", ()=>{
   let message = messageInput.value;
    socket.emit("sendMessage", message);
})

socket.on("sendMessageToAll", (message)=>{
    let li = document.createElement('li');
    li.innerText = message;
    messagesArea.appendChild(li);
    messageInput.value = "";
})