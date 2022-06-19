import { useEffect, useMemo, useState } from 'react';
import { useConfirm } from 'material-ui-confirm';
import { useRouter } from 'next/router';
import Card from '../../components/Card';
import { useFetchServerInfo } from '../../components/utils';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { useFormik } from 'formik';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { DATE_TIME_FORMAT } from '../../components/cs-boost/constants';
import dayjs from 'dayjs';
import { addUpdateServer, deleteServer } from '../../services/boost';
import { EditableServerValues } from '../../components/cs-boost/types';
import { validationSchema } from '../../components/cs-boost/validationSchema';
import { useSnackbar } from '../../components/Snackbar/useSnackbar';

const title = 'Server info';

export default function Page() {
  const router = useRouter();
  const { pid } = router.query;

  const {
    isLoading: infoIsLoading,
    error: infoError,
    players,
    server,
    refetch
  } = useFetchServerInfo(pid as string, router.isReady);
  const confirm = useConfirm();
  const snackbar = useSnackbar();
  const [isEditMode, setIsEditMode] = useState<boolean>(false);

  const formik = useFormik<EditableServerValues>({
    initialValues: {
      serverIP: '',
      boostedUntil: ''
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      addUpdateServer({ ...values, serverId: pid as string })
        .then(() => {
          snackbar.showSuccess('Saved!');
          refetch();
        })
        .catch(() => {
          snackbar.showError('Failed to save');
        });
    }
  });

  useEffect(() => {
    if (infoIsLoading || infoError) return;
    formik.setValues({
      serverIP: server.address,
      boostedUntil: dayjs.unix(Number(server.date_create)).format()
    });
  }, [infoIsLoading, infoError]);

  const openDeleteDialog = () => {
    confirm({ description: `This server will be permanently deleted.` }).then(() => {
      deleteServer(pid as string)
        .then(() => {
          snackbar.showSuccess('Deleted!');
          router.replace('/cs-boost');
        })
        .catch(() => {
          snackbar.showError('Failed to Delete');
        });
    });
  };

  if (infoIsLoading) return <Card title={title}>Loading...</Card>;
  if (infoError) return <Card title={title}>An error has occurred</Card>;

  return (
    <>
      <h2 className='text-3xl pt-10 pb-2'>Server details</h2>

      <div className='flex flex-col lg:flex-row mb-10 justify-between'>
        {!isEditMode ? (
          <ul className='list-none'>
            <li>
              <span className='text-gray-500'>Server name:</span> {server.hostname}
            </li>
            <li>
              <span className='text-gray-500'> IP Address:</span> {server.address}
            </li>
            <li>
              <span className='text-gray-500'> Map:</span> {server.map}
            </li>
            <li>
              <span className='text-gray-500'>Players:</span> {server.players}/{server.maxplayers}
            </li>
            <li>
              <span className='text-gray-500'>
                Added at: {dayjs.unix(Number(server.date_create)).format(DATE_TIME_FORMAT)}
              </span>
            </li>
            <li>
              <span className='text-gray-500'>
                Boosted until:{' '}
                {server.date_end === '0'
                  ? 'Permanently'
                  : dayjs.unix(Number(server.date_end)).format(DATE_TIME_FORMAT)}
              </span>
            </li>
          </ul>
        ) : null}
        {isEditMode ? (
          <form className='max-w-sm' onSubmit={formik.handleSubmit}>
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
                Save
              </Button>
            </Stack>
          </form>
        ) : null}

        <div className='flex flex-col space-y-4'>
          <button
            type='button'
            className='inline-block px-6 py-2 border-2 border-red-600 text-red-600 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out'
            onClick={openDeleteDialog}
          >
            Remove server from boost
          </button>
          <button
            type='button'
            className='inline-block px-6 py-2 border-2 border-blue-600 text-blue-600 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out'
            onClick={() => setIsEditMode(!isEditMode)}
          >
            {isEditMode ? 'Exit edit mode' : 'Edit'}
          </button>
        </div>
      </div>
    </>
  );
}
