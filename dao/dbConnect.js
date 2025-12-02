/**
 * 该文件负责连接数据库
 */
const {Sequelize} = require('sequelize')

// 创建数据库连接
const sequelize = new Sequelize('mysite', 'root', '123456', {
  host: 'localhost',
  dialect: 'mysql'
});

(async function(){
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})()


