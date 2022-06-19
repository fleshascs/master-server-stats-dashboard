import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';

export default function CustomSnackbar({
  message,
  action,
  ButtonProps,
  SnackbarProps,
  customParameters
}) {
  return (
    <Snackbar autoHideDuration={6000} {...SnackbarProps}>
      <Alert
        severity={customParameters?.type}
        sx={{ width: '100%' }}
        action={
          action != null && (
            <Button color='inherit' size='small' {...ButtonProps}>
              {action}
            </Button>
          )
        }
      >
        {message}
      </Alert>
    </Snackbar>
  );
}
