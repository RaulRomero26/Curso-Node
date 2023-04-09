

const socketControler = ( socket) => {
    console.log('Cliente conectado',socket.id);
    
    socket.on('disconnect', () => {
        console.log('cliente desconectado');
    })

    socket.on('enviar-mensaje',( payload,callback ) => {//socket es para el cliente  //aca estaba con this.io
        socket.broadcast.emit('enviar-mensaje',payload)//io al ser propiedad del servidor es para emit del servidor a cliente o clientes
        //con el broadcasr es a todos sin el es al mismo socket que manda el mensaje
        //todos menos el que lo envia
        const id = 123456;
        callback(id)
    })
}

module.exports = {
    socketControler
}