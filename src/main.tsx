import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { UserProvider } from './contexts/UserContext';
import { StatisticsProvider } from './contexts/StatisticsContext';
import { AppProvider } from './contexts/AppContext';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <UserProvider>
      <StatisticsProvider>
        <AppProvider>
          <App />
        </AppProvider>
      </StatisticsProvider>
    </UserProvider>
  </StrictMode>
);export default function MasterVariations() {
  return (
    <div>
      <h2>Master Variations</h2>
      <p>View and manage all master variations records here.</p>
    </div>
  );
}
