const { randomInteger } = require('../lib/random');
const { EnemyGrid } = require('./EnemyGrid');
const { FinalGrid } = require('./FinalGrid');
const { gridFactory, gridTypes } = require('./gridFactory');

class RandomGridList {
  constructor(xMax, yMax, options = { enemy: { probability: 0.01, damage: 1 } }) {
    this.options = options;
    this.xMax = xMax;
    this.yMax = yMax;

    this.grids = this._generateGrid();
  }

  _generateGrid() {
    const finalX = randomInteger(this.xMax);
    const finalY = randomInteger(this.yMax);
    const finalGrid = gridFactory(gridTypes.final, finalX, finalY);

    const gridX = Array(this.xMax)
      .fill()
      .map((_, x) => {
        const gridY = Array(this.yMax)
          .fill()
          .map((_, y) => {
            if (x === finalX && y === finalY) {
              return finalGrid;
            }

            const randomType = Math.random() < this.options.enemy.probability ? gridTypes.enemy : gridTypes.normal;
            const grid = gridFactory(randomType, x, y, this.options.enemy.damage);

            return grid;
          });

        return gridY;
      });

    return gridX;
  }

  getGrid(x, y) {
    return this.grids[x][y];
  }

  show(character) {
    const gridsToShow = this.grids.reduce((acc, gridsY, x) => {
      const gridsYToShow = gridsY.reduce((_acc, grid, y) => {
        const isCharacterPosition = character.x === x && character.y === y;

        if (grid instanceof EnemyGrid) {
          if (isCharacterPosition) {
            return _acc + ' 🧟🧒🧟';
          }

          return _acc + ' 🧟';
        }

        if (grid instanceof FinalGrid) {
          if (isCharacterPosition) {
            return _acc + ' 🥅🧒🥅';
          }

          return _acc + ' 🥅';
        }

        if (isCharacterPosition) {
          return _acc + ' 🌲🧒🌲';
        }

        return _acc + ' 🌲';
      }, '');

      return acc + gridsYToShow + '\n';
    }, '');

    return gridsToShow;
  }
}

module.exports = {
  RandomGridList,
};
