module.exports = function(sequelize, dataTypes){
let alias="Comment";
let cols= {
    id:{
        autoIncrement: true,
        primaryKey: true,
        type: dataTypes.INTEGER,
    },
    product_id:{
        type: dataTypes.INTEGER,
    },
    user_id:{
        type: dataTypes.INTEGER,
    },
    texto_comentario:{
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
        table_name: 'comments',
        timestamps: true,
        underscored: true,
    }

    const Comment = sequelize.define(alias, cols, config);

    
  Comment.associate = function(models){
       Comment.belongsTo(models.Product, {
             as: 'products',
             foreignKey: 'product_id',
        }), 
    Comment.belongsTo(models.User, {
        as: 'user', 
        foreignKey: 'user_id'
    })
    }  
    
    return Comment;
}
