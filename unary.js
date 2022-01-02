const sort = (arr, sortCb) => arr.slice().sort(sortCb);
const toUnaryFunction = (fn) => (arg) => fn(arg);

const arr = [
  [7, 2, 10, 1, 102, 70, 34, 20],
  [200, 150, 220, 170, 62],
];

// console.log(arr.map(sort));
console.log(arr.map(toUnaryFunction(sort)));
