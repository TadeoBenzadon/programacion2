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
        timesTamps: false,
        underscored: true,
    }

    const Comment = sequelize.define(alias, cols, config);

    
    Comment.associate = function(models){
       Comment.belongsToMany(models.Product, {
             as: 'products',
             through: 'product_comment',
             foreignKey: 'comment_id',
             otherKey: 'product_id',
             timestamps: false
        }), 
    Comment.belongsTo(models.User, {
        as: 'comentarios', 
        foreignKey: 'user_id'
    })
    } 
    
    return Comment;
}
