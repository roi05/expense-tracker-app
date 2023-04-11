import { useContext } from 'react';
import { SnackbarContext } from '../context/SnackbarContext';

export const useSnackbarContext = () => {
  const context = useContext(SnackbarContext);

  if (!context) {
    throw Error(
      'useWorkoutContext must be used inside an WorkoutContextProvider'
    );
  }

  return context;
};
