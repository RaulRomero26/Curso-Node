const express = require('express')
const app = express();
const port = 8080;

//Middleware una funcion que se ejecuta antes de hacer otra cosa
//servir contenido estatico
app.use(express.static('public'))//es la ruta de la carpeta es como decirle a express el / ahora es public
/* ya nunca se ejecuta la ruta / por el app use*/ 
/*app.get('/', (req, res) => {
  res.send('Hello World')
});*/

app.get('/generic', (req, res) => {
    res.sendFile(__dirname+'/public/generic.html')
});

app.get('/elements', (req, res) => {
    res.sendFile(__dirname+'/public/elements.html')
});

app.get('*', (req, res) => {
    res.sendFile(__dirname+'/public/404.html')
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});