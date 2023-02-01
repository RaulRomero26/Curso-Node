const express = require('express');
const hbs = require('hbs');
require('dotenv').config();//carga las variables de entorno

const app = express();
const port = process.env.PORT;

//Manejo del Handlebars
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials');
//Middleware una funcion que se ejecuta antes de hacer otra cosa
//servir contenido estatico
app.use(express.static('public'))//es la ruta de la carpeta es como decirle a express el / ahora es public
/* ya nunca se ejecuta la ruta / por el app use*/ 
/*app.get('/', (req, res) => {
  res.send('Hello World')
});*/

//Esta funcion vendria a ser el controlador del modelo MVC
app.get('/', (req, res) => {
    res.render('home',{
        nombre: 'Raul Romero',
        titulo: 'Curso Node'
    });
});

app.get('/generic', (req, res) => {
    res.render('generic',{
        nombre: 'Raul Romero',
        titulo: 'Curso Node'
    });
});

app.get('/elements', (req, res) => {
    res.render('elements',{
        nombre: 'Raul Romero',
        titulo: 'Curso Node'
    });
});

app.get('*', (req, res) => {
    res.sendFile(__dirname+'/public/404.html');
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});