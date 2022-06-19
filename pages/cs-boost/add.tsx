import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { useFormik } from 'formik';
import { addUpdateServer } from '../../services/boost';
import { EditableServerValues } from '../../components/cs-boost/types';
import { validationSchema } from '../../components/cs-boost/validationSchema';
import { useSnackbar } from '../../components/Snackbar/useSnackbar';
import { useRouter } from 'next/router';

export default function Page() {
  const router = useRouter();
  const snackbar = useSnackbar();
  const formik = useFormik<EditableServerValues>({
    initialValues: {
      serverIP: '',
      boostedUntil: ''
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      addUpdateServer(values)
        .then(() => {
          snackbar.showSuccess('Saved!');
          router.replace('/cs-boost');
        })
        .catch(() => {
          snackbar.showError('Failed to save');
        });
    }
  });

  return (
    <>
      <h2 className='text-3xl pt-10 pb-2'>Add a server</h2>
      <div className='max-w-sm'>
        <form onSubmit={formik.handleSubmit}>
          <Stack spacing={2} direction='column'>
            <TextField
              name='serverIP'
              label='Server IP'
              value={formik.values.serverIP}
              onChange={formik.handleChange}
              error={formik.touched.serverIP && Boolean(formik.errors.serverIP)}
              helperText={formik.touched.serverIP && formik.errors.serverIP}
            />
            <DateTimePicker
              label='Boost end date'
              value={formik.values.boostedUntil}
              onChange={(value) => {
                formik.setFieldValue('boostedUntil', Date.parse(value));
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  error={formik.touched.boostedUntil && Boolean(formik.errors.boostedUntil)}
                  name='boostedUntil'
                  helperText={formik.touched.boostedUntil && formik.errors.boostedUntil}
                />
              )}
            />
            <Button color='primary' variant='outlined' fullWidth type='submit'>
              Submit
            </Button>
          </Stack>
        </form>
      </div>
    </>
  );
}
