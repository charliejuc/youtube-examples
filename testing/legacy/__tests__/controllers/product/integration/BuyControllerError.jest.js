const { buyController } = require('../../../../controllers/product/BuyController');
const { OrderRepository } = require('../../../../database/OrderRepository');

test('buyController is defined and it is a function', async () => {
  expect(buyController).toBeDefined();
  expect(typeof buyController).toBe('function');
});

test('buyController should return errors', async () => {
  const body = {
    userId: 5,
  };
  const send = jest.fn();
  const status = jest.fn(() => ({ send }));
  const response = { status };

  await buyController({ body }, response);

  const result = send.mock.calls[0][0];

  expect(result).toHaveProperty('errors');
});

test('buyController should set status code "400" Bad Request', async () => {
  const body = {
    productId: 1,
  };
  const send = jest.fn();
  const status = jest.fn(() => ({ send }));
  const response = { status };

  await buyController({ body }, response);

  const result = status.mock.calls[0][0];

  expect(result).toBe(400);
});

test('buyController should not insert an order', async () => {
  const body = {
    userId: 5,
  };
  const send = jest.fn();
  const status = jest.fn(() => ({ send }));
  const response = { status };

  await buyController({ body }, response);

  const result = send.mock.calls[0][0];

  const orderRepository = new OrderRepository();
  const order = await orderRepository.getById(result.id);

  expect(order).toBeFalsy();
});

test('buyController should return "productId" error', async () => {
  const body = {
    userId: 5,
  };
  const send = jest.fn();
  const status = jest.fn(() => ({ send }));
  const response = { status };

  await buyController({ body }, response);

  const result = send.mock.calls[0][0];

  expect(result).toHaveProperty('errors.productId');
});

test('buyController should return "userId" error', async () => {
  const body = {
    productId: 1,
  };
  const send = jest.fn();
  const status = jest.fn(() => ({ send }));
  const response = { status };

  await buyController({ body }, response);

  const result = send.mock.calls[0][0];

  expect(result).toHaveProperty('errors.userId');
});
