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
    agent: []
}

// ROUTES API
const API_URL = "http://localhost:3000";

// getting all agents from the DB
export const getAgents = createAsyncThunk(
    "agents/getAll",
    async (_, thunkAPI) =>{

        try {
            const response = await axios.get(API_URL + "/api/agent/agents")
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
            const response = await axios.get(API_URL + `/api/agent/${id}`)

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
// delete an agent
export const deleteAgent = createAsyncThunk(
    "agent/deleteAgent",
    async (id, thunkAPI) =>{

        try {
            const response = await axios.delete(API_URL + `/api/agent/${id}`)

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
            state.agents = state.agents.filter((agent) => agent._id !== action.payload.id )
        })
        .addCase(deleteAgent.rejected, (state, action) => {
            state.isSuccess = false;
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        })
    }
});

export const { reset } = agentSlice.actions;
export default agentSlice.reducer;