class Grid {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  moveHere(character) {
    const movedCharacter = character.move(this.x, this.y);

    return {
      character: movedCharacter,
      won: false,
    };
  }
}

module.exports = {
  Grid,
};
