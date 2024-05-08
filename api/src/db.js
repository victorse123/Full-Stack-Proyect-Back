require("dotenv").config();

const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");
const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT ,DB_NAME} = process.env;

const typeModel = require("./models/Type");
const propertyModel = require("./models/Property");
const categoryModel = require("./models/Category");
const userModel = require('./models/UserModels/User');
const reviewModel = require('./models/Reviews')
const saleModel=require('./models/Sales');

const sequelize = new Sequelize(
    `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`,
    // `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/railway`,
    {
        logging: false,  
        native: false,
    }
);

const basename = path.basename(__filename);

const modelDefiners = [];

fs.readdirSync(path.join(__dirname, "/models")) // Lee todos los archivos de la carpeta Models, los requeriere y agrega al arreglo modelDefiners
    .filter(
        (file) =>
            file.indexOf(".") !== 0 &&
            file !== basename &&
            file.slice(-3) === ".js"
    )
    .forEach((file) => {
        // modelDefiners.push(require(path.join(__dirname, "/models", file)));
        modelDefiners.push(require(path.join(__dirname, "models", file))(sequelize));

    });

// modelDefiners.forEach((model) => model(sequelize));    // conexion (sequelize) a todos los modelos

modelDefiners.push(typeModel(sequelize));
modelDefiners.push(propertyModel(sequelize));
modelDefiners.push(categoryModel(sequelize));
modelDefiners.push(userModel(sequelize));
modelDefiners.push(reviewModel(sequelize));
modelDefiners.push(saleModel(sequelize));

let entries = Object.entries(sequelize.models);      // Capitalizalos nombres de los modelos ie: product => Product
let capsEntries = entries.map((entry) => [
   entry[0][0].toUpperCase() + entry[0].slice(1),
   entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const { Property, Type, Category, User, Review,Sales } = sequelize.models;

// Aca vendrian las relaciones
// Product.hasMany(Reviews);
Property.belongsTo(Type);
Property.belongsTo(Category);
Review.belongsTo(User);
Review.belongsTo(Property);
User.belongsToMany(Property, { through: 'UserProperty' }); 
Property.belongsToMany(User, { through: 'UserProperty' });
Property.belongsToMany(Review, {through: 'PropertyReview' });
User.belongsToMany(Review, {through: 'UserReview'});
Sales.belongsTo(User);
Sales.belongsTo(Property);

// Type.belongsToMany(Category, { through: "PropertyTypeCategory" });
// Category.belongsToMany(Type, { through: "PropertyTypeCategory" });


module.exports = {
   ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
   conn: sequelize, // para importart la conexión { conn } = require('./db.js');
};

