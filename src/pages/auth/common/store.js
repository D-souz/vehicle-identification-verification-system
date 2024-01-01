import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axios from "axios";


// getting agent from local storage
const agent = JSON.parse(localStorage.getItem('agent')); 

// the initialState
const initialState = {
  agent: agent ? agent : null,
  isLoading: false,
  isError: false,
  isSuccess: false, // for monitoring the registration process.
  message: "",
  isActive: agent ? true : false,
}

// ROUTES API
const API_URL = "http://localhost:3000";

// register agent
export const registerAgent = createAsyncThunk(
  "agent/register", 
  async ({ name, email, password, role, telephone }, thunkAPI) => {
    try {
      const response = await axios.post(API_URL + "/api/agent/register", {
        name,
        email, 
        password, 
        role, 
        telephone
    }, 
    {
        headers: {
            'Content-Type': 'application/json',
        }
    });

    // console.log(response.data);

    if (response.data) {
      // save the user into local storage
      localStorage.setItem('agent', JSON.stringify(response.data))
      
      // toast.success("Agent registered successfully", {
      //         position: "top-right",
      //         autoClose: 1500,
      //         hideProgressBar: false,
      //         closeOnClick: true,
      //         pauseOnHover: true,
      //         draggable: true,
      //         progress: undefined,
      //         theme: "light",
      // });
    } 
    } catch (error) {
      console.log(error);

       // capturing the error message from the server
       const message = (error.response && error.response.data && error.response.data.message ) ||
       error.message || error.toString();

       return thunkAPI.rejectWithValue(message);
    }
}
);

// login an agent
export const loginAgent = createAsyncThunk(
  "agent/login",
  async ({ email, password }, thunkAPI) => {
    try {
      const response = await axios.post(API_URL + "/api/agent/login", {
        email,
        password,
      },
      {
        headers: {
            'Content-Type': 'application/json',
        }
    })
      // Saving the Agent into local storage
        if (response.data) {
          localStorage.setItem("agent", JSON.stringify(response.data));
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

// logging out the Agent
export const logoutAgent = createAsyncThunk(
  "agent/logout",
  async () => {
    localStorage.removeItem("agent");
    toast.success("Agent logged out successfully", {
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
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isError = false
      state.isLoading = false
      state.isSuccess = false
      state.message = ""
  },
  },
  extraReducers: (builder) => {
    builder
    .addCase(registerAgent.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(registerAgent.fulfilled, (state, action) =>{
      state.isSuccess = true;
      state.isLoading = false;
      state.agent = action.payload;
    })
    .addCase(registerAgent.rejected, (state, action) => {
      state.isSuccess = false;
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
      state.agent = null;
    })
    .addCase(loginAgent.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(loginAgent.fulfilled, (state, action) => {
      state.isSuccess = true;
      state.isLoading = false;
      state.agent = action.payload;
    })
    .addCase(loginAgent.rejected, (state, action) => {
      state.isSuccess = false;
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
      state.agent = null;
      // state.isActive = false;
    })
    .addCase(logoutAgent.fulfilled, (state) =>{
      state.agent = null;
      // state.isActive = false;
    })
  }
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
