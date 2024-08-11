import {io} from "socket.io-client"
let socket = null

const connectSocket = (user_id) => {
    socket = io("http://localhost:3001",{
        query:{
            user_id
        }
    })
    socket.on("connect",() => {
        console.log(socket)
        socket.emit("connect_user",{user_id})
      })
    socket.on("disconnect",(reason) => {
        console.log(reason)
        console.log(socket)
        console.log("Disconnected")
    })
} 


export {socket ,connectSocket}