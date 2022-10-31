import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { ITask, ITaskList } from '../../models/Task';
import { getAll, add, update, deleteTask } from './taskAPI';

export interface TaskState {
  list: ITaskList;
  param: ITask;
  getAllStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: TaskState = {
  list: [],
  param: {} as ITask,
  getAllStatus: 'idle',
};

export const getlAllAsync = createAsyncThunk(
  'task/getAll',
  async () => {
    const response = await getAll();
    return response.data;
  }
);

export const addAsync = createAsyncThunk(
  'task/add',
  async (task: ITask) => {
    const response = await add(task);
    return response.data;
  }
);

export const updateAsync = createAsyncThunk(
  'task/update',
  async (task: ITask) => {
    const response = await update(task);
    return response.data;
  }
);

export const deleteAsync = createAsyncThunk(
  'task/delete',
  async (id: number | undefined) => {
    await deleteTask(id || 0);
    return id;
  }
);

export const taskSlice = createSlice({
  name: 'task',
  initialState,
  
  reducers: {
    setParam: (state, action) => {
      state.param = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      //get list
      .addCase(getlAllAsync.pending, (state) => {
        state.getAllStatus = 'loading';
      })
      .addCase(getlAllAsync.fulfilled, (state, action) => {
        state.getAllStatus = 'succeeded';
        state.list = action.payload;
      })
      .addCase(getlAllAsync.rejected, (state) => {
        state.getAllStatus = 'failed';
      })
      //add
      .addCase(addAsync.fulfilled, (state, action) => {
        state.list = [...state.list, action.payload];
      })
      //update
      .addCase(updateAsync.fulfilled, (state, action) => {
        state.list = state.list.map(task => {
          if(task.id !== action.payload.id)
            return task
          return action.payload
        });
      })
      //delete
      .addCase(deleteAsync.fulfilled, (state, action) => {
        state.list = state.list.filter(task => task.id !== action.payload);
      })

  },
});

export const allTasks = (state: RootState) => state.task.list;
export const paramTask = (state: RootState) => state.task.param;
export const getAllStatusTaskService = (state: RootState) => state.task.getAllStatus;

export const { setParam } = taskSlice.actions;
export default taskSlice.reducer;
