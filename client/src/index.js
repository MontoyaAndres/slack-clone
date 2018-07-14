import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import 'semantic-ui-css/semantic.min.css';

import Routes from './routes';
import registerServiceWorker from './registerServiceWorker';
import client from './apollo';

const App = (
  <ApolloProvider client={client}>
    <Routes />
  </ApolloProvider>
);

ReactDOM.render(App, document.getElementById('root'));
registerServiceWorker();
// https://www.youtube.com/watch?v=DIjckHKXumQ&index=46&list=PLN3n1USn4xlkdRlq3VZ1sT6SGW0-yajjL
