import React from 'react'
import { useDispatch, useSelector } from "react-redux";

import Avatar from '@mui/material/Avatar'
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader'
import IconButton from '@mui/material/IconButton';
import { FiLogIn as LoginIcon, FiLogOut as LogoutIcon } from "react-icons/fi";

import { imposterTom as imposter } from  '../imposters';
import { setUser, setAuth, setPrefs, setRoles } from '../slices/userSlice';

const UserStatus = () => {
    const dispatch = useDispatch();
    const auth = useSelector((state) => state.user.auth);
console.log('UserStatus', auth)
    const userLogin = () => {
        dispatch(setUser(imposter));
      };

    const userLogout = () => {
        dispatch(setAuth(null));
        dispatch(setRoles(null));
        dispatch(setPrefs(null));
    }

  return (
    <>
    {auth ? (
        <Card
          style={{ paddingLeft: "5px", paddingRight: "20px", marginLeft: "20px"}}
        >
          <CardHeader
            style={{ padding: "4px" }}
            avatar={<Avatar>{auth.name.charAt(0).toUpperCase()}</Avatar>}
            action={
              <IconButton
                edge="end"
                color="inherit"
                aria-label="menu"
                onClick={userLogout}
              >
                <LogoutIcon />
              </IconButton>
            }
            // title={auth.name}
          />
        </Card>
    ) : (
        <Card
          style={{ paddingLeft: "5px", paddingRight: "20px", marginLeft: "20px"}}
        >
        <CardHeader
          style={{ padding: "4px" }}
          avatar={<Avatar>?</Avatar>}
          action={
            <IconButton
              edge="end"
              color="inherit"
              aria-label="menu"
              onClick={userLogin}
            >
              <LoginIcon />
            </IconButton>
          }
          title="Login"
        />
      </Card>
    )}

    </>
  )
}

export default UserStatus