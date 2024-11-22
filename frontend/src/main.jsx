import { createRoot } from 'react-dom/client'
import './index.css'
import RoutesProvider from './routes/routes.jsx'
import AppContextProvider from './context/AppContext.jsx'

createRoot(document.getElementById('root')).render(
  <AppContextProvider>
    <RoutesProvider />
  </AppContextProvider>
)
