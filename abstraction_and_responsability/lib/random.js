const hasOccurred = (prob) => {
  if (typeof prob !== 'number' || prob < 0 || prob > 1) {
    throw new Error('Probability must be a number between 0 and 1');
  }

  return () => {
    return Math.random() < prob;
  };
};

const randomInteger = (startOrdEnd, end) => {
  const start = end == null ? 0 : startOrdEnd;
  const _end = end == null ? startOrdEnd : end;

  return Math.floor((_end - start) * Math.random()) + start;
};

module.exports = {
  hasOccurred,
  randomInteger,
};
