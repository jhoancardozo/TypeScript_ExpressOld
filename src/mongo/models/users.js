const mongoose = require('mongoose');

// Clase Schema de moongose
const Schema = mongoose.Schema;

// Object destructuring
// const {Schema}=mongoose

// Definiir el Schema para usuario
const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  data: {
    type: { age: Number, isMale: Boolean }
  },
  role: { type: String, enum: ['admin', 'seller'], default: 'seller' }
});

// Creamos el modelo a partir del Schema definido
const modelo = mongoose.model('User', userSchema);

// Exportamos nuestro modelo contruido
module.exports = modelo;
