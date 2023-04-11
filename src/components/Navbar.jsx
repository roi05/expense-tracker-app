import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const NavBar = () => {
  return (
    <Box
      sx={{
        maxWidth: '90%',
        mx: 'auto',
        py: 2,
      
        borderBottom: '1px solid #222831'
      }}>
      <Stack
        direction='row'
        justifyContent='space-between'
        alignItems='center'>
        <Typography variant='h3'>Hello, User</Typography>
        <Typography
          variant='h5'
          sx={{ fontWeight: 500 }}>
          Logout
        </Typography>
      </Stack>
    </Box>
  );
};

export default NavBar;
