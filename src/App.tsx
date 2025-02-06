import React from 'react';
import { Provider } from 'react-redux';
import store from './store/store';
import GraphContainer from './components/GraphContainer';

const App: React.FC = () => (
  <Provider store={store}>
    <GraphContainer />
  </Provider>
);

export default App;