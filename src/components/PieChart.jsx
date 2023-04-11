import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useExpenseContext } from '../hooks/useExpenseContext';
import { filterCategory } from '../utils/filterCategory';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = () => {
  const { expenses } = useExpenseContext();

  const incomeData = filterCategory('income', expenses);
  const expenseData = filterCategory('expense', expenses);

  const options1 = {
    tooltips: {
      callbacks: {
        label: function (tooltipItem, data) {
          // Get the value of the current data point
          const value =
            incomeData.datasets[tooltipItem.datasetIndex].data[
              tooltipItem.index
            ];
          // Add a custom string to the tooltip value
          const label = `Value: ${value} Custom Text`;
          return label;
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
          <Pie data={incomeData} options={options1} />
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
          <Pie data={expenseData} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default PieChart;
