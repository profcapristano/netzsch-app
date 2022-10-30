import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, IconButton, TablePagination } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate  } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import { useAppSelector, useAppDispatch } from '../../../app/hooks';
import { TaskStatus, ITaskStatusList } from '../../../models/TaskStatus';
import {
  getlAllAsync,
  deleteAsync,
  allTasks,
  getAllStatusTaskService,
  setParam,
} from '../../../services/task/taskSlice';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export default function TaskList() {

  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);
  const [idDelete, setIdDelete] = React.useState<number | undefined>();//
  const theme = useTheme();
  const allTasksV = useAppSelector(allTasks);
  const getAllStatusTaskServiceV = useAppSelector(getAllStatusTaskService);
  const dispatch = useAppDispatch();

  if(getAllStatusTaskServiceV === 'idle')
    dispatch(getlAllAsync())

  const onClickDeleteDialog = (id?: number) => {
    setIdDelete(id || 0)
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

  const onClickYesDelete = () => {
    dispatch(deleteAsync(idDelete))
    handleCloseDeleteDialog();
  }

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const getTaskStatusDescription = (taskStatus: TaskStatus) => {
    const iTaskStatus = ITaskStatusList.find((element) => {
      if(element.value === taskStatus)
      return element;
    })
    if(iTaskStatus) {
      return iTaskStatus.label
    }
    return ""
  }

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell width="20%">Nome</StyledTableCell>
              <StyledTableCell width="10%">Status</StyledTableCell>
              <StyledTableCell width="40%">Descrição</StyledTableCell>
              <StyledTableCell width="10%">Criação</StyledTableCell>
              <StyledTableCell width="10%">Alteração</StyledTableCell>
              <StyledTableCell width="10%" align="center">Ações</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allTasksV.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
              <StyledTableRow key={row.id}>
                <StyledTableCell key={`name_${row.id}`} component="th" scope="row">
                  {row.name}
                </StyledTableCell>
                <StyledTableCell key={`status_${row.id}`}>{getTaskStatusDescription(row.status)}</StyledTableCell>
                <StyledTableCell key={`description_${row.id}`}>{row.description}</StyledTableCell>
                <StyledTableCell key={`createdAt_${row.id}`}>{row.createdAt}</StyledTableCell>
                <StyledTableCell key={`updatedAt_${row.id}`}>{row.updatedAt}</StyledTableCell>
                <StyledTableCell key={`actions_${row.id}`} align="center">
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <IconButton aria-label="delete" onClick={() => {onClickDeleteDialog(row.id)}}>
                        <DeleteIcon />
                      </IconButton>
                    </Grid>
                    <Grid item xs={6}>
                      <IconButton aria-label="edit" onClick={() => {dispatch(setParam(row)); navigate(`/todo_edit/${row.id}`);}} >
                        <EditIcon />
                      </IconButton>
                    </Grid>
                  </Grid>
                </StyledTableCell>
              </StyledTableRow>
            ))}
            {allTasksV.length === 0 && (
              <StyledTableRow>
                <StyledTableCell colSpan={6} align="center">Nenhuma Tarefa Cadastrada</StyledTableCell>
              </StyledTableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={allTasksV.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      <Dialog
        open={openDeleteDialog}
        onClose={handleCloseDeleteDialog}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"Deseja realmente excluir?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Ao excluir o registro essas informações serão perdidas permanentemente.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleCloseDeleteDialog}>
            Não
          </Button>
          <Button onClick={onClickYesDelete} autoFocus>
            Sim
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )

}
