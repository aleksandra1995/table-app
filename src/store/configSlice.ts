import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';


export interface ConfigState {
  value: number; 
}


const initialState: ConfigState = {
  value: Number(localStorage.getItem('tableConfigValue') || 5), 
};

const configSlice = createSlice({
  name: 'config',
  initialState,
  reducers: {
    setValue(state, action: PayloadAction<number>) {
      state.value = action.payload;
      localStorage.setItem('tableConfigValue', action.payload.toString());
    },
  },
});

export const { setValue } = configSlice.actions;
export default configSlice.reducer;
