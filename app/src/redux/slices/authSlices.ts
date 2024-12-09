import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios";

export type AuthState = {
    userId: string | null;
    username: string | null;
    isLoggedIn: boolean;
    loading: boolean;
    error: string | null;
};

const initialState: AuthState = {
    userId: null,
    username: null,
    isLoggedIn: false,
    loading: false,
    error: null,
};

type LoginCredentials = {
    email: string;
    password: string;
}

type LoginResponse = {
    userID: string;
    username: string;
}


export const login = createAsyncThunk<LoginResponse, LoginCredentials>("auth/login", async (credentials, { rejectWithValue }) => {
    try {
        const response = await axios.post("https://virtualmartserver.onrender.com/login", credentials, { withCredentials: true });
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            return rejectWithValue(error.response.data.error || 'Login failed.');
        }
        return rejectWithValue('An unexpected error occurred.');
    }
}
);

export const register = createAsyncThunk("auth/register", async (credentials:
    { firstname: string; lastname: string; email: string; password: string }) => {
    const response = await axios.post("https://virtualmartserver.onrender.com/register", credentials, { withCredentials: true });
    return response.data;
});

export const logout = createAsyncThunk("auth/logout", async () => {
    await axios.post("http://localhost:8000/logout", {}, { withCredentials: true });
    return {};
});

export const checkAuth = createAsyncThunk("auth/checkAuth", async () => {
    const response = await axios.get("https://virtualmartserver.onrender.com/authenticate", { withCredentials: true });
    return response.data;
});


export const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(checkAuth.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(checkAuth.fulfilled, (state, action) => {
            state.loading = false;
            state.isLoggedIn = action.payload.isAuthenticated;
            state.username = action.payload.username;
            state.userId = action.payload.userID;
            state.error = null;
        })
        builder.addCase(checkAuth.rejected, (state, action) => {
            state.loading = false;
            state.isLoggedIn = false;
            state.username = null;
            state.userId = null;
            state.error = action.payload as string;
        })
        // Handle login
        builder.addCase(login.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        builder.addCase(login.fulfilled, (state, action) => {
            state.loading = false;
            state.isLoggedIn = true;
            state.username = action.payload.username;
            state.userId = action.payload.userID;
            state.error = null;
        })
        builder.addCase(login.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        })
        // Handle logout
        builder.addCase(logout.fulfilled, (state) => {
            state.isLoggedIn = false;
            state.username = null;
            state.userId = null;
            state.error = null;
        })
        // Handle registration
        builder.addCase(register.fulfilled, (state, _action) => {
            state.error = null;
        })
        builder.addCase(register.rejected, (state, action) => {
            state.error = action.payload as string;
        });
    },
});

export default authSlice.reducer;
