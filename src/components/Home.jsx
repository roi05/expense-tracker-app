import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Balance from './Balance';
import Lists from './Lists';
import PieChart from './PieChart';

const Home = () => {
  return (
    <>
      <Container maxWidth='lg'>
        <Box>
          <Balance />
          <Lists />
          <PieChart />
        </Box>
      </Container>
    </>
  );
};

export default Home;
