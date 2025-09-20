import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store/store';
import './index.css';
import App from './App.tsx';
import Navbar from './components/Header.tsx';
import Chatbot from './components/ui/Chatbot.tsx';
import ProfilePage from './pages/ProfilePage.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <Navbar/>
          <App/>
          <Chatbot/>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </StrictMode>,
)
