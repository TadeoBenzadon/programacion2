module.exports = (sequelize, dataTypes)=>{
let alias = users;
const users = sequelize.define(alias,cols,config);
let cols = {
    id: {
        type: dataTypes.INTERGER,
        primaryKey: true, 
        autoincrement: true, 
        allowNull: false
    },
    usuario: 
    {
        type: dataTypes.STRING,
        allowNull: false
    }, 
    createdAt: 
    {
        type: dataTypes.DATE
    },
    updatedAt: 
    {
        type: dataTypes.DATE
    }
}
let config={
    tableName: 'users', 
	timestamps: false, 
	underscored: true,
}
return users;
}