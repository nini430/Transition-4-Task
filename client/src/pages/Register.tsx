import {useEffect} from 'react'
import { Typography, TextField, FormGroup } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import {toast,Toaster} from 'react-hot-toast'
import { useFormik } from 'formik';

import { initialValues, validationSchema } from '../formik-validation/register';
import { useAppDispatch, useAppSelector } from '../store/store';
import { clearErrors, registerUser } from '../store/userReducer';

const Register = () => {
  const dispatch=useAppDispatch();
  const navigate=useNavigate();
  const {user}=useAppSelector(state=>state.user)
  const { handleSubmit, dirty, getFieldProps, touched, errors } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      dispatch(registerUser({input:values,onSuccess:()=>{
        toast('User registered succesfully!',{duration:2000});
        setTimeout(()=>{
          navigate('/login')
        },2000)
      }}))
    },
  });
  useEffect(() => {
    if(user || localStorage.getItem('user')) {
      navigate('/');
    }
    
  }, [user,navigate])
  useEffect(()=>{
    dispatch(clearErrors())
  },[dispatch]);
  
  const {registerLoading}=useAppSelector(state=>state.user)
  return (
    <Container>
      <Toaster/>
      <Form >
        <Typography variant="h4">Sign Up</Typography>
        <FormGroup sx={{ width: '100%' }}>
          <TextField
            {...getFieldProps('firstName')}
            label="First Name"
            fullWidth
          />
          {errors.firstName && touched.firstName && (
            <ErrorMessage>{errors.firstName}</ErrorMessage>
          )}
        </FormGroup>
        <FormGroup sx={{ width: '100%' }}>
          <TextField  {...getFieldProps('lastName')} label="Last Name" fullWidth />
          {errors.lastName && touched.lastName && (
            <ErrorMessage>{errors.lastName}</ErrorMessage>
          )}
        </FormGroup>
        <FormGroup sx={{ width: '100%' }}>
          <TextField {...getFieldProps('email')} label="E-mail" fullWidth />
          {errors.email && touched.email && (
            <ErrorMessage>{errors.email}</ErrorMessage>
          )}
        </FormGroup>
        <FormGroup sx={{ width: '100%' }}>
          <TextField type="password" {...getFieldProps('password')} label="Password" fullWidth />
          {errors.password && touched.password && (
            <ErrorMessage>{errors.password}</ErrorMessage>
          )}
        </FormGroup>
        <FormGroup sx={{ width: '100%' }}>
          <TextField type="password" {...getFieldProps('confirmPassword')} label="Confirm Password" fullWidth />
          {errors.confirmPassword && touched.confirmPassword && (
            <ErrorMessage>{errors.confirmPassword}</ErrorMessage>
          )}
        </FormGroup>

        <LoadingButton type='submit' onClick={(e)=>{
            e.preventDefault();
            handleSubmit()
        }} loading={registerLoading} disabled={!dirty || Object.values(errors).length>0} variant="contained" fullWidth>
          Sign Up
        </LoadingButton>
        <MetaInfo>
          Already have an account? <Link to="/login">Login</Link>{' '}
        </MetaInfo>
      </Form>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Form = styled.form`
  background: white;
  padding: 20px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  min-width: 400px;
  width: 400px;
`;

const MetaInfo = styled.span`
  color: gray;
  font-size: 14px;
`;

const ErrorMessage = styled.span`
  color: red;
  font-size: 14px;
  margin-top: 10px;
`;

export default Register;
