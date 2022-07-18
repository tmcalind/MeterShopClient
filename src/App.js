import React from 'react';
import { useSelector } from "react-redux";

import { createTheme, ThemeProvider } from '@mui/material/styles';
import Grid from '@mui/material/Grid';

import AdminPage from './pages/AdminPage';
import FieldPage from './pages/FieldPage';
import LandingPage from './pages/LandingPage';

const theme = createTheme({
  typography: {
    fontSize: 14
  },
  palette: {
    primary: {
      light: '#819ca9', 
      main: '#546e7a',
      dark: '#29434e',
      contrastText: '#ffffff',
    },
    secondary: {
      light: '#62727b', 
      main: '#37474f',
      dark: '#102027',
      contrastText: '#ffffff',
    },
    background: {
      paper: '#cfd8dc'
    },
  }
});

function App() {
  const userStatus = useSelector((state) => state.user.status)

  return (
    <>  
      <ThemeProvider theme={theme}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            {userStatus === "notLoggedIn" && (
              <LandingPage 
                message="Welcome to MeterShop. Login to begin." 
              />
            ) }
            {userStatus == "admin" && <AdminPage />}

            {userStatus == "field" && <FieldPage />}

          </Grid>
        </Grid>
      </ThemeProvider>
    </>
  );
}

export default App;
