const prepend =
  (...values) =>
  (arr) => {
    return [...values, ...arr];
  };

const append =
  (...values) =>
  (arr) => {
    return [...arr, ...values];
  };

console.log('SINGLE VALUE');
console.log(prepend(1)([2, 3]));
console.log(append(1)([2, 3]));
console.log();

console.log('LIST OF VALUES AS PARAMETERS');
console.log(prepend(1, 7)([2, 3]));
console.log(append(1, 7)([2, 3]));
console.log();

console.log('LIST OF VALUES WITH SPREAD OPERATOR');
console.log(prepend(...[1, 7])([2, 3]));
console.log(append(...[1, 7])([2, 3]));
