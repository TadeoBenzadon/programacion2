module.exports = function (sequelize, dataTypes) {

    let alias = "Product";
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        electro_name: {
            type: dataTypes.STRING,
        },
        electro_description: {
            type: dataTypes.TEXT,
        },
        electro_image: {
            type: dataTypes.STRING,
        },
        electro_comments: {
            type: dataTypes.INTEGER,
        },
        created_at: {
            type: dataTypes.DATE,
        },
        updated_at: {
            type: dataTypes.DATE,
        },
        user_id: {
            type: dataTypes.INTEGER,
        }
    }

    let config = {
        table_name: 'products',
        timestamps: true,
        underscored: true,
    }

    const Product = sequelize.define(alias, cols, config);

     Product.associate = function(models){
       
        Product.belongsTo(models.User, {
             as: 'user',
             foreignKey: 'user_id',
        }), 
        Product.hasMany(models.Comment, {
            as: 'comments', 
            foreignKey: 'product_id'
        })
     } 
    
    
    return Product;
}