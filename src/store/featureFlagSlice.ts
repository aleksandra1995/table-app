import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface FeatureFlagsState {
  disablePage1: boolean;
  disableSlider: boolean;
}


const initialState: FeatureFlagsState = {
  disablePage1: JSON.parse(localStorage.getItem('disablePage1') || 'false'),
  disableSlider: JSON.parse(localStorage.getItem('disableSlider') || 'false'),
};

const featureFlagsSlice = createSlice({
  name: 'featureFlags',
  initialState,
  reducers: {
    setDisablePage1(state, action: PayloadAction<boolean>) {
      state.disablePage1 = action.payload;
      localStorage.setItem('disablePage1', JSON.stringify(action.payload));
    },
    setDisableSlider(state, action: PayloadAction<boolean>) {
      state.disableSlider = action.payload;
      localStorage.setItem('disableSlider', JSON.stringify(action.payload));
    },
  },
});

export const { setDisablePage1, setDisableSlider } = featureFlagsSlice.actions;
export default featureFlagsSlice.reducer;
