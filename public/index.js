const nameInput = document.querySelector("#nameInput");
const passwordInput = document.querySelector("#passwordInput");
const enterButton = document.querySelector("#enterButton");

const sendButton = document.querySelector("#sendButton");
const messagesArea = document.querySelector(".messagesArea");
const messageInput = document.querySelector("#messageInput");

const socket = io();
let user1, user2, roomId;
enterButton.addEventListener("click", ()=>{
    let name = nameInput.value;
    let password = passwordInput.value;
    socket.emit("joinOrCreate", name, password);
})
socket.on("startingChat", (data)=>{
    alert(data);
})