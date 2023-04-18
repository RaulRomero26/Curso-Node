import { Sequelize } from 'sequelize';

const db = new Sequelize('curso-node','root','',{
    host: 'localhost',
    dialect: 'mariadb',
    //logging: false,
    port:3306
});

export default db;