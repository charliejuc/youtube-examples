const { buyController } = require('../../../../controllers/product/BuyController');
const { OrderRepository } = require('../../../../database/OrderRepository');

test('buyController is defined and it is a function', async () => {
  expect(buyController).toBeDefined();
  expect(typeof buyController).toBe('function');
});

test('buyController should not return errors', async () => {
  const body = {
    productId: 1,
    userId: 5,
  };
  const send = jest.fn();
  const status = jest.fn(() => ({ send }));
  const response = { status };

  await buyController({ body }, response);

  const result = send.mock.calls[0][0];

  expect(result).not.toHaveProperty('errors');
});

test('buyController "status" should be called', async () => {
  const body = {
    productId: 1,
    userId: 5,
  };
  const send = jest.fn();
  const status = jest.fn(() => ({ send }));
  const response = { status };

  await buyController({ body }, response);

  expect(status).toBeCalledTimes(1);
});

test('buyController "send" should be called', async () => {
  const body = {
    productId: 1,
    userId: 5,
  };
  const send = jest.fn();
  const status = jest.fn(() => ({ send }));
  const response = { status };

  await buyController({ body }, response);

  expect(send).toBeCalledTimes(1);
});

test('buyController should set status code "201" CREATED', async () => {
  const body = {
    productId: 1,
    userId: 5,
  };
  const send = jest.fn();
  const status = jest.fn(() => ({ send }));
  const response = { status };

  await buyController({ body }, response);

  const result = status.mock.calls[0][0];

  expect(result).toBe(201);
});

test('buyController should insert an order', async () => {
  const body = {
    productId: 1,
    userId: 5,
  };
  const send = jest.fn();
  const status = jest.fn(() => ({ send }));
  const response = { status };

  await buyController({ body }, response);

  const result = send.mock.calls[0][0];

  const orderRepository = new OrderRepository();
  const order = await orderRepository.getById(result.id);

  expect(order).toHaveProperty('id');
  expect(order.products[0].id).toBe(body.productId);
  expect(order.userId).toBe(body.userId);
});

test('buyController should calculate discount well', async () => {
  const body = {
    productId: 1,
    userId: 5,
  };
  const send = jest.fn();
  const status = jest.fn(() => ({ send }));
  const response = { status };

  await buyController({ body }, response);

  const result = send.mock.calls[0][0];

  const orderRepository = new OrderRepository();
  const order = await orderRepository.getById(result.id);

  const amountWithDiscount = 90;

  expect(order.amount).toBe(amountWithDiscount);
});
