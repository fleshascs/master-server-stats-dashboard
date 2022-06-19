import * as yup from 'yup';

export const validationSchema = yup.object({
  serverIP: yup.string().required('ServerIP:Port is required'),
  boostedUntil: yup.string().required('Boost end date is required')
});
