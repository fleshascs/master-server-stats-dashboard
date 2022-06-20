import { useRef, useEffect, FC } from 'react';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { Form, Formik } from 'formik';
import { validationSchema } from '../../components/cs-boost/validationSchema';
import FormControlLabel from '@mui/material/FormControlLabel';
import { CheckboxField } from '../Checkbox';
import { EditableServerValues } from './types';
import dayjs, { Dayjs } from 'dayjs';

const defaultValues = {
  serverIP: '',
  boostedUntil: new Date().getTime(),
  isPerm: false
};

export const AddUpdateServerForm: FC<{
  onSubmit: (values: EditableServerValues) => void;
  initialValues?: EditableServerValues;
}> = ({ onSubmit, initialValues }) => {
  const formRef = useRef(null);

  useEffect(() => {
    if (!initialValues) return;
    formRef.current.setValues(initialValues);
  }, [initialValues]);

  return (
    <Formik
      innerRef={formRef}
      initialValues={initialValues ?? defaultValues}
      validationSchema={validationSchema}
      onSubmit={(values, actions) => {
        onSubmit(values);
        actions.setSubmitting(false);
      }}
    >
      {({ values, touched, setFieldValue, errors, handleChange, isSubmitting }) => (
        <Form>
          <Stack spacing={2} direction='column'>
            <TextField
              fullWidth
              name='serverIP'
              label='Server IP:PORT'
              value={values.serverIP}
              onChange={handleChange}
              error={touched.serverIP && Boolean(errors.serverIP)}
              helperText={touched.serverIP && errors.serverIP}
            />
            <FormControlLabel
              control={<CheckboxField name='isPerm' />}
              value={values.isPerm}
              label='Boost permanently'
            />
            {!values.isPerm ? (
              <DateTimePicker
                label='Boost end date'
                value={values.boostedUntil}
                onChange={(value) => {
                  setFieldValue('boostedUntil', (value as unknown as Dayjs).format());
                }}
                renderInput={(params) => (
                  <TextField
                    fullWidth
                    {...params}
                    error={touched.boostedUntil && Boolean(errors.boostedUntil)}
                    name='boostedUntil'
                    helperText={
                      (touched.boostedUntil && errors.boostedUntil) ||
                      'Days left from today: ' + dayjs(values.boostedUntil).diff(dayjs(), 'day')
                    }
                  />
                )}
              />
            ) : null}
            <Button
              fullWidth
              color='primary'
              variant='outlined'
              type='submit'
              disabled={isSubmitting}
            >
              Save
            </Button>
          </Stack>
        </Form>
      )}
    </Formik>
  );
};
