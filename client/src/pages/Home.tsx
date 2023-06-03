import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/store';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Typography } from '@mui/material';
import TableComponent from '../components/TableComponent';
import { getAllUsers, logoutUser } from '../store/userReducer';
import ProfileCard from '../components/ProfileCard';

const Home = () => {
  const dispatch=useAppDispatch();
  const { user,allUsers } = useAppSelector((state) => state.user);
  const navigate = useNavigate();
  useEffect(() => {
    if (!user && !localStorage.getItem('user')) {
      navigate('/login');
    }
  },[user,navigate]);

  useEffect(()=>{
    const currentUser=allUsers?.find(user=>user?._id===JSON.parse(localStorage.getItem('user') as string)?._id);
  if(currentUser?.status==='blocked' || currentUser?.status==='deleted') {
      navigate('/login');
      dispatch(logoutUser());
  }
  },[dispatch,navigate,user?.status,allUsers]);

  useEffect(()=>{
    dispatch(getAllUsers());
  },[dispatch])
  return (
    <Container>
      <ProfileCard/>
      <Typography sx={{textAlign:'center',color:'white'}} variant='h2'>Admin Management System</Typography>
      <TableComponent/>
    </Container>
  )
};


const Container=styled.div`
    display:flex;
    flex-direction: column;
    align-items:center;
    padding-top:60px;
    width:100vw;
    height:100vh;
    overflow:hidden;
`



export default Home;
