import React from 'react';
import { useSelector } from "react-redux";

import { createTheme, ThemeProvider } from '@mui/material/styles';
import Grid from '@mui/material/Grid';

import AdminPage from './pages/AdminPage';
import FieldPage from './pages/FieldPage';
import LandingPage from './pages/LandingPage';

import { imposterTom } from './imposters';

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
    mode: imposterTom.roles.theme
  }
});

function App() {

  const userAuth = useSelector((state) => state.user.auth);
  const userRoles = useSelector((state) => state.user.roles);

  console.log('App.js',userAuth, userRoles)
  return (
    <>
    
      <ThemeProvider theme={theme}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            {userAuth ? (
              <>
                {!userRoles.admin && !userRoles.field ? (
                  <LandingPage 
                    message="You are authenticated but have not been assigned a role. Contact MeterShop Admin"
                  />
                ) : (
                  <>
                    {userRoles.admin && !userRoles.field && <AdminPage /> }
                    {userRoles.field && !userRoles.admin && <FieldPage />}        
                  </>
                )}
              </>
              ) : (
              <LandingPage 
                  message="Welcome to MeterShop. Login to begin." 
              />) 
            } 
          </Grid>
        </Grid>
      </ThemeProvider>
      
    </>
  );
}

export default App;
