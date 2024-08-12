import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider, InMemoryCache, ApolloClient } from '@apollo/client';
import { Provider } from 'react-redux';
import store from './features/store';
import App from './App';
import './index.css';

const client = new ApolloClient({
  uri: process.env.REACT_APP_GRAPHQL_ENDPOINT,
  cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>  
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </Provider>
);
