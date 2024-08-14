import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { gql, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

// Create an HTTP link to the GraphQL endpoint
const httpLink = createHttpLink({
  uri: 'http://localhost:5000/graphql', // Ensure this is defined in your .env file
});

// Create a middleware link to attach the token to the request headers
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : '',
    }
  };
});

// Initialize Apollo Client with the auth and http links
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

// Define async thunk for login
export const login = createAsyncThunk('auth/login', async ({ username, password }, { rejectWithValue }) => {
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
    // Handle GraphQL and network errors
    return rejectWithValue(error.message || 'Login failed');
  }
});

// Define async thunk for register
export const register = createAsyncThunk('auth/register', async ({ username, email, password }, { rejectWithValue }) => {
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
    // Handle GraphQL and network errors
    return rejectWithValue(error.message || 'Registration failed');
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
        state.error = null;  // Clear error on successful login
      })
      .addCase(register.fulfilled, (state, action) => {
        state.token = action.payload;
        state.error = null;  // Clear error on successful registration
      })
      .addCase(logout.fulfilled, (state) => {
        state.token = null;
        state.error = null;  // Clear error on successful logout
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
