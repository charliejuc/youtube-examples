const types = {
  incomes: 'incomes',
  expenses: 'expenses',
};
const toIncome = (value) => {
  return {
    type: types.incomes,
    value,
  };
};
const toExpense = (value) => {
  const warning = value < -1000 ? 'worrying' : 'none';

  return {
    type: types.expenses,
    value: Math.abs(value),
    warning,
  };
};
const toIncomeExpense = (value) => {
  if (value >= 0) {
    return toIncome(value);
  }

  return toExpense(value);
};

const arr = [100, -200, 2000, 1430, -1280];
console.log(arr.map(toIncomeExpense));
