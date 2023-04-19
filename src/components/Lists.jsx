import Box from '@mui/material/Box';
import List from '@mui/material/List';
import IndividualList from './IndividualList';
import { TransitionGroup } from 'react-transition-group';
import Collapse from '@mui/material/Collapse';
import Snackbar from '@mui/material/Snackbar';
import { useSnackbarContext } from '../hooks/useSnackbarContext';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useExpenseData } from '../hooks/useExpenseData';

const allList = () => {
  const { openSnackbar, handleCloseSnackbar, snackbarMessage } =
    useSnackbarContext();

  const { data } = useExpenseData();

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
          {data?.data.expense.map(e => {
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
