
let usuario = null;
let socket = null;
const url = 'http://localhost:8081/api/auth/'

//validar el token del local storage
const validarJWT = async () => {

    const token = localStorage.getItem('token') || '';

    if( token.length <= 10 ){
        window.location = 'index.html';
        throw new Error('No hay token en el servidor')
    }

    const resp = await fetch (url , {
        headers: { 'x-token': token}
    })

    const {usuario: userDb, token: tokenDB} = await resp.json();
    localStorage.setItem('token',tokenDB);
    usuario = userDb;
    document.title = usuario.nombre;

    await conectarSocket();
}

const conectarSocket = async() => {

    socket = io({
        'extraHeaders': {
            'x-token': localStorage.getItem('token')
        }
    });

    socket.on('connect', () =>{
        console.log('Sockets online')
    });

    socket.on('disconnect', () =>{
        console.log('Sockets offline')
    });

}


const main = async () => {

    await validarJWT()

}

// const socket = io();

main();