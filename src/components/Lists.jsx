import { useEffect, useState } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import IndividualList from './IndividualList';
import { useExpenseContext } from '../hooks/useExpenseContext';
import { TransitionGroup } from 'react-transition-group';
import Collapse from '@mui/material/Collapse';
import Typography from '@mui/material/Typography';
import Snackbar from '@mui/material/Snackbar';
import { useSnackbarContext } from '../hooks/useSnackbarContext';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const allList = () => {
  const { expenses, dispatch } = useExpenseContext();
  const { openSnackbar, handleCloseSnackbar, snackbarMessage } =
    useSnackbarContext();

  useEffect(() => {
    const fetchData = async () => {
      const data = await axios('http://localhost:4000/api/v1/expense');

      dispatch({ type: 'SET_EXPENSE', payload: data.data.expense });
    };

    fetchData();
  }, []);

  return (
    <Box sx={{ maxHeight: '300px', overflow: 'auto' }}>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        action={
          <>
            <IconButton
              size='small'
              aria-label='close'
              color='inherit'
              onClick={handleCloseSnackbar}>
              <CloseIcon fontSize='small' />
            </IconButton>
          </>
        }
      />
      <List>
        <TransitionGroup>
          {expenses.map(e => {
            return (
              <Collapse key={e._id}>
                <IndividualList
                  key={e._id}
                  e={e}
                />
              </Collapse>
            );
          })}
        </TransitionGroup>
      </List>
    </Box>
  );
};

export default allList;
