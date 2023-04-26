import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import Cookies from 'js-cookie';
import { v4 as uuidv4 } from 'uuid';

const getConfig = () => {
  const token = Cookies.get('token') || null; // Get the value of the 'token' cookie
  return {
    headers: {
      Authorization: `Bearer ${token}`, // Set the value of the 'Authorization' header to 'Bearer <token>'
    },
  };
};

const fetchExpense = () => {
  return axios.get(
    'https://expense-tracker-api-gs75.onrender.com/api/v1/expense',
    getConfig()
  );
};

const addExpense = values => {
  return axios.post(
    'https://expense-tracker-api-gs75.onrender.com/api/v1/expense',
    values,
    getConfig()
  );
};

const deleteExpense = id => {
  return axios.delete(
    `https://expense-tracker-api-gs75.onrender.com/api/v1/expense/${id}`,
    getConfig()
  );
};

export const useExpenseData = () => {
  return useQuery(['expense'], fetchExpense);
};

export const useAddExpenseData = () => {
  const queryClient = useQueryClient();
  return useMutation(addExpense, {
    onMutate: async values => {
      await queryClient.cancelQueries(['expense']);
      const previousData = queryClient.getQueryData(['expense']);
      queryClient.setQueryData(['expense'], oldQueryData => {
        return {
          ...oldQueryData,
          data: [...oldQueryData.data, { _id: uuidv4(), ...values }],
        };
      });

      return { previousData };
    },

    onError: (_error, _newValues, context) => {
      queryClient.setQueryData(['expense'], context.previousData);
    },

    onSettled: () => {
      queryClient.invalidateQueries(['expense']);
    },
  });
};

export const useDeleteExpenseData = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteExpense, {
    onMutate: async id => {
      await queryClient.cancelQueries(['expense']);
      const previousData = queryClient.getQueryData(['expense']);
      queryClient.setQueryData(['expense'], oldQueryData => {
        return {
          ...oldQueryData,
          data: oldQueryData.data.filter(expense => expense._id !== id),
        };
      });

      return { previousData };
    },

    onError: (_error, _newValues, context) => {
      queryClient.setQueryData(['expense'], context.previousData);
    },

    onSettled: () => {
      queryClient.invalidateQueries(['expense']);
    },
  });
};
