import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ExpenseContextProvider } from './context/ExpenseContext';
import { SnackbarContextProvider } from './context/SnackbarContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <SnackbarContextProvider>
      <ExpenseContextProvider>
        <App />
      </ExpenseContextProvider>
    </SnackbarContextProvider>
  </React.StrictMode>
);
