import {
  incomeCategories,
  expenseCategories,
  resetCategories,
} from '../constants/category';

export const filterCategory = (title, expenses) => {
  resetCategories();

  const filteredByCategory = expenses.filter(e => title === e.type);

  const category = title === 'income' ? incomeCategories : expenseCategories;

  filteredByCategory.forEach(income => {
    category.forEach(cat => {
      if (cat.type === income.category) {
        cat.amount += income.amount;
      }
    });
  });

  return {
    labels: category.map(e => e.type),
    datasets: [
      {
        label: 'Amount',
        data: category.map(e => e.amount),
        backgroundColor: category.map(e => e.color),
        borderColor: '#eeeeee',
        borderWidth: 2,
      },
    ],
  };
};
