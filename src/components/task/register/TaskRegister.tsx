import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button, MenuItem, Stack } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import CancelIcon from '@mui/icons-material/Cancel';
import { ITaskStatusList, TaskStatus } from '../../../models/TaskStatus';


export default function TaskRegister() {

  const [id, setId] = useState(0);
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [status, setStatus] = useState('NOVA');

  const handleNomeChange = (event: React.ChangeEvent<any>) => {
    setNome(event.target.value);
    console.log(event.target.value)
  };

  const handleStatusChange = (event: React.ChangeEvent<any>) => {
    setStatus(event.target.value);
    console.log(event.target.value)
  };

  const handleDescricaoChange = (event: React.ChangeEvent<any>) => {
    setDescricao(event.target.value);
    console.log(event.target.value)
  };

  const handleSubmit = (event: React.ChangeEvent<any>) => {
    event.preventDefault();

    console.log('id 👉️', id);
    console.log('nome 👉️', nome);
    console.log('status 👉️', status);
    console.log('descricao 👉️', descricao);
  };

  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '50ch' },
      }}
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
    >
        <TextField
          required
          id="nome"
          label="Nome"
          value={nome}
          onChange={handleNomeChange}
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
          id="descricao"
          label="Descrição"
          value={descricao}
          onChange={handleDescricaoChange}
          multiline
          rows={4}
        />
        <Stack ml={1} direction="row" spacing={2}>
          <Button variant="outlined" startIcon={<CancelIcon />}>
            Cancelar
          </Button>
          <Button type="submit"variant="contained" endIcon={<SendIcon />}>
            Salvar
          </Button>
        </Stack>
    </Box>
  )

}
