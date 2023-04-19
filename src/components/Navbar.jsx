import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useUserContext } from '../hooks/useUserContext';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';

const NavBar = () => {
  const { user } = useUserContext();
  return (
    <Box
      sx={{
        maxWidth: '90%',
        mx: 'auto',
        py: 2,

        borderBottom: '1px solid #222831',
      }}>
      <Stack
        direction='row'
        justifyContent='space-between'
        alignItems='center'>
        <Typography
          variant='h4'
          sx={{ fontWeight: 500 }}>
          Hello, {user ? user : ' welcome to my app'}
        </Typography>

        {user ? (
          <Typography
            variant='h5'
            sx={{ fontWeight: 500, cursor: 'pointer' }}
            onClick={() => {
              Cookies.remove('token');
              localStorage.removeItem('user');
              window.location.reload();
            }}>
            Logout
          </Typography>
        ) : (
          <Stack
            direction='row'
            spacing={2}>
            <Typography
              variant='h5'
              sx={{ fontWeight: 500 }}>
              <Link
                to='/login'
                style={{ textDecoration: 'none', color: 'inherit' }}>
                Login
              </Link>
            </Typography>
            <Typography
              variant='h5'
              sx={{ fontWeight: 500 }}>
              <Link
                to='/signup'
                style={{ textDecoration: 'none', color: 'inherit' }}>
                Signup
              </Link>
            </Typography>
          </Stack>
        )}
      </Stack>
    </Box>
  );
};

export default NavBar;
