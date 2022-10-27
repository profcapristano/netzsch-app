import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../services/counter/counterSlice';
import taskReducer from '../services/task/counterSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    task: taskReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
