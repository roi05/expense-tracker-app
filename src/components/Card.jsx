import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { useExpenseContext } from '../hooks/useExpenseContext';
import numeral from 'numeral';

const Card = () => {
  const { expenses } = useExpenseContext();

  const expenseTotal = expenses
    .filter(item => item.type === 'expense')
    .reduce((acc, item) => acc + item.amount, 0);

  const savingTotal = expenses
    .filter(item => item.type === 'income')
    .reduce((acc, item) => acc + item.amount, 0);

  const allTotal = savingTotal - expenseTotal;

  return (
    <Box>
      <Paper sx={{ bgcolor: '#00ADB5' }}>
        <Box sx={{ p: 3 }}>
          <Typography
            variant='overline'
            component='h5'>
            My Balance
          </Typography>
          <Typography
            variant='h3'
            sx={{ fontWeight: 500 }}
            gutterBottom>
            {`₱${numeral(allTotal).format('0,0.00')}`}
          </Typography>

          <Box>
            <Grid
              container
              spacing={2}>
              <Grid
                item
                xs={6}>
                <Typography
                  variant='overline'
                  component='h5'>
                  Income
                </Typography>
                <Typography
                  variant='h4'
                  gutterBottom>
                  {`+ ₱${numeral(savingTotal).format('0,0.00')}`}
                </Typography>
              </Grid>
              <Grid
                item
                xs={6}>
                <Typography
                  variant='overline'
                  component='h5'>
                  Expense
                </Typography>
                <Typography
                  variant='h4'
                  gutterBottom>
                  {`- ₱${numeral(expenseTotal).format('0,0.00')}`}
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default Card;
