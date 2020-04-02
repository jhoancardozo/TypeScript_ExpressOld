const mongoose = require('mongoose');

// Clase Schema de moongose
const Schema = mongoose.Schema;

// Object destructuring
// const {Schema}=mongoose

// Definiir el Schema para product
const productSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    images: { type: [{ type: String, required: true }], default: [] }, //Almacna un Array (se define el tipo de datos del object que almacenará), ó puede almacenar por default un array vacio
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
  },
  { timestamps: true }
);

// Creamos el modelo a partir del Schema definido
const modelo = mongoose.model('Product', productSchema);

// Exportamos nuestro modelo contruido
module.exports = modelo;
