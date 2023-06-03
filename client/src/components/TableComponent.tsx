import {DataGrid} from '@mui/x-data-grid';
import {Toolbar,Button} from '@mui/material'
import {Delete,Undo} from '@mui/icons-material'
import styled from 'styled-components'
import columns from '../utils/columns';
import { useAppDispatch, useAppSelector } from '../store/store';
import { useState } from 'react';
import { changeStatus } from '../store/userReducer';

const TableComponent = () => {
  const dispatch=useAppDispatch();
    const {allUsers}=useAppSelector(state=>state.user);
    const [selectedUsers,setSelectedUsers]=useState([]);

    const changeStatusHandler=(status:string)=>{
        dispatch(changeStatus({ids:selectedUsers,status}));
    }
  return (
    <Container>
        <Toolbar sx={{alignSelf:'end',gap:'10px'}}>
        <Button onClick={()=>changeStatusHandler('blocked')} variant='contained' color='error'>Block</Button>
        <Button onClick={()=>changeStatusHandler('active')}><Undo/></Button>
        <Button onClick={()=>changeStatusHandler('deleted')}><Delete/></Button>
        </Toolbar>
        <div className="table-wrapper">
        <DataGrid onRowSelectionModelChange={(selects)=>setSelectedUsers(selects as any)}  checkboxSelection getRowId={item=>item._id} columns={columns} rows={allUsers}/>
        </div>    
    </Container>
  )
}


const Container=styled.div`
    display:flex;
    flex-direction: column;

`

export default TableComponent