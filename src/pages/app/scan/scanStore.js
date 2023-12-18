import { createSlice } from '@reduxjs/toolkit';

// intitial scanning state
const initialState = {
    scanResult: null,
}
const qrCodeScannerSlice = createSlice({
  name: 'qrCodeScanner',
  initialState,
  reducers: {
    saveScanResult: (state, action) => {
      state.scanResult = action.payload;
    },
  },
});

export const { saveScanResult } = qrCodeScannerSlice.actions;
export default qrCodeScannerSlice.reducer;
