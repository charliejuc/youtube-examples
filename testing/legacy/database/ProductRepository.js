const products = [
  { id: 1, name: 'Product 1', amount: 100, discount: 10 },
  { id: 2, name: 'Product 2', amount: 80 },
  { id: 3, name: 'Product 3', amount: 200 },
];
class ProductRepository {
  constructor() {
    this._products = products;
  }

  async getById(id) {
    return this._products.find((product) => product.id === id) || null;
  }
}

module.exports = {
  ProductRepository,
};
