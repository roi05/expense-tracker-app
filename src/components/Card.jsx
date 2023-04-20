import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import numeral from 'numeral';
import { useExpenseData } from '../hooks/useExpenseData';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

const Card = () => {
  const { data } = useExpenseData();

  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down('sm'));

  const expenseTotal = data?.data.expense
    .filter(item => item.type === 'expense')
    .reduce((acc, item) => acc + item.amount, 0);

  const savingTotal = data?.data.expense
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
            variant={isXs ? 'h5' : 'h3'}
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
                  variant={isXs ? 'h5' : 'h3'}
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
                  variant={isXs ? 'h5' : 'h3'}
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
