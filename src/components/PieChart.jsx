import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { filterCategory } from '../utils/filterCategory';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import numeral from 'numeral';
import { useExpenseData } from '../hooks/useExpenseData';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = () => {
  const { data } = useExpenseData();

  const expenses = data?.data.expense || [];

  const incomeData = filterCategory('income', expenses);
  const expenseData = filterCategory('expense', expenses);

  const options = {
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context) {
            // customize the label text here
            return `${context.label}: ₱${numeral(context.parsed).format(
              '0,0.00'
            )}`;
          },
        },
      },
    },
  };

  if (expenses.length < 1) {
    return;
  }

  return (
    <Box sx={{ mt: 2 }}>
      <Grid
        container
        spacing={2}>
        <Grid
          item
          xs={6}>
          <Typography
            variant='h5'
            gutterBottom
            textAlign='center'
            sx={{ fontWeight: '800' }}>
            Income
          </Typography>
          <Pie
            data={incomeData}
            options={options}
          />
        </Grid>
        <Grid
          item
          xs={6}>
          <Typography
            variant='h5'
            gutterBottom
            textAlign='center'
            sx={{ fontWeight: '800' }}>
            Expenses
          </Typography>
          <Pie
            data={expenseData}
            options={options}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default PieChart;
