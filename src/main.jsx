import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { SnackbarContextProvider } from './context/SnackbarContext';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { UserContextProvider } from './context/UserContext';

const queryclient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryclient}>
      <UserContextProvider>
        <SnackbarContextProvider>
          <App />
        </SnackbarContextProvider>
      </UserContextProvider>
      <ReactQueryDevtools
        initialIsOpen={false}
        position='bottom-right'
      />
    </QueryClientProvider>
  </React.StrictMode>
);
