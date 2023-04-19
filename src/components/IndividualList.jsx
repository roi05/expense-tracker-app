import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import SavingsRoundedIcon from '@mui/icons-material/SavingsRounded';
import axios from 'axios';
import { useSnackbarContext } from '../hooks/useSnackbarContext';
import numeral from 'numeral';
import { useDeleteExpenseData } from '../hooks/useExpenseData';

const individualList = ({ e }) => {
  const { setOpenSnackbar, setSnackbarMessage } = useSnackbarContext();

  const { mutate } = useDeleteExpenseData();

  const deleteItem = async _id => {
    await mutate(_id);
    setOpenSnackbar(true);
    setSnackbarMessage('Successfully deleted');
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
