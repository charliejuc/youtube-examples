const heavyWork = (num) => {
  let i = 30_000_000;
  while (i--) {}

  return num + 1;
};
const thunk =
  (fn) =>
  (...args) =>
  () =>
    fn(...args);

(async () => {
  const arr = [105, 2, 30, 90, 30, 99, 20, 37, 98, 29];

  console.time('Process slow');
  const isLessThan10 = (num) => num < 10;
  const newArr = arr.map(heavyWork);

  console.log(newArr.some(isLessThan10));
  console.timeEnd('Process slow');

  console.time('Process fast');
  const isLessThan10V2 = (getNum) => getNum() < 10;
  const newArrV2 = arr.map(thunk(heavyWork));

  console.log(newArrV2.some(isLessThan10V2));
  console.timeEnd('Process fast');
})();
