import { createContext, useState } from 'react';

export const SnackbarContext = createContext();

export const SnackbarContextProvider = ({ children }) => {
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  return (
    <SnackbarContext.Provider
      value={{
        openSnackbar,
        setOpenSnackbar,
        snackbarMessage,
        setSnackbarMessage,
        handleCloseSnackbar,
      }}>
      {children}
    </SnackbarContext.Provider>
  );
};
