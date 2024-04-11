require("dotenv").config();

const { sequelize } = require("sequelize");
const fs = require("fd");
const path = require("path");
const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;

const sequelize = new Sequelize(
    `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/pyd`,
    {
        logging: false,  
        native: false,
    }
);

const basename = path.basename(__filaname);

const modelDefiners = [];

fs.readdirSync(path.join(__dirname, "/models")) // Lee todos los archivos de la carpeta Models, los requeriere y agrega al arreglo modelDefiners
    .filter(
        (file) =>
            file.indexOf(".") !== 0 &&
            file !== basename &&
            file.slice(-3) === ".js"
    )
    .forEach((file) => {
        modelDefiners.push(require(path.join(--dirname, "/models", file)));
    });

modelDefiners.forEach((model) => model(sequelize));    // conexion (sequelize) a todos los modelos

let entries = Object.entries(sequelize.models);      // Capitalizalos nombres de los modelos ie: product => Product
let capsEntries = entries.map((entry) => [
   entry[0][0].toUpperCase() + entry[0].slice(1),
   entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const { Property, Type, Category } = sequelize.models;

// Aca vendrian las relaciones
// Product.hasMany(Reviews);
Property.belongsTo(Type);
Property.belongsTo(Category);
Type.belongsToMany(Category, { through: "PropertyTypeCategory" });
Category.belongsToMany(Type, { through: "PropertyTypeCategory" });


module.exports = {
   ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
   conn: sequelize, // para importart la conexión { conn } = require('./db.js');
};


