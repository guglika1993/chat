import express from "express";
import http from "http";
import { Server } from "socket.io";
import env from "dotenv";
import { fileURLToPath } from "url";
import path from "path";
import pg from "pg";
import { callbackify } from "util";

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const _filename = fileURLToPath(import.meta.url);
const _dirname = path.dirname(_filename);
const PORT = 3000;
env.config();
const client = new pg.Client({
    user: process.env.USER,
    host: process.env.HOSTNAME,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
    port: 5432,
})


client.connect(function (err) {
    try {
        if (err) throw err;
        console.log("CONNECTION IS OK!");
    } catch (err) {
        console.log("ERROR MESSAGE!!!! " + err);
    }

})

app.use(express.static(path.join(_dirname, './public')));
app.get('/', (req, res) => {
    res.sendFile(path.join(_dirname, './public/index.html'));
});

server.listen(PORT, () => {

})

// function checkData(username, password, callback){
//     client.query(`SELECT * FROM chatRoom WHERE username = '${username}' AND password = '${password}'`, (err, result)=>{
//         try {
//             if(err) throw err;
//             if(result.rows.length > 0){
//                 callback(true);
//             }
//             else{
//                 callback(false);
//             }
//         } catch (err) {
//            alert("Error! " + err); 
//         }
//     }
//     )}

// function joinOrCreateChat(name, password, callback) {
//     client.query(`SELECT * FROM chatRoom WHERE password = '${password}' AND user2 IS NULL`, (err, result) => {
//         try {
//             if (err) throw err;
//             if (result.rows.length > 0) {
//                 client.query(`UPDATE chatRoom SET user2 = '${name}' WHERE password = '${password}' AND user2 IS NULL`, (err) => {
//                     try {
//                         if (err) throw err;
//                         callback(name + " joined to the room!");
//                     } catch (error) {
//                         console.log("ERROR: " + err);
//                     }
//                 })
//             }
//             else {
//                 client.query(`INSERT INTO chatRoom (user1, password) VALUES ('${name}', '${password}')`, (err) => {
//                     try {
//                         if (err) throw err;
//                         callback(name + " welcome! Room created");
//                     } catch (err) {
//                         alert("ERROR MESSAGE!!!! " + err);
//                     }
//                 });
//             }
//         } catch (err) {
//             console.log("ERROR MESSAGE!!!! " + err);
//         }
//     })

// }
/////////////>>>>>>>> SOCKET.IO <<<<<<<<<<<//////////////////

io.on("connection", (socket) => {
    socket.on("sendMessage", (message) => {
        console.log(message);
        io.emit("sendMessageToAll", message);

    })
    //    socket.on("cellClicked", (role, name, id, whosTurn)=>{
    //         io.emit("cellClicked2", role, name, id, whosTurn);
    //    })
    //    socket.on("pointerEvents", (turn)=>{
    //         io.emit("pointerEvents2",turn);
    //    })

});