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
        electro_variety: {
            type: dataTypes.STRING,
        },
        electro_year: {
            type: dataTypes.SMALLINT,
        },
        electro_image: {
            type: dataTypes.STRING,
        },
        electro_comments: {
            type: dataTypes.INTEGRE,
        },
        created_at: {
            type: dataTypes.DATE,
        },
        updated_at: {
            type: dataTypes.DATE,
        },
        user_id: {
            type: dataTypes.INTEGRE,
        },
    }

    let config = {
        table_name: 'products',
        timesTamps: false,
        underscored: true,
    }

    const User = sequelize.define(alias, cols, config);

    Product.associate = function(models){
       
        Product.belongsToMany(models.Comement, {
             as: 'comments',
             through: 'comment_product',
             foreignKey: 'product_id',
             otherKey: 'comment_id',
             timestamps: false
        })
    } 
    
    
    return Product;
}