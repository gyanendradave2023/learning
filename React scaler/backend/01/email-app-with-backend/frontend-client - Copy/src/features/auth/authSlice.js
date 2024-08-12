import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { gql, ApolloClient, InMemoryCache } from '@apollo/client';

// Initialize Apollo Client
const client = new ApolloClient({
  uri: process.env.REACT_APP_GRAPHQL_ENDPOINT, // Ensure this is defined in your .env file
  cache: new InMemoryCache(),
});

// Define async thunk for login
export const login = createAsyncThunk('auth/login', async ({ username, password }) => {
  const LOGIN_USER = gql`
    mutation Login($username: String!, $password: String!) {
      login(username: $username, password: $password) {
        token
      }
    }
  `;

  try {
    const { data } = await client.mutate({
      mutation: LOGIN_USER,
      variables: { username, password },
    });

    // Save token in localStorage
    localStorage.setItem('token', data.login.token);
    return data.login.token;
  } catch (error) {
    // Handle error if needed
    return Promise.reject(error.message);
  }
});

// Define async thunk for register
export const register = createAsyncThunk('auth/register', async ({ username, email, password }) => {
  const REGISTER_USER = gql`
    mutation Register($username: String!, $email: String!, $password: String!) {
      register(username: $username, email: $email, password: $password) {
        token
      }
    }
  `;

  try {
    const { data } = await client.mutate({
      mutation: REGISTER_USER,
      variables: { username, email, password },
    });

    // Save token in localStorage
    localStorage.setItem('token', data.register.token);
    return data.register.token;
  } catch (error) {
    // Handle error if needed
    return Promise.reject(error.message);
  }
});

// Define async thunk for logout
export const logout = createAsyncThunk('auth/logout', async () => {
  // Remove token from localStorage
  localStorage.removeItem('token');
  return {};
});

// Create auth slice with reducers and extra reducers
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: localStorage.getItem('token') || null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.token = action.payload;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.token = action.payload;
      })
      .addCase(logout.fulfilled, (state) => {
        state.token = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default authSlice.reducer;
