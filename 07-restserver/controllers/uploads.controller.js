const path = require('path');
const fs = require('fs');

const { response } = require('express');
const { Usuario, Producto } = require('../models');

const cloudinary = require('cloudinary').v2

cloudinary.config({
    cloud_name: 'db5updx0u',
    api_key: '142281534383692',
    api_secret: '-9QaIDof4yJoS7GK4mH3EE8_2dQ',
    secure: true
});


const { subirArchivo } = require('../helpers');

const cargarArchivo = async(req, res = response ) => {


    try {

        // const nombre = await subirArchivo( req.files, ['txt','md'],'textos');
        const nombre = await subirArchivo( req.files, undefined, 'imgs');
        res.json({
            nombre
        })

    } catch (msg) {
        res.status(400).json({msg});
    }

   const nombre = await subirArchivo( req.files);

   res.json({
        nombre
   })
    
}

const actualizarImagen = async(req,res=response) => {


    const {id,coleccion} = req.params

    let modelo;
    
    switch (coleccion) {
        case 'usuarios':
            
            modelo = await Usuario.findById(id);
            if(!modelo){
                return res.status(400).json({
                    msg: `No existe el usuario con el id ${ id }`
                });
            }

            break;
        case 'productos':
            
            modelo = await Producto.findById(id);
            if(!modelo){
                return res.status(400).json({
                    msg: `No existe el producto con el id ${ id }`
                });
            }

            break;
    
        default:
            res.status(500).json({msg: 'Se me olvido validar esto'})
    }

    //Limpiar imagenes previas 

    if(modelo.img) {
        //Hay que borrar la imagen del servidor 
        const pathImagen = path.join(__dirname,'../uploads',coleccion,modelo.img);
        if(fs.existsSync(pathImagen)){
            fs.unlinkSync(pathImagen)
        }
    }


    const nombre = await subirArchivo( req.files, undefined, coleccion);
    modelo.img = nombre;

    await modelo.save();

    res.json(modelo);

}

const mostrarImagen = async(req, res = response) => {

    const { id, coleccion } = req.params;

    let modelo;
    
    switch (coleccion) {
        case 'usuarios':
            
            modelo = await Usuario.findById(id);
            if(!modelo){
                return res.status(400).json({
                    msg: `No existe el usuario con el id ${ id }`
                });
            }

            break;
        case 'productos':
            
            modelo = await Producto.findById(id);
            if(!modelo){
                return res.status(400).json({
                    msg: `No existe el producto con el id ${ id }`
                });
            }

            break;
    
        default:
            res.status(500).json({msg: 'Se me olvido validar esto'})
    }

    //Limpiar imagenes previas 

    if(modelo.img) {
        //Hay que borrar la imagen del servidor 
        const pathImagen = path.join(__dirname,'../uploads',coleccion,modelo.img);
        if(fs.existsSync(pathImagen)){
           res.sendFile(pathImagen)
        }
    }

    const pathImagen = path.join(__dirname,'../assets','','no-image.jpg')
        res.sendFile(pathImagen)
}

const actualizarImagenCloudinary = async(req,res=response) => {


    const {id,coleccion} = req.params

    let modelo;
    
    switch (coleccion) {
        case 'usuarios':
            
            modelo = await Usuario.findById(id);
            if(!modelo){
                return res.status(400).json({
                    msg: `No existe el usuario con el id ${ id }`
                });
            }

            break;
        case 'productos':
            
            modelo = await Producto.findById(id);
            if(!modelo){
                return res.status(400).json({
                    msg: `No existe el producto con el id ${ id }`
                });
            }

            break;
    
        default:
            res.status(500).json({msg: 'Se me olvido validar esto'})
    }

    //Limpiar imagenes previas 

    if(modelo.img) {
        const nombreArr = modelo.img.split('/');
        const nombre = nombreArr[nombreArr.length-1];
        const [ public_id ] = nombre.split('.')
       await cloudinary.uploader.destroy(public_id);
    }

    const { tempFilePath } = req.files.archivo
    const {secure_url} = await cloudinary.uploader.upload(tempFilePath)
     modelo.img = secure_url;

    // await modelo.save();

    res.json(modelo);

}


module.exports = {
    cargarArchivo,
    actualizarImagen,
    mostrarImagen,
    actualizarImagenCloudinary
}