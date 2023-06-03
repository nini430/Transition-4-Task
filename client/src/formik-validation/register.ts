import { ObjectSchema, object, string, ref } from 'yup';

export interface UserInitialState {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const initialValues: UserInitialState = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const validationSchema: ObjectSchema<UserInitialState> = object({
  firstName: string().required('First Name is required'),
  lastName: string().required('Last name is required'),
  email: string()
    .required('Email is required field')
    .matches(
      /^[\w.-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      'Please provide valid E-mail address'
    ),
  password: string().required('Password is required'),
  confirmPassword: string()
    .required('Confirm Password is required')
    .oneOf([ref('password')], 'Passwords must match'),
});

export { initialValues, validationSchema };
