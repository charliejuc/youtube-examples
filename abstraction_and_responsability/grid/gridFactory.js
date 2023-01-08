const { EnemyGrid } = require('./EnemyGrid');
const { FinalGrid } = require('./FinalGrid');
const { Grid } = require('./Grid');

const gridTypes = {
  final: 'final',
  enemy: 'enemy',
  normal: 'normal',
};

const gridFactory = (type, x, y, baseDamage) => {
  if (type === gridTypes.final) {
    return new FinalGrid(x, y);
  }

  if (type === gridTypes.enemy) {
    return new EnemyGrid(x, y, baseDamage);
  }

  return new Grid(x, y);
};

module.exports = {
  gridTypes,
  gridFactory,
};
