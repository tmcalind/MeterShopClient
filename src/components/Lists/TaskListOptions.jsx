import React from 'react'
import { useSelector, useDispatch } from "react-redux"
import { 
    setTasks,
    setTasksVisible,
    setTasksLastUpdate,
} from '../../slices/cityworksSlice'

import Box from '@mui/material/Box'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import { 
    CITYWORKS_REST_BASE_URL,
    METERSHOPSERVER_BASE_URL
} from '../../config'

const modalBoxStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 300,
    bgcolor: 'background.paper',
  };



const TaskListOptions = () => {
    const dispatch = useDispatch();
    const cityworksTasks = useSelector(state => state.cityworks.tasks)
    const cityworksTasksVisible = useSelector(state => state.cityworks.tasksVisible)
    const cityworksTasksLastUpdate = useSelector(state => state.cityworks.tasksLastUpdate)
    const dt = new Date();

    const updateHandler = (e) => {
      
        const request = {
           requester: 'Me',
           action: 'CITYWORKS_GET_WORKORDERTASKS' ,
           payload: {}
        };

        fetch(METERSHOPSERVER_BASE_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(request)
        })
            .then(response => response.json())
            .then(data => {
                dispatch(setTasks(data?.payload?.WorkOrderTasks))
                dispatch(setTasksLastUpdate(`${dt.toDateString()} @ ${dt.toLocaleTimeString()}`));
            })
            .catch(error => console.error(error))
    }

    return (
        // <Box sx={modalBoxStyle}>
            <Card sx={modalBoxStyle}>
                <CardContent >
                    <p>There are {cityworksTasks.length} tasks currently assigned</p>
                    <p>The last Update was</p><p>{cityworksTasksLastUpdate}</p>
                    <FormControlLabel 
                        control={
                            <Checkbox 
                                checked={cityworksTasksVisible} 
                                onChange={(e) => dispatch(setTasksVisible(e.target.checked))} 
                            />
                        } 
                        label="View on Map"
                    />
                </CardContent>
                <CardActions>
                    <Button 
                        onClick={updateHandler} size="small">Update</Button>
                </CardActions>
            </Card>
        // </Box>   
  )
}

export default TaskListOptions