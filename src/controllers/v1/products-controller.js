const Products = require('../../mongo/models/products');
const createProduct = async (request, response) => {
  try {
    console.log(request.body);
    // OBTENEMOS VALUES OF RESQUEST
    const { title, description, price, images, userId } = request.body;
    // ALMACENAMOS LA INFORMACION EN LA BD
    const productCreated = await Products.create({
      title,
      description,
      price,
      images,
      user: userId
    });
    response.send({ status: 200, message: 'product Created' });
  } catch (error) {
    console.log('create Product : ', error);
    response.send({ status: 500, message: error.message });
  }
};

const deleteProduct = (request, response) => {};

const updateProduct = (request, response) => {};

const getProduct = async (request, response) => {
  try {
    const allProducts = await Products.find()
      .select('title description price')
      .populate('user', 'username email role data');
    response.send({ status: 'OK', data: allProducts });
  } catch (error) {
    console.log('get Products : ', error);
    response.send({ status: 500, message: error.message });
  }
};

const getUserId = async (request, response) => {
  try {
    //   Filtrando Productos vinculados a un UserId
    // const productsUserId = await Products.find({ user: request.params.userId });
    // Filtando Productos segun el valor del precio
    // https://docs.mongodb.com/manual/reference/operator/query/
    // Reference >> Operators >> Query and Projection Operators
    const productsUserId = await Products.find({
      price: { $lt: 20 }
    });
    response.send({ status: 'OK', data: productsUserId });
  } catch (error) {
    console.log('get products UserId : ', error);
    response
      .status(500)
      .send({ status: 'ERROR_QUERY', message: error.message });
  }
};

module.exports = {
  createProduct,
  deleteProduct,
  updateProduct,
  getProduct,
  getUserId
};
