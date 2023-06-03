import {useEffect} from 'react'
import { Typography, TextField, FormGroup } from '@mui/material'
import {LoadingButton} from '@mui/lab';
import {Link, useNavigate} from 'react-router-dom'
import styled from 'styled-components'
import {useFormik} from 'formik'
import { initialValues, validationSchema } from '../formik-validation/login';
import { useAppDispatch,useAppSelector} from '../store/store';
import { clearErrors, loginUser } from '../store/userReducer';


const Login = () => {
    const dispatch=useAppDispatch();
    const navigate=useNavigate();
    const {loginLoading,user,errors:loginErrors}=useAppSelector(state=>state.user)
    const {errors,dirty,handleSubmit,getFieldProps,touched}=useFormik({
        initialValues,
        validationSchema,
        onSubmit:(values)=>{
           dispatch(loginUser({input:values,onSuccess:()=>{
            navigate('/')
           }}))
        }
    })
    useEffect(()=>{
      if(user || localStorage.getItem('user')) {
        navigate('/')
      }
    },[user,navigate])
    useEffect(()=>{
      dispatch(clearErrors())
    },[dispatch]);
  return (
    <Container>
        <Form>
        <Typography variant='h4'>Login</Typography>
        <FormGroup sx={{width:'100%'}}>
        <TextField {...getFieldProps('email')} label='E-mail' fullWidth/>
        {errors.email && touched.email && <ErrorMessage>{errors.email}</ErrorMessage>}
        </FormGroup>
        <FormGroup sx={{width:'100%'}}>
        <TextField type="password" {...getFieldProps('password')} label='Password' fullWidth/>
        {errors.password && touched.password && <ErrorMessage>{errors.password}</ErrorMessage>}
        </FormGroup>
        {Object.values(loginErrors).length ? <ErrorMessage>{loginErrors.error}</ErrorMessage>:""}
        <LoadingButton loading={loginLoading} onClick={(e)=>{
                e.preventDefault();
                handleSubmit();
        }}   type="submit" disabled={!dirty && Object.values(errors).length>0} variant='contained' fullWidth>Sign In</LoadingButton>
        <MetaInfo>Don't have an account? <Link to='/register'>Sign Up</Link> </MetaInfo>
        </Form>
    </Container>
  )
}


const Container=styled.div`
    display:flex;
    justify-content:center;
    align-items:center;
    height:100vh;
`

const Form=styled.form`
    background:white;
    padding:20px;
    border-radius:10px;
    display:flex;
    flex-direction: column;
    align-items: center;
    gap:20px;
    min-width:400px;
    width:400px;
`

const MetaInfo=styled.span`
    color:gray;
    font-size:14px;
`

const ErrorMessage = styled.span`
  color: red;
  font-size: 14px;
  margin-top: 10px;
`;


export default Login