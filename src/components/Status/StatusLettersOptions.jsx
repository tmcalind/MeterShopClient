import React, { useState } from 'react'

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Button } from '@mui/material';
import { FormControlLabel } from '@mui/material';
import { Checkbox } from '@mui/material';


const StatusLettersOptions = () => {
    const [ reminderDate, setReminderDate ] = useState(new Date('2022-05-05T12:01:00')); 
    const [ printOnSubmit, setPrintOnSubmit ] = useState(false);
  return (
    <Box sx={{ width: '100%', paddingTop: '12px' }}>
        <Stack spacing={2}>
        <FormControlLabel 
            sx={{paddingLeft: "20px"}}
            control={
                <Checkbox 
                    checked={printOnSubmit} 
                    onChange={(e) => setPrintOnSubmit(e.target.checked)} 
                />
            } 
                        label="Print on submit?"
                    />
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

export default StatusLettersOptions