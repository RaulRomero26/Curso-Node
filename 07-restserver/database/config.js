const mongoose = require("mongoose");

const dbConection = async () =>{

    try {
        
        await mongoose.connect(process.env.MONGODB_CNN,{
            dbName: 'cafeDB',
        });
        console.log('base de datos online');

    } catch (error) {
        console.log(error);
        throw new Error('Error a la hora de iniciar la base de datos');
    }
}

module.exports = {
    dbConection
}