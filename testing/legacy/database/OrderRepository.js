const orders = [];
class OrderRepository {
  constructor() {
    this._orders = orders;
  }

  async getById(id) {
    return this._orders.find((product) => product.id === id) || null;
  }

  async insert(order) {
    return this._orders.push(order);
  }
}

module.exports = {
  OrderRepository,
};
