import React from 'react';
import { createRoot } from 'react-dom/client';

import { Provider } from 'react-redux';
import App from './views/App';
import { store } from './store';

let container = document.getElementById("root");

const root = createRoot(container!);

root.render(
   <Provider store={store}>
      <App />
   </Provider>
);
