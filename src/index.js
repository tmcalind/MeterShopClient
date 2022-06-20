import React from 'react';
// import { createRoot } from 'react-dom/client'
import ReactDOM from 'react-dom'

import App from './App';
import { store } from './app/store';
import { Provider } from 'react-redux';

// const container = document.getElementById('root');
// const root = createRoot(container); 
// root.render(
//   (<React.StrictMode>
//     <Provider store={store}>
//       <App />
//     </Provider>
//   </React.StrictMode>)
// );


ReactDOM.render(
<React.StrictMode>
  <Provider store={store}>
    <App />
  </Provider>
</React.StrictMode>, 
document.getElementById('root')
);

