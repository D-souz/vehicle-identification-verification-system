import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";


// initial agents state
const initialState = {
    agents: [],
    isError :false,
    isLoading :false,
    isSuccess :false,
    message :"",
    agent: [],
    qrcodeDownloads: null,
    qrcodeScans: null,
    mostScans:[],
}

// ROUTES API
const API_URL = "http://localhost:3000";

// getting all agents from the DB
export const getAgents = createAsyncThunk(
    "agents/getAll",
    async (_, thunkAPI) =>{

        try {
            const token = thunkAPI.getState().auth.agent.token;
            const config = {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            };
            const response = await axios.get(API_URL + "/api/agent/agents", config)
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

// getting a single agent
export const getSingleAgent = createAsyncThunk(
    "agents/getSingleAgent",
    async (id, thunkAPI) =>{

        try {
            const token = thunkAPI.getState().auth.agent.token;
            const config = {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            };
            const response = await axios.get(API_URL + `/api/agent/${id}`, config)

            if (!response.data) {
                toast.error("No such agent found with that id!", {
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
// delete an agent
export const deleteAgent = createAsyncThunk(
    "agent/deleteAgent",
    async (id, thunkAPI) =>{

        try {
            const token = thunkAPI.getState().auth.agent.token;
            const config = {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            };
            const response = await axios.delete(API_URL + `/api/agent/${id}`, config)

            if (!response.data) {
                toast.error("No such agent found with that id!", {
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
            console.log(response.data);
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
)

// updating a single agent
export const updateAgent = createAsyncThunk(
    "agents/updateAgent",
    async ({ id, data }, thunkAPI) =>{

        try {
            const token = thunkAPI.getState().auth.agent.token;
            const {
                name,
                email, 
                role, 
                telephone,
                age,
                gender,
                image
            } = data;

            const updatedData = {
                name,
                email, 
                role, 
                telephone,
                age,
                gender,
                profileImage: image[0] 
            }
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`
                }
            };
            const response = await axios.patch(API_URL + `/api/agent/${id}`, updatedData, config)

            if (!response.data) {
                toast.error("No such agent found with that id!", {
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
            console.log(response.data);
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

// getting number of downloaded qr codes
export const getQrcodeDownloads = createAsyncThunk(
    "agents/getQrcodeDownloads",
    async ({ id, data }, thunkAPI) =>{

        try {
            const token = thunkAPI.getState().auth.agent.token;
            const config = {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            };
            const response = await axios.patch(API_URL + `/api/qrcode-stats/download/${id}`, data, config)

            // if (!response.data) {
            //     toast.error("No such agent found with that id!", {
            //         position: "top-right",
            //         autoClose: 1500,
            //         hideProgressBar: false,
            //         closeOnClick: true,
            //         pauseOnHover: true,
            //         draggable: true,
            //         progress: undefined,
            //         theme: "light",
            //       });
            // }
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

// getting number of scanned qr codes
export const getQrcodeScans = createAsyncThunk(
    "agents/getQrcodeScans",
    async ({ id, data }, thunkAPI) =>{

        try {
            const token = thunkAPI.getState().auth.agent.token;
            const config = {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            };
            const response = await axios.patch(API_URL + `/api/qrcode-stats/scans/${id}`, data, config)

            // if (!response.data) {
            //     toast.error("No such agent found with that id!", {
            //         position: "top-right",
            //         autoClose: 1500,
            //         hideProgressBar: false,
            //         closeOnClick: true,
            //         pauseOnHover: true,
            //         draggable: true,
            //         progress: undefined,
            //         theme: "light",
            //       });
            // }
            console.log(response.data);
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

// getting agents with most scans from db
export const getMostScans = createAsyncThunk(
    "agents/getMostScans",
    async (_, thunkAPI) =>{

        try {
            const token = thunkAPI.getState().auth.agent.token;
            const config = {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            };
            const response = await axios.get(API_URL + "/api/qrcode-stats/agent-scans", config)
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

export const agentSlice = createSlice({
    name: "agents",
    initialState,
    reducers: {
        reset: (state) => {
            state.agents = [],
            state.isError = false,
            state.isLoading = false,
            state.isSuccess = false,
            state.message = ""
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(getAgents.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(getAgents.fulfilled, (state, action) => {
            state.isSuccess = true;
            state.isLoading = false;
            state.agents = action.payload;
        })
        .addCase(getAgents.rejected, (state, action) => {
            state.isSuccess = false;
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        })
        .addCase(getSingleAgent.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(getSingleAgent.fulfilled, (state, action) => {
            state.isSuccess = true;
            state.isLoading = false;
            state.agent = action.payload;
        })
        .addCase(getSingleAgent.rejected, (state, action) => {
            state.isSuccess = false;
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        })
        .addCase(deleteAgent.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(deleteAgent.fulfilled, (state, action) => {
            state.isSuccess = true;
            state.isLoading = false;
            state.agents = state.agents.filter((item) => item._id !== action.payload.id )
        })
        .addCase(deleteAgent.rejected, (state, action) => {
            state.isSuccess = false;
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        })
        .addCase(updateAgent.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(updateAgent.fulfilled, (state, action) => {
            state.isSuccess = true;
            state.isLoading = false;
            state.agent = action.payload;
        })
        .addCase(updateAgent.rejected, (state, action) => {
            state.isSuccess = false;
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        })
        .addCase(getQrcodeDownloads.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(getQrcodeDownloads.fulfilled, (state, action) => {
            state.isSuccess = true;
            state.isLoading = false;
            state.qrcodeDownloads = action.payload;
        })
        .addCase(getQrcodeDownloads.rejected, (state, action) => {
            state.isSuccess = false;
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        })
        .addCase(getQrcodeScans.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(getQrcodeScans.fulfilled, (state, action) => {
            state.isSuccess = true;
            state.isLoading = false;
            state.qrcodeScans = action.payload;
        })
        .addCase(getQrcodeScans.rejected, (state, action) => {
            state.isSuccess = false;
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        })
        .addCase(getMostScans.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(getMostScans.fulfilled, (state, action) => {
            state.isSuccess = true;
            state.isLoading = false;
            state.mostScans = action.payload;
        })
        .addCase(getMostScans.rejected, (state, action) => {
            state.isSuccess = false;
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        })
    }
});

export const { reset } = agentSlice.actions;
export default agentSlice.reducer;