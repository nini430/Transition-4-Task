import {Card,CardContent,Typography,Button} from '@mui/material'
import { useAppDispatch, useAppSelector } from '../store/store'
import { logoutUser } from '../store/userReducer';
import { useNavigate } from 'react-router-dom';

const ProfileCard = () => {
  const navigate=useNavigate();
    const dispatch=useAppDispatch();
    const user=useAppSelector(state=>state.user.user) || JSON.parse(localStorage.getItem('user') as string); 
  return (
    <Card sx={{alignSelf:'flex-start',paddingLeft:'20px'}}>
        <CardContent sx={{display:'flex',flexDirection:'column',gap:'5px'}}>
            <Typography>{user?.firstName} {user?.lastName}</Typography>
            <Button onClick={()=>{
              dispatch(logoutUser());
              navigate('/login')
            }} variant='contained'>Log Out</Button>
        </CardContent>
    </Card>
  )
}

export default ProfileCard