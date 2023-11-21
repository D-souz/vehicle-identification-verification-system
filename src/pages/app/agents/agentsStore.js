import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// initial agents state
const initialState = {
    agents: [],
    isError :false,
    isLoading :false,
    isSuccess :false,
    message :""
}

// ROUTES API
const API_URL = "http://localhost:3000";

// getting all agents from the DB
export const getAgents = createAsyncThunk(
    "agents/getAll",
    async (_, thunkAPI) =>{

        try {
            const response = await axios.get(API_URL + "/api/agent/agents")
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
    }
});

export const { reset } = agentSlice.actions;
export default agentSlice.reducer;