module.exports(sequalize, dataTypes)
let alias="products";
let cols= {
    id_product:{
        type:dataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false},
    
    imagen_product:{
        type: dataTypes.STRING,
        allowNull: false},
    
    name_product:{
        type: dataTypes.STRING,
        allowNull: false},
        category:{
            type:dataTypes.STRING
        },
    
    product_descripcion:{
        type: dataTypes.STRING,
        allowNull: false},
    
    product_fechaDeCarga:{
        type: dataTypes.STRING,
        allowNull: false},  
    
}

let config={
    table_name: "products",
    timesTamps: false
}