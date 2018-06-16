import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloClient, createNetworkInterface, ApolloProvider } from 'react-apollo';

// css
import 'semantic-ui-css/semantic.min.css';

import Routes from './routes';
import registerServiceWorker from './registerServiceWorker';

const networkInterface = createNetworkInterface({
  uri: 'http://localhost:8080/graphql'
});

networkInterface.use([
  {
    applyMiddleware(req, next) {
      if (!req.options.headers) {
        req.options.headers = {};
      }

      req.options.headers['x-token'] = localStorage.getItem('token');
      req.options.headers['x-refresh-token'] = localStorage.getItem('refreshToken');
      next();
    }
  }
]);

networkInterface.useAfter([
  {
    applyAfterware(
      {
        response: { headers }
      },
      next
    ) {
      const token = headers.get('x-token');
      const refreshToken = headers.get('x-refresh-token');

      if (token) {
        localStorage.setItem('token', token);
      }

      if (refreshToken) {
        localStorage.setItem('refreshToken', refreshToken);
      }

      next();
    }
  }
]);

const client = new ApolloClient({
  networkInterface
});

const App = (
  <ApolloProvider client={client}>
    <Routes />
  </ApolloProvider>
);

ReactDOM.render(App, document.getElementById('root'));
registerServiceWorker();
// https://www.youtube.com/watch?v=WOo8eOSgjHQ&index=14&list=PLN3n1USn4xlkdRlq3VZ1sT6SGW0-yajjL
