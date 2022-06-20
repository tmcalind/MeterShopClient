import React, { useState, forwardRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setLettersObjectIds,
  setLettersObjectIdsVisible,
  setCallsObjectIds,
  setCallsObjectIdsVisible,
  setShutoffsObjectIds,
  setShutoffsObjectIdsVisible,
  setScheduledObjectIds,
  setScheduledObjectIdsVisible,
} from '../slices/listSlice';

import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

import {
  MdEmail as EmailIcon,
  MdPhone as PhoneIcon,
  MdClose as CloseIcon,
  MdSchedule as ScheduleIcon,
} from 'react-icons/md';

import {
  lettersObjIds,
  callsObjIds,
  shutoffObjIds,
  scheduledObjIds,
} from '../components/Maps/MapConfigs';

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
});

const ListQuery = () => {
  const dispatch = useDispatch();
  const lettersObjectIds = useSelector((state) => state.lists.lettersObjectIds);
  const lettersObjectIdsVisible = useSelector(
    (state) => state.lists.lettersObjectIdsVisible
  );
  const callsObjectIds = useSelector((state) => state.lists.callsObjectIds);
  const callsObjectIdsVisible = useSelector(
    (state) => state.lists.callsObjectIdsVisible
  );
  const scheduledObjectIds = useSelector(
    (state) => state.lists.scheduledObjectIds
  );
  const scheduledObjectIdsVisible = useSelector(
    (state) => state.lists.scheduledObjectIdsVisible
  );
  const shutoffsObjectIds = useSelector(
    (state) => state.lists.shutoffsObjectIds
  );
  const shutoffsObjectIdsVisible = useSelector(
    (state) => state.lists.shutoffsObjectIdsVisible
  );

  const [openLettersSnackbar, setOpenLettersSnackbar] = useState(false);
  const handleCloseLettersSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenLettersSnackbar(false);
  };

  return (
    <>
      <Grid container spacing={1}>
        <Grid item xs={6}>
          <IconButton
            onClick={() => {
              dispatch(setLettersObjectIds(lettersObjIds));
              setOpenLettersSnackbar(true);
            }}
          >
            <Badge badgeContent={lettersObjectIds.length} color='primary'>
              <EmailIcon />
            </Badge>
          </IconButton>
          <Snackbar
            open={openLettersSnackbar}
            autoHideDuration={6000}
            onClose={handleCloseLettersSnackbar}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          >
            <Alert
              onClose={handleCloseLettersSnackbar}
              severity='info'
              sx={{ width: '100%' }}
            >
              {lettersObjIds.length} Loaded successfully
            </Alert>
          </Snackbar>

          <FormControlLabel
            control={
              <Checkbox
                onChange={(e) =>
                  dispatch(setLettersObjectIdsVisible(e.target.checked))
                }
                checked={lettersObjectIdsVisible}
              />
            }
            label='View on map?'
            style={{ paddingLeft: '10px' }}
          />
          <Button
            variant='text'
            onClick={() => dispatch(setLettersObjectIds([]))}
          >
            Clear
          </Button>
        </Grid>

        <Grid item xs={6}>
          <IconButton onClick={() => dispatch(setCallsObjectIds(callsObjIds))}>
            <Badge badgeContent={callsObjectIds.length} color='primary'>
              <PhoneIcon />
            </Badge>
          </IconButton>
          <FormControlLabel
            control={
              <Checkbox
                onChange={(e) =>
                  dispatch(setCallsObjectIdsVisible(e.target.checked))
                }
                checked={callsObjectIdsVisible}
              />
            }
            label='View on map?'
            style={{ paddingLeft: '10px' }}
          />
          <Button
            variant='text'
            onClick={() => dispatch(setCallsObjectIds([]))}
          >
            Clear
          </Button>
        </Grid>

        <Grid item xs={6}>
          <IconButton
            onClick={() => dispatch(setScheduledObjectIds(scheduledObjIds))}
          >
            <Badge badgeContent={scheduledObjectIds.length} color='primary'>
              <ScheduleIcon />
            </Badge>
          </IconButton>
          <FormControlLabel
            style={{ paddingLeft: '10px' }}
            control={
              <Checkbox
                onChange={(e) =>
                  dispatch(setScheduledObjectIdsVisible(e.target.checked))
                }
                checked={scheduledObjectIdsVisible}
              />
            }
            label='View on map?'
          />
          <Button
            variant='text'
            onClick={() => dispatch(setScheduledObjectIds([]))}
          >
            Clear
          </Button>
        </Grid>

        <Grid item xs={6}>
          <IconButton
            onClick={() => dispatch(setShutoffsObjectIds(shutoffObjIds))}
          >
            <Badge badgeContent={shutoffsObjectIds.length} color='primary'>
              <CloseIcon />
            </Badge>
          </IconButton>
          <FormControlLabel
            style={{ paddingLeft: '10px' }}
            control={
              <Checkbox
                onChange={(e) =>
                  dispatch(setShutoffsObjectIdsVisible(e.target.checked))
                }
                checked={shutoffsObjectIdsVisible}
              />
            }
            label='View on map?'
          />
          <Button
            variant='text'
            onClick={() => dispatch(setShutoffsObjectIds([]))}
          >
            Clear
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default ListQuery;
