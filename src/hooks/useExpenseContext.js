import { ExpenseContext } from '../context/ExpenseContext';
import { useContext } from 'react';

export const useExpenseContext = () => {
  const context = useContext(ExpenseContext);

  if (!context) {
    throw Error(
      'useWorkoutContext must be used inside an WorkoutContextProvider'
    );
  }

  return context;
};
