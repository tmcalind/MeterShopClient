import React, { useState } from 'react'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import StatusNewWorkorderOptions from './StatusNewWorkorderOptions'
import StatusCallOptions from './StatusCallOptions';
import StatusLettersOptions from './StatusLettersOptions';
import StatusOnHoldOptions from './StatusOnHoldOptions';
import StatusScheduleOptions from './StatusScheduleOptions'

import ColdCallOptions from './ColdCallOptions';
import ShutoffOptions from './ShutoffOptions';

const statuses = [
  'NewWorkorder',
  'Call',
  'OnHold',
  'Letter1',
  'Letter2',
  'Letter3',
  'Letter4',
  'Schedule'
]

let ctr = 1;
const statusTypes = statuses.map(status => {
  const Id = ctr++ 
  return { Id, status }
})

const StatusSelector = ({currentStatus}) => {
    const [status, setStatus] = useState(currentStatus);
    console.log(statusTypes)
  return (
    <>
        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-standard-label">Status</InputLabel>
            <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={status}
                onChange={event => setStatus(event.target.value)}
                label="Status"
            >
                {statusTypes.map(statusType => <MenuItem value={statusType.status} key={statusType.Id}>{statusType.status}</MenuItem>)}
            </Select>
            {status === "NewWorkorder" && <StatusNewWorkorderOptions />}
            {status === "Call" && <StatusCallOptions />}
            {(status === 'Letter1' || 
              status === 'Letter2' || 
              status === 'Letter3' || 
              status === 'Letter4') && <StatusLettersOptions />}
            {status === 'OnHold' && <StatusOnHoldOptions />}
            {status === 'Schedule' && <StatusScheduleOptions />}
            {/* 
             {status === 'Shutoff' && <ShutoffOptions />} 
            {status === 'ColdCall' && <ColdCallOptions />}
            {status === 'Assigned' && <AssignedOptions />} */}
        </FormControl>
    </>
  )
}

export default StatusSelector