import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Card from './Card';
import Form from './Form';

const Balance = () => {
  return (
    <Box sx={{ flexGrow: 1, mt: 3 }}>
      <Grid
        container
        spacing={2}>
        <Grid
          item
          xs={12}
          sm={6}>
          <Card />
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}>
          <Form />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Balance;
