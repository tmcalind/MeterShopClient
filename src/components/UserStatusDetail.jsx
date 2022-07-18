import React from 'react';
import { Card, CardContent, TextField } from '@mui/material';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

const CityworksAuthDetails = ({ userStatus, cityworksLoginName, cityworksToken }) => {
  return (
    <>
      <Card>
        <CardContent>
        {cityworksLoginName && <h3>Login: {cityworksLoginName}</h3>}
          {userStatus && <h5>Status/Role: {userStatus}</h5>}
          
          {cityworksToken && (<TextField
                label='Cityworks token'
                value={cityworksToken}
                fullWidth
                multiline
                maxRows={8}
              />)}
          
        </CardContent>
      </Card>
    </>
  );
}


const UserStatusDetail = ({ userStatus, cityworksLoginName, cityworksToken, arcGISAuth }) => {
  return (
    <>
      <Card sx={style}>
        <CityworksAuthDetails userStatus={userStatus} cityworksLoginName={cityworksLoginName} cityworksToken={cityworksToken} />
       
      </Card>
    </>
  );
};

export default UserStatusDetail;
