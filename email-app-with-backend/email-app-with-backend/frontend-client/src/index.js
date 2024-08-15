import React from 'react';
import { createRoot } from 'react-dom/client'; // Corrected import
import { ApolloProvider, InMemoryCache, ApolloClient } from '@apollo/client';
import { Provider } from 'react-redux';
import store from './features/store';
import App from './App';
import './index.css';

const client = new ApolloClient({
  uri: process.env.REACT_APP_GRAPHQL_ENDPOINT,
  cache: new InMemoryCache(),
});

const root = createRoot(document.getElementById('root')); // Corrected usage
root.render(
  <Provider store={store}>  
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </Provider>
);