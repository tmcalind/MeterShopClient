import React, { useState } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { 
    setTasks,
    setTasksVisible,
    setTasksLastUpdate,
    setSelectedWorkOrderId
} from '../slices/cityworksSlice'

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import ListItemIcon from '@mui/material/ListItemIcon';
import WorkOrderEdit from  './WorkOrderEdit'
import Modal from '@mui/material/Modal';
import Card from '@mui/material/Card'

import { 
    MdEmail as EmailIcon,
    MdPhone as PhoneIcon,
    MdClose as CloseIcon,
    MdSchedule as ScheduleIcon,
    MdTask as TaskIcon  } from 'react-icons/md';
import { ImPower as HydroIcon } from 'react-icons/im'
import { GiHalt as OnHoldIcon } from 'react-icons/gi'
import { GrScheduleNew as NewWorkorderIcon } from 'react-icons/gr'
import { RiCustomerService2Line as CrmIcon } from 'react-icons/ri'

const TaskLister = () => {
    const dispatch = useDispatch();
    const cityworksTasks = useSelector(state => state.cityworks.tasks)
    const cityworksTasksVisible = useSelector(state => state.cityworks.tasksVisible) 
    const cityworksTasksLastUpdate = useSelector(state => state.cityworks.tasksLastUpdate)

    const selectedWorkOrderId = useSelector(state => state.cityworks.selectedWorkOrderId)

    const [ selectedTaskIndex, setSelectedTaskIndex ]  = useState(0);
    const [ workOrderEditVisible, setWorkOrderEditVisible ] = useState(false);

    const itemClickHandler = (task, index) => {
        setSelectedTaskIndex(index)
        console.log(task)
        dispatch(setSelectedWorkOrderId(task.WorkOrderId))
        setWorkOrderEditVisible(true);

    }
  return (
    <>
    {cityworksTasks ? (
        <>
          {/* <AppBar position="static" color='primary'>
      <Toolbar edge="end">
        <FormControlLabel 
          control={<Checkbox color='secondary' checked={isMapVisible} onChange={() => dispatch(mapVisibleReducer(!isMapVisible))} />} 
          label="View on map?" 
        />
        <Button variant="text" color='secondary' onClick={() => dispatch(objectIdListReducer([]))} >Clear</Button>      
      </Toolbar>
    </AppBar> */}
            <List component="nav" dense={true}>
                {cityworksTasks.map((task) => (
                    <ListItem key={task.woTaskId}>
                        <ListItemButton
                            selected={selectedTaskIndex === task.woTaskId}
                            onClick={(event) => itemClickHandler(task, task.woTaskId)}
                        >
                            {/* <ListItemIcon>
                               {task.Status === "Call" && <PhoneIcon />} 
                               {task.Status === "CRM" && <CrmIcon />} 
                               {task.Status === "Letter1" && <EmailIcon />} 
                               {task.Status === "Shutoff" && <CloseIcon />} 
                               {task.Status === "Schedule" && <ScheduleIcon />} 
                               {task.Status === "OnHold" && <OnHoldIcon />} 
                               {task.Status === "NewWorkorder" && <NewWorkorderIcon />}
                            </ListItemIcon> */}
                            <ListItemText 
                                primary={task.taskName && task.workOrderId && (<>{task.taskName} {task.workOrderId}</>)}
                                secondary={task.projStartDate}
                            />

                        </ListItemButton>
                        
                    </ListItem>
                ))}
            </List>

            <Modal
            open={workOrderEditVisible}
            onClose={() => setWorkOrderEditVisible(false)}
            >
                
              <WorkOrderEdit 
                  workOrderId={selectedWorkOrderId}
                  
                />
                
            </Modal>
        </>
    ) : (
    <>
    <h1>No tasks to list</h1>
    </>)}
    
   </>
  )
}

export default TaskLister