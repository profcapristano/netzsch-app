import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { TaskList } from '../../models/Task';
import { getAll } from './taskAPI';

export interface TaskState {
  all: TaskList;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

//TODO: criar um status pra cada operação
const initialState: TaskState = {
  all: [],
  status: 'idle',
};

export const getlAllAsync = createAsyncThunk(
  'task/getAll',
  async () => {
    const response = await getAll();
    return response.data;
  }
);

export const taskSlice = createSlice({
  name: 'task',
  initialState,
  
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(getlAllAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getlAllAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.all = action.payload;
      })
      .addCase(getlAllAsync.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const allTasks = (state: RootState) => state.task.all;
export const statusTaskService = (state: RootState) => state.task.status;

export default taskSlice.reducer;
