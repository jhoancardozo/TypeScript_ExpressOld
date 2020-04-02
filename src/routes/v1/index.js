// Objets que instancian las rutas especificas de cada objeto
const userRoutes = require('./users-routes');
const productsRoutes = require('./products-routes');

module.exports = app => {
  // app.use('rutaRaizdeDireccionParaAccederAlObjecto', 'object que apunta a las rutas especificas del objeto');
  // Ejemplo: app.use('/api/v1/users', userRoutes);
  app.use('/api/v1/users', userRoutes);
  app.use('/api/v1/products', productsRoutes);
};
