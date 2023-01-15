const { OrderRepository } = require('../../database/OrderRepository');
const { ProductRepository } = require('../../database/ProductRepository');
const { buyProduct } = require('../../useCases/product/Buy');

const buyController = async (request, response) => {
  const body = request.body;

  const productId = body.productId;
  const userId = body.userId;

  if (productId == null) {
    return response.status(400).send({
      errors: {
        productId: 'productId is required',
      },
    });
  }

  if (userId == null) {
    return response.status(400).send({
      errors: {
        userId: 'userId is required',
      },
    });
  }

  const productRepository = new ProductRepository();
  const orderRepository = new OrderRepository();

  const order = await buyProduct(productRepository, orderRepository)(productId, userId);

  response.status(201).send(order);
};

module.exports = {
  buyController,
};
