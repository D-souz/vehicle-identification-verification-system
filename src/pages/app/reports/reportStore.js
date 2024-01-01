import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// initiating state
const initialState = {
    allStats: [],
    enrolleeStats: [],
    isError :false,
    isLoading :false,
    isSuccess :false,
    message :"",
}

// // ROUTES API
const API_URL = "http://localhost:3000";

// grant access in
export const grantAccessIn = createAsyncThunk(
    "enrollees/grantAccessIn",
    async ({id}, thunkAPI) =>{
  
        try {
          const token = thunkAPI.getState().auth.agent.token;
          const config = {
              headers: {
                  'Authorization': `Bearer ${token}`
              }
          };
            const response = await axios.post(API_URL + `/api/access/grant-in/${id}`, {id} ,config)
  
            if (!response.data) {
                toast.error("Access not granted!", {
                    position: "top-right",
                    autoClose: 1500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                  });
            }
            // console.log(response.data);
            return response.data;
  
        } catch (error) {
            console.log(error);
            const message =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
              error.message ||
              error.toString();
          return thunkAPI.rejectWithValue(message);
        }
    }
  );

// deny access
export const denyAcess = createAsyncThunk(
  "enrollees/denyAcess",
  async ({id}, thunkAPI) =>{

      try {
        const token = thunkAPI.getState().auth.agent.token;
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        };
          const response = await axios.post(API_URL + `/api/access/deny-access/${id}`, {id} ,config)

          if (!response.data) {
              toast.error("Access not granted!", {
                  position: "top-right",
                  autoClose: 1500,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "light",
                });
          }
          // console.log(response.data);
          return response.data;

      } catch (error) {
          console.log(error);
          const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
            error.message ||
            error.toString();
        return thunkAPI.rejectWithValue(message);
      }
  }
);

// grant access out
export const grantAccessOut = createAsyncThunk(
  "enrollees/grantAccessOut",
  async ({id}, thunkAPI) =>{

      try {
        const token = thunkAPI.getState().auth.agent.token;
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        };
          const response = await axios.post(API_URL + `/api/access/grant-out/${id}`, {id} ,config)

          if (!response.data) {
              toast.error("Access not granted!", {
                  position: "top-right",
                  autoClose: 1500,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "light",
                });
          }
          // console.log(response.data);
          return response.data;

      } catch (error) {
          console.log(error);
          const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
            error.message ||
            error.toString();
        return thunkAPI.rejectWithValue(message);
      }
  }
);

// get all access statistics
export const getStatistics = createAsyncThunk(
    "fetch/statistics",
    async (_, thunkAPI) => {
      try {
        const token = thunkAPI.getState().auth.agent.token;
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        };
        const response = await axios.get(API_URL + "/api/access/stats", config)
        // console.log(response.data);
        return response.data;
  
    } catch (error) {
        console.log(error);
        const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
          error.message ||
          error.toString();
      return thunkAPI.rejectWithValue(message);
    }
    }
  );

// get enrollee statistics
export const getEnrolleeStats = createAsyncThunk(
  "fetch/getEnrolleeStats",
  async ({id}, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.agent.token;
      const config = {
          headers: {
              'Authorization': `Bearer ${token}`
          }
      };
      const response = await axios.get(API_URL + `/api/access/stats/${id}`, config)
      // console.log(response.data);
      return response.data;

  } catch (error) {
      console.log(error);
      const message =
      (error.response &&
        error.response.data &&
        error.response.data.message) ||
        error.message ||
        error.toString();
    return thunkAPI.rejectWithValue(message);
  }
  }
);


export const ReportSlice = createSlice({
    name: 'stats',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
       builder
      .addCase(getStatistics.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getStatistics.fulfilled, (state, action) => {
          state.isSuccess = true;
          state.isLoading = false;
          state.allStats = action.payload;
      })
      .addCase(getStatistics.rejected, (state, action) => {
          state.isSuccess = false;
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
      })
      .addCase(grantAccessIn.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(grantAccessIn.fulfilled, (state, action) => {
          state.isSuccess = true;
          state.isLoading = false;
          state.message = action.payload;
      })
      .addCase(grantAccessIn.rejected, (state, action) => {
          state.isSuccess = false;
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
      })
      .addCase(denyAcess.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(denyAcess.fulfilled, (state, action) => {
          state.isSuccess = true;
          state.isLoading = false;
          state.message = action.payload;
      })
      .addCase(denyAcess.rejected, (state, action) => {
          state.isSuccess = false;
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
      })
      .addCase(grantAccessOut.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(grantAccessOut.fulfilled, (state, action) => {
          state.isSuccess = true;
          state.isLoading = false;
          state.message = action.payload;
      })
      .addCase(grantAccessOut.rejected, (state, action) => {
          state.isSuccess = false;
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
      })
      .addCase(getEnrolleeStats.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getEnrolleeStats.fulfilled, (state, action) => {
          state.isSuccess = true;
          state.isLoading = false;
          state.enrolleeStats = action.payload;
      })
      .addCase(getEnrolleeStats.rejected, (state, action) => {
          state.isSuccess = false;
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
      })
    }
})

// export const { reset } = ReportSlice.actions;
export default ReportSlice.reducer;
