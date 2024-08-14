import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { gql, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

// Create an HTTP link to the GraphQL endpoint
const httpLink = createHttpLink({
  uri:'http://localhost:5000/graphql', // process.env.REACT_APP_GRAPHQL_ENDPOINT,
});

// Create a middleware link to attach the token to the request headers
const authLink = setContext((_, { headers }) => {
  // Get the authentication token from localStorage if it exists
  const token = localStorage.getItem('token');
  console.log("Token in email localStorage:", token); // Debugging line to check token

  // Return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : '',      
    },
  };
});

// Initialize Apollo Client with the auth and http links
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

// Define thunks (fetchInbox, fetchSentEmails, sendEmail) as shown in your code

export const fetchInbox = createAsyncThunk('email/fetchInbox', async () => {
  const FETCH_INBOX = gql`
    query {
      inbox {
        id
        from
        to
        subject
        body
        sentAt
      }
    }
  `;

  const { data } = await client.query({ query: FETCH_INBOX });
  return data.inbox;
});

export const fetchSentEmails = createAsyncThunk('email/fetchSentEmails', async () => {
  const FETCH_SENT_EMAILS = gql`
    query {
      sentEmails {
        id
        from
        to
        subject
        body
        sentAt
      }
    }
  `;

  const { data } = await client.query({ query: FETCH_SENT_EMAILS });
  return data.sentEmails;
});

export const sendEmail = createAsyncThunk('email/sendEmail', async ({ to, subject, body }) => {
  const SEND_EMAIL = gql`
    mutation SendEmail($to: String!, $subject: String!, $body: String!) {
      sendEmail(to: $to, subject: $subject, body: $body) {
        id
        from
        to
        subject
        body
        sentAt
      }
    }
  `;

  const { data } = await client.mutate({
    mutation: SEND_EMAIL,
    variables: { to, subject, body },
  });

  return data.sendEmail;
});

// Email slice with reducers and extra reducers
const emailSlice = createSlice({
  name: 'email',
  initialState: {
    inbox: [],
    sentEmails: [],
    error: null,
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchInbox.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchInbox.fulfilled, (state, action) => {
        state.inbox = action.payload;
        state.loading = false;
      })
      .addCase(fetchInbox.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })
      .addCase(fetchSentEmails.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSentEmails.fulfilled, (state, action) => {
        state.sentEmails = action.payload;
        state.loading = false;
      })
      .addCase(fetchSentEmails.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })
      .addCase(sendEmail.fulfilled, (state, action) => {
        state.sentEmails.push(action.payload);
      })
      .addCase(sendEmail.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export default emailSlice.reducer;
