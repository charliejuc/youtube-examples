class FinalGrid {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  moveHere(character) {
    const movedCharacter = character.move(this.x, this.y);

    return {
      character: movedCharacter,
      won: true,
      points: character.health * 100,
    };
  }
}

module.exports = {
  FinalGrid,
};
