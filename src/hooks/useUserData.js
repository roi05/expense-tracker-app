import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

const signUpUser = values => {
  return axios.post(
    'https://expense-tracker-api-gs75.onrender.com/api/v1/user/signup',
    values
  );
};

const loginUser = values => {
  return axios.post(
    'https://expense-tracker-api-gs75.onrender.com/api/v1/user/login',
    values
  );
};

export const useSignupUser = () => {
  return useMutation(signUpUser);
};

export const useLoginUser = () => {
  return useMutation(loginUser);
};
