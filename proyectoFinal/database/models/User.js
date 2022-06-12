module.exports = function(sequelize, dataTypes){

    // Definir un alias.
    let alias = 'User'; // Con este alias sequelize va a identificar internamente al archivo de modelo.

    // Describir la configuración de las columnas de la tabla
    let cols = {
        id:{
            autoIncrement: true,
            primaryKey: true,
            type: dataTypes.INTEGER,
        },
        userName:{
            type: dataTypes.STRING,
        },
        birthday:{
            type: dataTypes.DATE,
        },
        email:{
            type: dataTypes.STRING,
        },
        password: {
            type: dataTypes.STRING,
        },
        avatar: {
            type: dataTypes.STRING,
        },
        created_at:{
            type: dataTypes.DATE,
        },
        updated_at:{
            type: dataTypes.DATE,
        },
    }

    let config = {
        tableName: 'users', 
        timestamps: true, // Si la tabla no tiene los campos created_at y updated_at
        underscored: true, // Si los nombres de las columnas en la db tienen guiones bajos en lugar de camelCase.        
    }

   const User = sequelize.define(alias, cols, config);

   User.associate = function(model){
    User.hasMany(model.Product, {
        as: 'products', 
        foreignKey: 'user_id'
    }), 
    User.hasMany(model.Comment, {
        as: 'comentarios', 
        foreignKey: 'user_id'
    })
   } 

   return User;
}