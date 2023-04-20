import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useLoginUser } from '../hooks/useUserData';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../hooks/useUserContext';
import Typography from '@mui/material/Typography';
import Cookies from 'js-cookie';

const Login = () => {
  const { mutate, error } = useLoginUser();

  const navigate = useNavigate();

  const { setUser } = useUserContext();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },

    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Required'),
      password: Yup.string()
        .min(6, 'Must be 6 characters or more')
        .required('Required'),
    }),

    onSubmit: async values => {
      await mutate(values, {
        onSuccess: data => {
          setUser(data.data.email);

          // set user in local storage in the browser
          localStorage.setItem('user', JSON.stringify(data.data.email));

          // set cookie in the browser
          const cookieValue = data.data.token;
          Cookies.set('token', cookieValue);

          navigate('/');
        },
      });
    },
  });

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100vw',
        height: '70vh',
      }}>
      <form
        onSubmit={formik.handleSubmit}
        style={{ padding: '1rem' }}>
        <TextField
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
          label='Email'
          variant='standard'
          margin='normal'
          id='email'
          name='email'
          type='text'
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          autoFocus
          fullWidth
        />
        <TextField
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
          label='Password'
          variant='standard'
          margin='normal'
          type='password'
          id='password'
          name='password'
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          fullWidth
        />

        <Button
          fullWidth
          variant='contained'
          type='submit'
          size='large'
          sx={{ mt: 2, bgcolor: '#393E46', '&:hover': { bgcolor: '#272B31' } }}>
          Login
        </Button>

        <Typography
          align='center'
          variant='h6'
          color='error'
          gutterBottom
          sx={{ mt: 2 }}>
          {error && error.response.data.error}
        </Typography>
      </form>
    </Box>
  );
};

export default Login;
