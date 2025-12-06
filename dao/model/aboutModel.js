const {DataTypes} = require("sequelize");
const sequelize = require("../dbConnect");

// define data model
module.exports = sequelize.define("about", {
    url: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    freezeTableName: true,
    createdAt: false,
    updatedAt: false
});




