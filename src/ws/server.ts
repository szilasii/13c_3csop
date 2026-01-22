import WebSocket from "ws";
const clients = new Set()
const server = new WebSocket.Server({ port: 8080 })


server.on('connection',(socket:WebSocket) => {
        clients.add(socket)
        socket.send("Csatlakoztal!")

        socket.on('message',(msg) => {
           broadcast(msg.toString()) 
        })


        socket.on('close',()=>{
            clients.delete(socket)
        })
        const broadcast = (message:any) => {
            clients.forEach((client:any) => { 
                client.send(message)
            })

        }
})
