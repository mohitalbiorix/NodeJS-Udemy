const Sequelize = require('sequelize');

const sequelize = require('../util/databse');

const User = sequelize.define('user', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: Sequelize.STRING,
    email: Sequelize.STRING
});


module.exports = User;





/* 



Association

The HasOne association
The BelongsTo association
The HasMany association
The BelongsToMany association 

*/