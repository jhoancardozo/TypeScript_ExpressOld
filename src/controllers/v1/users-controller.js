const bcrypt = require('bcrypt');
const Users = require('./../../mongo/models/users');
const Products = require('./../../mongo/models/products');
const jwt = require('jsonwebtoken');
const TIME_EXPIRES_TOKEN = 60 * 10;

const createUser = async (request, response) => {
  try {
    console.log(request.body);
    // OBTENCION DE DATOS EN LA PETICION
    // forma 1
    // const username = request.body.username;
    // const password = request.body.password;
    // const email = request.body.email;
    // const data = request.body.data;

    // equivalencia forma 1 (Object destructuring)

    const { username, password, email, data } = request.body;

    const hash = await bcrypt.hash(password, 15);
    console.log('new hash', hash);

    // ALMACENAMOS LA INFORMACION EN LA BASE DE DATOS
    //
    // Forma 1 ({username:username} <==> {username})
    // await Users.create({
    //   username,
    //   password: hash,
    //   email,
    //   data
    // });

    // Forma 2 (haciendo una instancia del objeto Users y usar la funcion SAVE())

    const user = new Users();
    user.username = username;
    user.email = email;
    user.password = hash;
    user.data = data;

    await user.save();

    console.log('FIN');

    response.send({ status: 200, message: 'user Created' });
  } catch (error) {
    // Captura del Error para modificar valores de respuesta al cliente
    if (error.code && error.code === 11000) {
      response
        .status(400)
        .send({ status: 'DUPLICATED_VALUES', message: error.keyValue });
      return; // Es importante retorna para que no haya saturacion de respuesta a la misma peticion de creacion de Users
    }

    response.status(500).send({ status: 'EROR', err: error.message });
  }
};

const deleteUser = async (request, response) => {
  const { userId } = request.body;
  try {
    if (!userId) {
      throw new Error('Missing UserId');
    }
    const dataDeleteUser = await Users.findByIdAndDelete(userId);

    if (!dataDeleteUser) {
      throw new Error('User not found');
    }

    await Products.deleteMany({ user: userId });

    response.send({ status: 200, message: 'user Deleted' });
  } catch (error) {
    console.log('Controller deleteUser : ', error);
    //   forma 2 de responder Peticion -- throw { Object } (Lanzar Excepcion Personalidad)
    response
      .status(error.code || 500)
      .send({ status: error.status || 'ERROR', message: error.message });
  }
};

const updateUser = async (request, response) => {
  try {
    console.log('User Updated - userId : ', request.sessionData.userId);
    const { username, email, data } = request.body;

    await Users.findByIdAndUpdate(request.sessionData.userId, {
      username,
      email,
      data
    });

    response.send({ status: 200, message: 'user Updated' });
  } catch (error) {
    console.log('User Updated : ', error);
    if (error.code && error.code === 11000) {
      response
        .status(400)
        .send({ status: 'DUPLICATED_VALUES', message: error.keyValue });
    }
    response
      .status(500)
      .send({ status: 'ERROR_UPDATED_USER', message: error.message });
  }
};

const getUser = async (request, response) => {
  try {
    // forma 1 de Seleccionar campos de la consulta (incluyendo PARAM STRING los nombre de los campos)
    // const users = await Users.find().select('username email data');

    // forma 2 de Seleccionar campos de la consulta (Incluyendo:1 ó Excluyendo:0 PARAM OBJECT los nombre de los campos)
    const users = await Users.find().select({ password: 0, __v: 0, role: 0 });
    
    response.send({ status: 200, data: users });
  } catch (error) {
    console.log('User Updated : ', error);
    response.status(500).send({ status: 'ERROR', message: error.message });
  }
};

const login = async (request, response) => {
  try {
    const { email, password } = request.body;
    const userLogin = await Users.findOne({ email });
    if (userLogin) {
      // bcrypt.compare (
      // [ PARAM1 - password almacenado en la BD - ] ,
      // [ PARAM2 - Valor enviado por peticion para validar - ]
      // )
      const isOk = await bcrypt.compare(password, userLogin.password);
      if (isOk) {
        // GENERAR TOKEN
        // jwt.sign(
        // [ PARAM1- {objeto que contendra los valores del usuario (que se quiera enviar_INFORMACION NO SENSIBLE)} - ] ,
        // [ PARAM2 - firma secreta del token (almacenada en las variables de entorno .env) - ] ,
        // [ PARAM3 - { tiempo de expiracion del token => Ejemplo "1m", "2h", "2d", 10 (segundos), 60*10 (segundos) } - ]
        // )
        const dataUser = jwt.sign(
          { userId: userLogin._id, role: userLogin.role },
          process.env.JWT_SECRET,
          { expiresIn: TIME_EXPIRES_TOKEN }
        );
        response.status(200).send({ status: 'OK', data: dataUser });
      } else {
        response
          .status(403)
          .send({ status: 'ERROR_PASSWORD_INCORRECT', message: '' });
      }
    } else {
      response.status(402).send({ status: 'USER_NOT_FOUND', message: '' });
    }
  } catch (error) {
    console.log('Login User : ', error.message);
    response.status(500).send({ status: 'ERROR', message: error.message });
  }
};
module.exports = { createUser, deleteUser, updateUser, getUser, login };
