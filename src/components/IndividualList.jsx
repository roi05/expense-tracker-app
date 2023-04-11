import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import SavingsRoundedIcon from '@mui/icons-material/SavingsRounded';
import axios from 'axios';
import { useExpenseContext } from '../hooks/useExpenseContext';
import { useSnackbarContext } from '../hooks/useSnackbarContext';
import numeral from 'numeral';

const individualList = ({ e }) => {
  const { dispatch } = useExpenseContext();
  const { setOpenSnackbar, setSnackbarMessage } = useSnackbarContext();

  const deleteItem = async _id => {
    const response = await axios.delete(
      `https://expense-tracker-api-gs75.onrender.com/api/v1/expense/${_id}`
    );
    setOpenSnackbar(true);
    setSnackbarMessage('Successfully deleted');
    dispatch({ type: 'DELETE_EXPENSE', payload: { _id } });
  };
  const expenseColor = e.type === 'expense' ? 'error' : 'success';
  return (
    <ListItem
      divider
      secondaryAction={
        <IconButton
          onClick={() => deleteItem(e._id)}
          edge='end'
          aria-label='delete'>
          <DeleteIcon fontSize='large' />
        </IconButton>
      }>
      <ListItemAvatar>
        <SavingsRoundedIcon color={expenseColor} />
      </ListItemAvatar>
      <ListItemText
        primary={e.category}
        secondary={`₱${numeral(e.amount).format('0,0.00')}`}
      />
    </ListItem>
  );
};

export default individualList;
