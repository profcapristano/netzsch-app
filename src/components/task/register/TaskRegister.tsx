import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, MenuItem, Stack } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import CancelIcon from '@mui/icons-material/Cancel';
import { ITaskStatusList, TaskStatus } from '../../../models/TaskStatus';
import { Task } from '../../../models/Task';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { useNavigate  } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../../app/hooks';
import {
  addAsync,
  updateAsync,
  paramTask,
} from '../../../services/task/taskSlice';

export default function TaskRegister() {

  const params = useParams();
  const navigate = useNavigate();

  const [id, setId] = useState<number | undefined>();
  const [name, setName] = useState('');
  const [status, setStatus] = useState(TaskStatus.NOVA);
  const [description, setDescription] = useState<string | undefined>();
  const [createdAt, setCreatedAt] = useState<string | undefined>();

  const [hasNameError, setHasNameError] = useState(false); 
  const [helperNameError, setHelperNameError] = useState(""); 

  const dispatch = useAppDispatch();
  const paramTaskV = useAppSelector(paramTask);

  const [openCancelDialog, setOpenCancelDialog] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleOpenCancelDialog = () => {
    setOpenCancelDialog(true);
  };

  const handleCloseCancelDialog = () => {
    setOpenCancelDialog(false);
  };

  useEffect(() => {
    if(!!params.id) {
      const paramId = +params.id
      if(paramTaskV.id === paramId) {
        setId(paramTaskV.id)
        setName(paramTaskV.name)
        setStatus(paramTaskV.status)
        setDescription(paramTaskV.description)
        setCreatedAt(paramTaskV.createdAt)
      }
    }
  }, [paramTaskV]);

  const handleNameChange = (event: React.ChangeEvent<any>) => {
    setName(event.target.value);
    setHasNameError(false);
    setHelperNameError("")
  };

  const handleStatusChange = (event: React.ChangeEvent<any>) => {
    setStatus(event.target.value);
  };

  const handleDescricaoChange = (event: React.ChangeEvent<any>) => {
    setDescription(event.target.value);
  };

  const onClickCancel = () => {
    handleOpenCancelDialog();
  }

  const onClickYesCancel = () => {
    handleCloseCancelDialog();
    navigate('/');
  }

  const isValidFields = (): boolean => {
    if(!name || name === "") {
      setHasNameError(true);
      setHelperNameError("Campo obrigatório");
      return false;
    }
    return true;
  }

  const handleSubmit = (event: React.ChangeEvent<any>) => {
    event.preventDefault();
    const task: Task = {id, name, status, description, createdAt}
    if(isValidFields()) {
      if(!task.id) {
        task.createdAt = new Date().toLocaleDateString()
        console.log("salvar")
        dispatch(addAsync(task))
      } else {
        task.updatedAt = new Date().toLocaleDateString()
        dispatch(updateAsync(task))
      }
      navigate('/');
    }
  };

  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '100%' },
      }}
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <TextField
        id="name"
        label="Nome"
        required
        error={hasNameError}
        helperText={helperNameError}
        value={name}
        onChange={handleNameChange}
      />
      <TextField
        required
        id="status"
        select
        label="Status"
        value={status}
        onChange={handleStatusChange}
      >
        {ITaskStatusList.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        id="description"
        label="Descrição"
        value={description}
        onChange={handleDescricaoChange}
        multiline
        rows={4}
      />
      <Stack ml={1} direction="row" spacing={2}>
        <Button onClick={onClickCancel} variant="outlined" startIcon={<CancelIcon />}>
          Cancelar
        </Button>
        <Button type="submit" variant="contained" endIcon={<SendIcon />}>
          Salvar
        </Button>
      </Stack>
      <Dialog
        fullScreen={fullScreen}
        open={openCancelDialog}
        onClose={handleCloseCancelDialog}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"Deseja realmente cancelar?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Ao cancelar suas alterações serão perdidas.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleCloseCancelDialog}>
            Não
          </Button>
          <Button onClick={onClickYesCancel} autoFocus>
            Sim
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )

}
