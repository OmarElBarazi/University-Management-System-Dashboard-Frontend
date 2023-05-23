import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import './assets/css/tailwind.output.css';
import App from './App';
import { SidebarProvider } from './context/SidebarContext';
import ThemedSuspense from './components/ThemedSuspense';
import { Windmill } from '@windmill/react-ui';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import store from './store.js';

ReactDOM.render(
  <Provider store={store}>
    <SidebarProvider>
      <Suspense fallback={<ThemedSuspense />}>
        <Windmill usePreferences>
          <App />
        </Windmill>
      </Suspense>
    </SidebarProvider>
  </Provider>,
  document.getElementById('root')
);

serviceWorker.register();
