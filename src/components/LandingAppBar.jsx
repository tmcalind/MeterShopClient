import React from 'react'

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from '@mui/material/Typography';

import UserStatus from './UserStatus';

const LandingAppBar = ({ title }) => {
    // const classes = useStyles();

    return (
      <AppBar position="static">
        <Toolbar color="primary">
          <Typography variant="h4" component="span">
            {title}
          </Typography>
          <UserStatus />
        </Toolbar>
      </AppBar>
    );
}

export default LandingAppBar