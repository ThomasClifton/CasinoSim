import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './styles/main.css'
import { createTheme, MantineProvider } from '@mantine/core';

const theme = createTheme({
  /** Your theme override here */
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {
      //https://mantine.dev/theming/mantine-provider/
    }
    <MantineProvider theme={theme}>
      <App />
    </MantineProvider>
    
  </React.StrictMode>,
)
