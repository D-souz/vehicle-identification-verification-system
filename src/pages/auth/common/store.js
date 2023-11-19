import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import axios from "axios";

// const initialUsers = () => {
//   const item = window.localStorage.getItem("users");
//   return item
//     ? JSON.parse(item)
//     : [
//         {
//           id: uuidv4(),
//           name: "admin",
//           email: "admin@gmail.com",
//           password: "admin",
//         },
//       ];
// };
// save users in local storage

// const initialIsAuth = () => {
//   const item = window.localStorage.getItem("isAuth");
//   return item ? JSON.parse(item) : false;
// };


// // fetching the agent from local storage
// const agent = JSON.parse(localStorage.getItem("agent"));


// getting agent from local storage
const agent = JSON.parse(localStorage.getItem('agent')); 

// the initialState
const initialState = {
  agent: agent ? agent : null,
  isLoading: false,
  isError: false,
  isSuccess: false, // for monitoring the registration process.
  message: ""
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

    console.log(response.data);

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
    } else { 
      // const error = (error.response && error.response.data && error.response.data.message ) ||
      // error.message || error.toString();

      // toast.error(error, {
      //   position: "top-right",
      //   autoClose: 1500,
      //   hideProgressBar: false,
      //   closeOnClick: true,
      //   pauseOnHover: true,
      //   draggable: true,
      //   progress: undefined,
      //   theme: "light",
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

          // toast.success("Agent logged in successfully", {
          //   position: "top-right",
          //   autoClose: 1500,
          //   hideProgressBar: false,
          //   closeOnClick: true,
          //   pauseOnHover: true,
          //   draggable: true,
          //   progress: undefined,
          //   theme: "light",
          // });
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

export const authSlice = createSlice({
  name: "auth",
  initialState,
  // initialState: {
  //   // users: initialUsers(),
  //   // isAuth: initialIsAuth(),
  //   isError: false,
  //   isSuccess: false,
  //   isLoading: false,
  //   // userInfo: {}, // for user object
  //   // userToken: null, // for storing the JWT
  // },
  reducers: {
    reset: (state) => {
      state.isError = false
      state.isLoading = false
      state.isSuccess = false
      state.message = ""
  }
    // handleRegister:(state, action) => {
    //   const { name, email, password, role, telephone } = action.payload;

    //   // submit ro backend
    //   // const user = axios.post........

    //   // if(user.data) save to local storage

    //   //catch error and toast that error as defined in the backend

    //   // const user = state.users.find((user) => user.email === email);

    //   if (user) {
    //     toast.error("User already exists", {
    //       position: "top-right",
    //       autoClose: 1500,
    //       hideProgressBar: false,
    //       closeOnClick: true,
    //       pauseOnHover: true,
    //       draggable: true,
    //       progress: undefined,
    //       theme: "light",
    //     });
    //   } else {
    //     state.users.push({
    //       id: uuidv4(),
    //       name,
    //       email,
    //       password,
    //     });
    //     window.localStorage.setItem("users", JSON.stringify(state.users));
    //     toast.success("User registered successfully", {
    //       position: "top-right",
    //       autoClose: 1500,
    //       hideProgressBar: false,
    //       closeOnClick: true,
    //       pauseOnHover: true,
    //       draggable: true,
    //       progress: undefined,
    //       theme: "light",
    //     });
    //   }
    // },

    // handleLogin: (state, action) => {
    //   state.isAuth = action.payload;
    //   // save isAuth in local storage
    //   window.localStorage.setItem("isAuth", JSON.stringify(state.isAuth));
    //   toast.success("User logged in successfully", {
    //     position: "top-right",
    //     autoClose: 1500,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     draggable: true,
    //     progress: undefined,
    //     theme: "light",
    //   });
    // },
    // handleLogout: (state, action) => {
    //   state.isAuth = action.payload;
    //   // remove isAuth from local storage
    //   window.localStorage.removeItem("isAuth");
    //   toast.success("User logged out successfully", {
    //     position: "top-right",
    //   });
    // },
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
    })
  }
});

export const { handleRegister, handleLogin, handleLogout, reset } = authSlice.actions;
export default authSlice.reducer;
