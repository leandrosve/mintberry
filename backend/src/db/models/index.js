const sequelize = require('../index');

const RefreshToken = require('./refreshToken');
const User = require('./user')
const Task = require('./task');


User.hasMany(Task,{as: 'tasks', foreignKey: 'userId'})

Task.belongsTo(User, {as: 'user', foreignKey: 'userId'});

sequelize.sync({force: false});
module.exports = {User, Task, RefreshToken};