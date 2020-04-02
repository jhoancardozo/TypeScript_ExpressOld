const jwt = require('jsonwebtoken');

const isValidhostName = (request, response, next) => {
  const hostNameValid = ['localhost', 'jhoancardozo.dc'];
  if (hostNameValid.includes(request.hostname)) {
    next();
  } else {
    response.status(500).send({ status: 'HOST_INVALID', message: '' });
  }
};

const isAuth = (request, response, next) => {
  try {
    const { token } = request.headers;
    if (token) {
      // VERIFICACION DE TOKEN VALIDO
      //   jwt.verify(
      //[ PARAM1 - token enviado por request.headers (String) - ] ,
      // [ PARAM2 - firma secreta del token (almacenada en las variables de entorno .env) - ]
      // )
      const data = jwt.verify(token, process.env.JWT_SECRET);
      //   console.log(data);
      //   if (data.userId !== request.body.userId && data.role !== 'admin') {
      //     //   Se lanzará una Excepcion a la peticion
      //     // Sí usuario del Token es diferente al usuario que se desea actualizar datos Y
      //     // Sí usuario del Token tiene un rol diferente de admin
      //     throw {
      //       code: 403,
      //       status: 'ACCESS_DENIED',
      //       message: 'Missing permission or role invalid'
      //     };
      //   }
      request.sessionData = { userId: data.userId, role: data.role };
      next();
    } else {
      // Forma 1 de responder Peticion -- response.send()
      //   response
      //     .status(403)
      //     .send({ status: 'ACCESS_DENIED', message: 'Missing token in headers' });
      //
      //   forma 2 de responder Peticion -- throw { Object } (Lanzar Excepcion Personalidad)
      throw {
        code: 403,
        status: 'ACCESS_DENIED',
        message: 'Missing token in headers'
      };
    }
  } catch (error) {
    console.log('Middlewares isAuth : ', error.message);
    // Forma 1 de responder Peticion -- response.send()
    // response.status(500).send({ status: 'ERROR', message: error.message });
    //
    //   forma 2 de responder Peticion -- throw { Object } (Lanzar Excepcion Personalidad)
    response
      .status(error.code || 500)
      .send({ status: error.status || 'ERROR', message: error.message });
  }
};

const isAdmin = (request, response, next) => {
  try {
    const { role } = request.sessionData;
    if (role !== 'admin') {
      throw {
        code: 403,
        status: 'ACCESS_DENIED',
        message: 'Role invalid'
      };
    }
    next();
  } catch (error) {
    console.log('Middlewares isAdmin : ', error.message);
    //   forma 2 de responder Peticion -- throw { Object } (Lanzar Excepcion Personalidad)
    response
      .status(error.code || 500)
      .send({ status: error.status || 'ERROR', message: error.message });
  }
};

module.exports = { isValidhostName, isAuth, isAdmin };
