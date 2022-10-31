import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, MenuItem, Stack } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import CancelIcon from '@mui/icons-material/Cancel';
import { ITaskStatusList } from '../../../models/TaskStatus';
import { ITask, Task } from '../../../models/Task';
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

  const [currentTask, setCurrentTask] = useState<ITask>(new Task());

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
        setCurrentTask(paramTaskV)
      }
    }
  }, [paramTaskV]);

  const handleNameChange = (event: React.ChangeEvent<any>) => {
    setCurrentTask({...currentTask, name: event.target.value})
    setHasNameError(false);
    setHelperNameError("")
  };

  const handleStatusChange = (event: React.ChangeEvent<any>) => {
    setCurrentTask({...currentTask, status: event.target.value})
  };

  const handleDescricaoChange = (event: React.ChangeEvent<any>) => {
    setCurrentTask({...currentTask, description: event.target.value})
  };

  const onClickCancel = () => {
    handleOpenCancelDialog();
  }

  const onClickYesCancel = () => {
    handleCloseCancelDialog();
    navigate('/');
  }

  const isValidFields = (): boolean => {
    if(!currentTask.name || currentTask.name === "") {
      setHasNameError(true);
      setHelperNameError("Campo obrigatório");
      return false;
    }
    return true;
  }

  const handleSubmit = (event: React.ChangeEvent<any>) => {
    event.preventDefault();
    if(isValidFields()) {
      if(!currentTask.id) {
        currentTask.createdAt = new Date().toLocaleDateString()
        dispatch(addAsync(currentTask))
      } else {
        currentTask.updatedAt = new Date().toLocaleDateString()
        dispatch(updateAsync(currentTask))
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
      <Grid container rowSpacing={1} columnSpacing={2} sx={{ maxWidth: 1200 }}>
        <Grid item={true} xs={12} sm={8}>
          <TextField
            id="name"
            label="Nome"
            required
            error={hasNameError}
            helperText={helperNameError}
            value={currentTask.name}
            onChange={handleNameChange}
          />
        </Grid>
        <Grid item={true} xs={12} sm={4}>
          <TextField
            required
            id="status"
            select
            label="Status"
            value={currentTask.status}
            onChange={handleStatusChange}
          >
            {ITaskStatusList.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item={true} xs={12}>
          <TextField
            id="description"
            label="Descrição"
            value={currentTask.description}
            onChange={handleDescricaoChange}
            multiline
            rows={4}
          />
        </Grid>
      </Grid>
      <Stack ml={1} mt={1} spacing={2} direction="row">
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
