import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import InputAdornment from '@mui/material/InputAdornment';
import { incomeCategories, expenseCategories } from '../constants/category';
import axios from 'axios';
import { useFormik } from 'formik';
import { useExpenseContext } from '../hooks/useExpenseContext';
import { useSnackbarContext } from '../hooks/useSnackbarContext';

const Form = () => {
  const { dispatch } = useExpenseContext();
  const { setOpenSnackbar, setSnackbarMessage } = useSnackbarContext();

  const formik = useFormik({
    initialValues: {
      type: 'income',
      category: '',
      amount: '',
    },
    onSubmit: async (values, { resetForm }) => {
      const response = await axios.post(
        'https://expense-tracker-api-gs75.onrender.com/api/v1/expense',
        values
      );
      setOpenSnackbar(true);
      setSnackbarMessage('Successfully Added');
      dispatch({ type: 'CREATE_EXPENSE', payload: response.data });

      resetForm();
    },
  });

  const categoryOptions =
    formik.values.type === 'income' ? incomeCategories : expenseCategories;

  return (
    <form onSubmit={formik.handleSubmit}>
      <Box>
        <FormControl
          fullWidth
          margin='normal'>
          <InputLabel id='type-label'>Type</InputLabel>
          <Select
            labelId='type-label'
            id='type-select'
            name='type'
            value={formik.values.type}
            label='Type'
            onChange={formik.handleChange}>
            <MenuItem value='income'>Income</MenuItem>
            <MenuItem value='expense'>Expense</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Box>
        <FormControl
          fullWidth
          margin='normal'>
          <InputLabel id='category-label'>Category</InputLabel>
          <Select
            labelId='category-label'
            id='category'
            name='category'
            required
            value={formik.values.category}
            label='Category'
            onChange={formik.handleChange}>
            {categoryOptions.map(option => (
              <MenuItem
                key={option.type}
                value={option.type}>
                {option.type}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Box>
        <Grid
          container
          justifyContent='space-around'
          alignItems='center'
          spacing={2}>
          <Grid
            item
            xs={8}>
            <TextField
              fullWidth
              placeholder='0'
              label='Amount'
              id='amount'
              type='number'
              name='amount'
              required
              value={formik.values.amount}
              onChange={formik.handleChange}
              margin='normal'
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>₱</InputAdornment>
                ),
              }}
            />
          </Grid>

          <Grid
            item
            xs={4}>
            <Button
              sx={{ bgcolor: '#00ADB5', '&:hover': { bgcolor: '#039198' } }}
              fullWidth
              type='submit'
              size='large'
              variant='contained'
              endIcon={<ArrowForwardIcon />}>
              Submit
            </Button>
          </Grid>
        </Grid>
      </Box>
    </form>
  );
};

export default Form;
