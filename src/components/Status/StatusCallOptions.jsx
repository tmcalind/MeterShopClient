import React, { useState } from 'react'

import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { 
  Box, 
  Button, 
  Stack,
  TextField 
} from '@mui/material';

const StatusCallOptions = () => {
  const [ reminderDate, setReminderDate ] = useState(new Date('2022-05-05T12:01:00')); 
  return (
    <Box sx={{ width: '100%', paddingTop: '12px' }}>
      <Stack spacing={2}>
        <LocalizationProvider dateAdapter={AdapterMoment}>
          <DateTimePicker
              label="Reminder date/time"
              value={reminderDate}
              onChange={newValue => setReminderDate(newValue)}
              renderInput={(params) => <TextField {...params} />}
              size={"small"}
          />
        </LocalizationProvider>
        <TextField
            label="Contact name"
            size={"small"}
        />
        <TextField
            label="Phone"
            size={"small"}
        />
        <TextField
            label="Alt. phone"
            size={"small"}
        />
        <TextField
            id="outlined-multiline-static"
            label="Notes"
            multiline
            rows={6}
            size={"small"}
        />
        <Button variant='contained'>Set new status/task</Button>
      </Stack>
    </Box>
  )
}

export default StatusCallOptions