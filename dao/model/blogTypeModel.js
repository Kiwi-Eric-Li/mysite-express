const {DataTypes} = require("sequelize");
const sequelize = require("../dbConnect");

// define blogType model
module.exports = sequelize.define("blogType", {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    articleCount: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    order: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    freezeTableName: true,
    createdAt: false,
    updatedAt: false
});






