import {GridColDef,GridValueGetterParams,GridRenderCellParams} from '@mui/x-data-grid';
import moment from 'moment';

const columns: GridColDef[] = [
    { field: '_id', headerName: 'ID', width: 200 },
    {
      field: 'firstName',
      headerName: 'First name',
      width: 150,
    },
    {
      field: 'lastName',
      headerName: 'Last name',
      width: 150,
    },
    {
      field: 'fullName',
      headerName: 'Full name',
      description: 'This column has a value getter and is not sortable.',
      width: 160,
      valueGetter: (params: GridValueGetterParams) =>
        `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    },
    {
        field:'email',
        headerName:'E-mail',
        width:100
    },
    {
        field:'createdAt',
        headerName:'Registration Time',
        width:200,
        valueGetter:(params:GridValueGetterParams)=>moment(params.row.createdAt).format('LLL')
    },
    {
        field:'lastLoginTime',
        headerName:'Last Login Time',
        width:200,
        valueGetter:(params:GridValueGetterParams)=>moment(params.row.lastLoginTime).format('LLL')
    },
    {
        field:'status',
        headerName:'Status',
        width:120,
        renderCell:(params:GridRenderCellParams)=><p className={params.row.status==='active'?'success':'error'}>{params.row.status}</p>
    }
  ];

  export default columns;