const prepend = (value) => (arr) => {
  const arrToPrepend = Array.isArray(value) ? value : [value];

  return [...arrToPrepend, ...arr];
};

const append = (value) => (arr) => {
  const arrToAppend = Array.isArray(value) ? value : [value];

  return [...arr, ...arrToAppend];
};

console.log('SINGLE VALUE');
console.log(prepend(1)([2, 3]));
console.log(append(1)([2, 3]));
console.log();

const prepend2 = (values) => (arr) => {
  return [...values, ...arr];
};

const append2 = (values) => (arr) => {
  return [...arr, ...values];
};

console.log('LIST');
console.log(prepend([1])([2, 3]));
console.log(append([1])([2, 3]));
