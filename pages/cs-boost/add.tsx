import { addUpdateServer } from '../../services/boost';
import { useSnackbar } from '../../components/Snackbar/useSnackbar';
import { useRouter } from 'next/router';
import { AddUpdateServerForm } from '../../components/cs-boost/AddUpdateServerForm';
import { EditableServerValues } from '../../components/cs-boost/types';

export default function Page() {
  const router = useRouter();
  const snackbar = useSnackbar();

  const onSubmit = (values: EditableServerValues) => {
    addUpdateServer(values)
      .then(() => {
        snackbar.showSuccess('Saved!');
        router.replace('/cs-boost');
      })
      .catch(() => {
        snackbar.showError('Failed to save');
      });
  };

  return (
    <>
      <h2 className='text-3xl pt-10 pb-6'>Add a server</h2>
      <div className='max-w-sm'>
        <AddUpdateServerForm onSubmit={onSubmit} />
      </div>
    </>
  );
}
