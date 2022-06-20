import * as yup from 'yup';

export const validationSchema = yup.object({
  serverIP: yup
    .string()
    .test('is-valid-ip-port', 'invalid Server IP:PORT', function (value) {
      if (!value) return false;
      const [ip, port] = value.split(':');
      if (!/^\d+$/.test(port)) return false;
      if (!ip) return false;
      return true;
    })
    .required('ServerIP:Port is required'),
  boostedUntil: yup.string().required('Boost end date is required')
});
