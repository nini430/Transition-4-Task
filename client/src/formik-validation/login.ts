import { object, ObjectSchema, string } from 'yup';

interface UserInitialState {
  email: string;
  password: string;
}

const initialValues: UserInitialState = {
  email: '',
  password: '',
};

const validationSchema: ObjectSchema<UserInitialState> = object({
  email: string()
    .required('Email is required field')
    .matches(
      /^[\w.-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      'Please provide valid E-mail address'
    ),
  password: string().required('Password is required'),
});

export { initialValues, validationSchema };
