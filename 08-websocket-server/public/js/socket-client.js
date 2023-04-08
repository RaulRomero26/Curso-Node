//refetrencias html
const lblOnline = document.querySelector('#lblOnline')
const lblOffline = document.querySelector('#lblOffline')
const txtMnesaje = document.querySelector('#txtMnesaje')
const btnEnviar = document.querySelector('#btnEnviar')

const socket = io();
//on se refiere a escucha eventos del servidor puede ser un evento personalizado
socket.on('connect',() => {

    console.log('conectado');
    lblOffline.style.display = 'none';
    lblOnline.style.display = '';
})

socket.on('disconnect',() => {

    // console.log('desconectado del servidor');
    lblOffline.style.display = '';
    lblOnline.style.display = 'none';
})

socket.on('enviar-mensaje',(payload) => {
    console.log(payload);
})


btnEnviar.addEventListener('click', () => {

    const mensaje = txtMnesaje.value;
    const payload = {
        mensaje,
        id: 'ABC123',
        fecha: new Date().getTime()
    }
    socket.emit('enviar-mensaje',payload);

});
