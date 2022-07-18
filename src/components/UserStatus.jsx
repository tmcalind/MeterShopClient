import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import IconButton from '@mui/material/IconButton';
import Modal from '@mui/material/Modal';
import { FiLogIn as LoginIcon, FiLogOut as LogoutIcon } from 'react-icons/fi';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { imposterTom as imposter } from '../imposters';
import {
  setUser,
  setAuth,
  setPrefs,
  setRoles,
  setArcGISAuth,
  setStatus,
  setCityworksLoginName,
  setCityworksToken,
} from '../slices/userSlice';

import OAuthInfo from '@arcgis/core/identity/OAuthInfo';
import esriId from '@arcgis/core/identity/IdentityManager';

import { ARCGIS_CLIENT_ID } from '../config';
import UserStatusDetail from './UserStatusDetail';
import { gridColumnPositionsSelector } from '@mui/x-data-grid';
import UserLogin from './UserLogin';

const UserStatus = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.user.auth);
  const userStatus = useSelector((state) => state.user.status);
  const cityworksLoginName = useSelector(
    (state) => state.user.cityworksLoginName
  );
  const cityworksToken = useSelector((state) => state.user.cityworksToken);
  const arcGISAuth = useSelector((state) => state.user.arcGISAuth);

  const [showUserLogin, setShowUserLogin] = new useState(false);
  const [showDetails, setShowDetails] = new useState(false);

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
        dispatch(setUser(imposter));

        if (authResponse.userId && authResponse.token && authResponse.server) {
          const payload = {
            LoginName: authResponse.userId,
            GISToken: authResponse.token,
            GISTokenUrl: authResponse.server,
          };

          const cityworksUrl = `https://cityworksdev.corp.city.london.ca/CityworksDev/services/General/Authentication/AuthenticateGisToken?data={"LoginName"=}`;
          fetch(cityworksUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
          })
            .then((response) => response.json())
            .then((data) => console.log('data', data));
        }
      })
      .catch((error) => {
        dispatch(
          setArcGISAuth({
            message: error.message,
          })
        );
      });
  };

  const arcGISLoginCheckHandler = () => {
    esriId
      .checkSignInStatus(info.portalUrl + '/sharing')
      .then((authResponse) => {
        console.log('authResponse', authResponse);
        dispatch(
          setArcGISAuth({
            scope: authResponse.scope,
            userId: authResponse.userId,
            token: authResponse.token,
            creationTime: authResponse.creationTime,
            expires: authResponse.expires,
            server: authResponse.server,
          })
        );
      })
      .catch((error) => {
        dispatch(
          setArcGISAuth({
            message: error.message,
          })
        );
      });
  };

  const arcGISLogoutHandler = () => {
    esriId.destroyCredentials();
    dispatch(setArcGISAuth({ message: 'User is not signed in' }));
    dispatch(setAuth(null));
    dispatch(setRoles(null));
    dispatch(setPrefs(null));

    dispatch(setStatus('notLoggedIn'));
    dispatch(setCityworksLoginName('?'));
    dispatch(setCityworksToken(null));
  };

  return (
    <>
    <Modal open={showDetails} onClose={() => setShowDetails(false)}>
            <UserStatusDetail 
              userStatus={userStatus} 
              cityworksLoginName={cityworksLoginName}
              cityworksToken={cityworksToken}
              arcGISAuth={arcGISAuth} />
          </Modal>
      {userStatus === 'notLoggedIn' ? (
        <Card
          style={{
            paddingLeft: '5px',
            paddingRight: '20px',
            marginLeft: '20px',
          }}
        >
          <CardHeader
            style={{ padding: '4px' }}
            avatar={
              <Avatar>{cityworksLoginName.charAt(0).toUpperCase()}</Avatar>
            }
            action={
              <>
                <IconButton
                  edge='end'
                  color='inherit'
                  aria-label='menu'
                  onClick={() => setShowUserLogin(true)}
                >
                  <LoginIcon />
                </IconButton>
                <IconButton onClick={() => setShowDetails(true)}>
                    <QuestionMarkIcon />
                  </IconButton>
                <Modal
                  open={showUserLogin}
                  onClose={() => setShowUserLogin(false)}
                >
                  <UserLogin
                    showUserLogin={showUserLogin}
                    setShowUserLogin={setShowUserLogin}
                  />
                </Modal>
              </>
            }
            title='Login'
          />
        </Card>
      ) : (
        <>
          
          <Card
            style={{
              paddingLeft: '5px',
              paddingRight: '20px',
              marginLeft: '20px',
            }}
          >
            <CardHeader
              style={{ padding: '4px' }}
              avatar={
                <Avatar>{cityworksLoginName.charAt(0).toUpperCase()}</Avatar>
              }
              action={
                <>
                  <IconButton
                    edge='end'
                    color='inherit'
                    aria-label='menu'
                    onClick={arcGISLogoutHandler}
                  >
                    <LogoutIcon />
                  </IconButton>
                  <IconButton onClick={() => setShowDetails(true)}>
                    <QuestionMarkIcon />
                  </IconButton>
                </>
              }
              title={cityworksLoginName}
            />
          </Card>
        </>
      )}
    </>
  );
};

export default UserStatus;
