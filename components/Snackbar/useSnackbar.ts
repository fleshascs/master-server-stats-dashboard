import { useSnackbar as useSomeoneElsesSnackbar } from 'material-ui-snackbar-provider';
import { useMemo } from 'react';

export function useSnackbar() {
  const snackbar = useSomeoneElsesSnackbar();
  return useMemo(() => {
    const showMessage =
      (type: 'info' | 'warning' | 'error' | 'success') =>
      (
        message: string,
        action = undefined,
        handleAction = undefined,
        customParameters = undefined
      ) =>
        snackbar.showMessage(message, action, handleAction, {
          ...customParameters,
          type
        });
    return {
      ...snackbar,
      showMessage: showMessage('info'),
      showInfo: showMessage('info'),
      showWarning: showMessage('warning'),
      showError: showMessage('error'),
      showSuccess: showMessage('success')
    };
  }, [snackbar]);
}
