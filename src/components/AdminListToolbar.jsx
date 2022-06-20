import React, { useState, forwardRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setTasks, setTasksLastUpdate } from '../slices/cityworksSlice';
import {
  setServiceOrders,
  setServiceOrdersLastUpdate,
  setNotifications,
  setNotificationsLastUpdate,
} from '../slices/hydroSlice';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Modal from '@mui/material/Modal';

import { MdTask as TaskIcon } from 'react-icons/md';
import { ImPower as HydroIcon } from 'react-icons/im';

import { Tooltip } from '@mui/material';
import TaskListOptions from './Lists/TaskListOptions';
import { CITYWORKS_REST_BASE_URL, METERSHOPSERVER_BASE_URL } from '../config';

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

const dt = new Date();

const AdminListToolbar = () => {
  const dispatch = useDispatch();

  // Tasks
  const cityworksTasks = useSelector((state) => state.cityworks.tasks);
  const cityworksTasksLastUpdate = useSelector(
    (state) => state.cityworks.tasksLastUpdate
  );
  const [openCityworksTasksSnackbar, setOpenCityworksTasksSnackbar] = useState(false);

  const getTasks = () => {
    const request = {
      requester: 'Me',
      action: 'CITYWORKS_GET_WORKORDER_TASKS',
      payload: {},
    };

    fetch(METERSHOPSERVER_BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    })
      .then((response) => response.json())
      .then((data) => {
        dispatch(setTasks(data?.payload?.WorkOrderTasks));
        dispatch(
          setTasksLastUpdate(
            `${dt.toDateString()} @ ${dt.toLocaleTimeString()}`
          )
        );
      })
      .catch((error) => console.error(error));
  };
  
  // Hydro
  const hydroServiceOrders = useSelector((state) => state.hydro.serviceOrders);
  const hydroServiceOrdersLastUpdate = useSelector(
    (state) => state.hydro.serviceOrdersLastUpdate
  );
  const [openHydroServiceOrderSnackbar, setOpenHydroServiceOrderSnackbar] =
    useState(false);

  const getServiceOrders = () => {
    const taskUrl = CITYWORKS_REST_BASE_URL + '/hydroServiceOrders';

    fetch(taskUrl)
      .then((response) => response.json())
      .then((data) => {
        dispatch(setServiceOrders(data));
        dispatch(
          setServiceOrdersLastUpdate(
            `${dt.toDateString()} @ ${dt.toLocaleTimeString()}`
          )
        );
      });
  };

  const hydroNotifications = useSelector((state) => state.hydro.notifications);
  const hydroNotificationsLastUpdate = useSelector(
    (state) => state.hydro.notificationsLastUpdate
  );
  const [openHydroNotificationSnackbar, setOpenHydroNotificationSnackbar] =
    useState(false);

  const getNotifications = () => {
    const taskUrl = CITYWORKS_REST_BASE_URL + '/hydroNotifications';

    fetch(taskUrl)
      .then((response) => response.json())
      .then((data) => {
        dispatch(setNotifications(data));
        dispatch(
          setNotificationsLastUpdate(
            `${dt.toDateString()} @ ${dt.toLocaleTimeString()}`
          )
        );
      });
  };

  return (
    <Toolbar edge='end'>
      <Tooltip
        title={`${hydroServiceOrders.length} Hydro service orders updated: ${hydroServiceOrdersLastUpdate}`}
      >
        <IconButton
          onClick={() => {
            getServiceOrders();
            setOpenHydroServiceOrderSnackbar(true);
          }}
        >
          <Badge badgeContent={hydroServiceOrders.length} color='secondary'>
            <HydroIcon style={{ fontSize: 24 }} />
          </Badge>
        </IconButton>
      </Tooltip>

      <AlertSnackbar
        open={openHydroServiceOrderSnackbar}
        onClose={() => setOpenHydroServiceOrderSnackbar(false)}
        message={`${hydroServiceOrders.length} Hydro service orders loaded successfully`}
      />

      <Tooltip
        title={`${hydroNotifications.length} Hydro notifications updated: ${hydroNotificationsLastUpdate}`}
      >
        <IconButton
          onClick={() => {
            getNotifications();
            setOpenHydroNotificationSnackbar(true);
          }}
        >
          <Badge badgeContent={hydroNotifications.length} color='secondary'>
            <HydroIcon style={{ fontSize: 24 }} />
          </Badge>
        </IconButton>
      </Tooltip>

      <AlertSnackbar
        open={openHydroNotificationSnackbar}
        onClose={() => setOpenHydroNotificationSnackbar(false)}
        message={`${hydroNotifications.length} Hydro notifications loaded successfully`}
      />

      <Tooltip 
        title={`${cityworksTasks.length} Tasks updated: ${cityworksTasksLastUpdate}`}    
      >
        <IconButton 
          onClick={() => {
            getTasks()
            setOpenCityworksTasksSnackbar(true)
          }}
        >
          <Badge badgeContent={cityworksTasks.length} color='secondary'>
            <TaskIcon style={{ fontSize: 24 }} />
          </Badge>
        </IconButton>
      </Tooltip>
          <AlertSnackbar
            open={openCityworksTasksSnackbar}
            onClose={() => setOpenCityworksTasksSnackbar(false)}
            message={`${cityworksTasks.length} Tasks loaded successfully`}
          />

    </Toolbar>
  );
};

export default AdminListToolbar;
