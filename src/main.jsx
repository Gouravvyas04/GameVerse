import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ClerkProvider } from '@clerk/clerk-react';
import App from './App.jsx';
import { store, persistor } from './redux/store';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ClerkProvider publishableKey={clerkPubKey}>
            <App />
        </ClerkProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
