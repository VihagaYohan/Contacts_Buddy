import * as Yup from 'yup';

// contact form validation
export let contactSchema = Yup.object().shape({
  firstName: Yup.string()
    .label('First name')
    .min(2, 'First name should not be less than 2 characters')
    .required(),
  lastName: Yup.string().label('Last name'),
  company: Yup.string().label('Company'),
  phone: Yup.number()
    .min(10, 'Contact number should be at least 10 characters long')
    .max(10, 'Contact number should not be more than 10 characters long')
    .label('Phone number'),
  address: Yup.string().label('Address'),
});
