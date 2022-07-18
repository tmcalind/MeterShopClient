import React, { useState, forwardRef } from 'react';
import { useDispatch } from 'react-redux';
import {
  setStatus,
  setCityworksLoginName,
  setCityworksToken,
  setArcGISAuth,
} from '../slices/userSlice';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import MuiAlert from '@mui/material/Alert';

import OAuthInfo from '@arcgis/core/identity/OAuthInfo';
import esriId from '@arcgis/core/identity/IdentityManager';

import { ARCGIS_CLIENT_ID } from '../config';

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
});

const AlertSnackbar = ({ open, onClose, message }) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={onClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <Alert onClose={onClose} severity='info' sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 300,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

const UserLogin = ({ setShowUserLogin }) => {
  const dispatch = useDispatch();
  const [loginName, setLoginName] = new useState();
  const [password, setPassword] = new useState();
  const [openLoginStatusSnackbar, setOpenLoginStatusSnackbar] = new useState(
    false
  );
  const [statusMessage, setStatusMessage] = new useState('no message');

  const info = new OAuthInfo({
    appId: ARCGIS_CLIENT_ID,
    flowType: 'authorization-code',
    popup: false,
  });

  esriId.registerOAuthInfos([info]);

  const arcGISLoginHandler = () => {
    esriId
      .getCredential(info.portalUrl + '/sharing')
      .then((authResponse) => {
        dispatch(
          setArcGISAuth({
            scope: authResponse.scope,
            userId: authResponse.userId,
            token: authResponse.token,
            server: authResponse.server,
            creationTime: authResponse.creationTime,
            expires: authResponse.expires,
          })
        );

        console.log(authResponse);

        //   https://cityworksdev.corp.city.london.ca/CityworksDev/services/General/Authentication/AuthenticateGisToken?data={
        //     "LoginName": null,
        //     "GisToken": null,
        //     "GisTokenUrl": null,
        //     "Expires": null
        // }

        if (authResponse.userId && authResponse.token && authResponse.server) {
          const cityworksUrl = `https://cityworksdev.corp.city.london.ca/CityworksDev/services/General/Authentication/AuthenticateGisToken?data={"LoginName":"${authResponse.userId}","GisToken":"${authResponse.token}","GisTokenUrl":"${authResponse.server}"}`;

          console.log('cityworksUrl', cityworksUrl);
          fetch(cityworksUrl)
            .then((response) => response.json())
            .then((data) => {
              console.log('data', data);
              if (data?.Status === 0) {
                if (data?.Value?.Token) {
                  dispatch(setStatus('admin'));
                  dispatch(setCityworksLoginName(loginName));
                  dispatch(setCityworksToken(data.Value.Token));
                  setStatusMessage(
                    `Access to Cityworks for ${loginName} successful`
                  );
                  setOpenLoginStatusSnackbar(true);
                }
              } else {
                dispatch(setStatus('notLoggedIn'));
                setStatusMessage(data.message);
                setOpenLoginStatusSnackbar(true);
              }
            });
        }
      })
      .catch((error) => {
        dispatch(
          setArcGISAuth({
            message: error.message,
          })
        );
        setStatusMessage(error.message);
        setOpenLoginStatusSnackbar(true);
      });
  };

  const loginHandler = () => {
    const cityworksUrl = `https://cityworksdev.corp.city.london.ca/CityworksDev/services/General/Authentication/Authenticate?data={"LoginName":"${loginName}","Password":"${password}"}`;
    fetch(cityworksUrl)
      .then((response) => response.json())
      .then((data) => {
        console.log('data', data);

        if (data?.Status === 0) {
          if (data?.Value?.Token) {
            dispatch(setStatus('admin'));
            dispatch(setCityworksLoginName(loginName));
            dispatch(setCityworksToken(data.Value.Token));
            
            setStatusMessage(`Access to Cityworks for ${loginName} successful`);
            setOpenLoginStatusSnackbar(true);
          }
        } else if (data?.Status === 2) {
          dispatch(setStatus('notLoggedIn'));
          setStatusMessage(`Access to Cityworks for ${loginName} has failed`);
          setOpenLoginStatusSnackbar(true);
        }

        setShowUserLogin(false);
      });
  };

  return (
    <>
      <Card sx={style}>
        <Typography variant='h5' component='div'>
          MeterShop Login
        </Typography>
        <Typography variant='body2'>
          Log in using your Cityworks account
        </Typography>
        {/* <CardContent>
          <Button onClick={arcGISLoginHandler} variant='contained'>
            ArcGIS Portal Login
          </Button>
        </CardContent>
        <Divider /> */}
        <CardContent>
          <Stack spacing={2}>
            <TextField
              required
              id='outlined-required'
              label='Cityworks Login name'
              fullWidth
              value={loginName}
              onChange={(e) => setLoginName(e.target.value)}
              size='small'
            />
            <TextField
              id='outlined-password-input'
              label='Cityworks Password'
              type='password'
              autoComplete='current-password'
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              size='small'
            />
          </Stack>
        </CardContent>
        <CardActions>
          <Button variant='contained' onClick={loginHandler}>
            Login
          </Button>
        </CardActions>
      </Card>
      <AlertSnackbar
        open={openLoginStatusSnackbar}
        onClose={() => setOpenLoginStatusSnackbar(false)}
        message={statusMessage}
      />
    </>
  );
};

export default UserLogin;
