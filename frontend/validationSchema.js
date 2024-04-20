import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().min(8, 'Must be at least 8 characters').required('Required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Required'),
  subject: Yup.string().min(3, 'Must be at least 3 characters').required('Required'),
  recipients: Yup.string().required('Required'),
  body: Yup.string().min(3, 'Must be at least 3 characters').required('Required'),
});
