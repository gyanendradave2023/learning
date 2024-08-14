import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { gql, ApolloClient, InMemoryCache } from '@apollo/client';

// Initialize Apollo Client
const client = new ApolloClient({
  uri: process.env.REACT_APP_GRAPHQL_ENDPOINT,
  cache: new InMemoryCache(),
});

// Thunk to fetch inbox emails
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

// Thunk to fetch sent emails
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

// Thunk to send a new email
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
    loading: false,  // Added loading state
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchInbox.pending, (state) => {
        state.loading = true;  // Set loading state to true when request is pending
      })
      .addCase(fetchInbox.fulfilled, (state, action) => {
        state.inbox = action.payload;
        state.loading = false;  // Set loading state to false when request is fulfilled
      })
      .addCase(fetchInbox.rejected, (state, action) => {
        state.error = action.error.message;  // Set error message on rejection
        state.loading = false;  // Set loading state to false when request fails
      })
      .addCase(fetchSentEmails.pending, (state) => {
        state.loading = true;  // Set loading state to true when request is pending
      })
      .addCase(fetchSentEmails.fulfilled, (state, action) => {
        state.sentEmails = action.payload;
        state.loading = false;  // Set loading state to false when request is fulfilled
      })
      .addCase(fetchSentEmails.rejected, (state, action) => {
        state.error = action.error.message;  // Set error message on rejection
        state.loading = false;  // Set loading state to false when request fails
      })
      .addCase(sendEmail.fulfilled, (state, action) => {
        state.sentEmails.push(action.payload);
      })
      .addCase(sendEmail.rejected, (state, action) => {
        state.error = action.error.message;  // Set error message on rejection
      });
  },
});

export default emailSlice.reducer;
