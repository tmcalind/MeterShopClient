import React, { useState } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { 
  setHydroServiceOrderObjectIds,
  setHydroServiceOrderObjectIdsVisible,
  setHydroNotificationObjectIds,
  setHydroNotificationObjectIdsVisible,
  setCrmObjectIds,
  setCrmObjectIdsVisible,
  setLettersObjectIds,
  setLettersObjectIdsVisible,
  setCallsObjectIds,
  setCallsObjectIdsVisible,
  setShutoffsObjectIds,
  setShutoffsObjectIdsVisible,
  setScheduledObjectIds,
  setScheduledObjectIdsVisible
} from '../slices/listSlice'

import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

import MeterLister from './MeterLister'
import TaskLister from './TaskLister'
import HydroLister from './HydroLister'


function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box >
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

const MasterLists = () => {
  const dispatch = useDispatch();

  const hydroServiceOrders = useSelector(state => state.hydro.serviceOrders)
  const hydroServiceOrderVisible = useSelector(state => state.hydro.serviceOrdersVisible)
  const hydroNotifications = useSelector(state => state.hydro.notifications)
  const hydroNotificationVisible = useSelector(state => state.hydro.notificationsVisible)
  const hydroNotificationLastUpdate = useSelector(state => state.hydro.notificationsLastUpdate)
  const crmObjectIds = useSelector(state => state.lists.crmObjectIds)
  const crmObjectIdsVisible = useSelector(state => state.lists.crmObjectIdsVisible)

  const lettersObjectIds = useSelector(state => state.lists.lettersObjectIds)
  const lettersObjectIdsVisible = useSelector(state => state.lists.lettersObjectIdsVisible)
  const callsObjectIds = useSelector(state => state.lists.callsObjectIds)
  const callsObjectIdsVisible = useSelector(state => state.lists.callsObjectIdsVisible)
  const scheduledObjectIds = useSelector(state => state.lists.scheduledObjectIds)
  const scheduledObjectIdsVisible = useSelector(state => state.lists.scheduledObjectIdsVisible)
  const shutoffsObjectIds = useSelector(state => state.lists.shutoffsObjectIds)
  const shutoffsObjectIdsVisible = useSelector(state => state.lists.shutoffsObjectIdsVisible)

  const [ selectedTab, setSelectedTab ] = useState(0)

  const tabChangeHandler = (event, newValue) => {
      setSelectedTab(newValue)
  }
  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={selectedTab} onChange={tabChangeHandler}>
          <Tab label="Hydro Service Orders" />
          <Tab label="Hydro Notifications" />
          <Tab label="My Tasks" />
          {/* <Tab label="CRM" /> */}
          {/* <Tab label="Letters 1-4"/> */}
          {/* <Tab label="Calls"/>
          <Tab label="Shutoffs"/>
          <Tab label="Scheduled"/> */}
        </Tabs> 
      </Box>

      <TabPanel value={selectedTab} index={0}>
          <HydroLister 
            serviceOrders={hydroServiceOrders}          
          />
      </TabPanel>

      <TabPanel value={selectedTab} index={1}>
        <HydroLister 
          notifications={hydroNotifications}
        />
      </TabPanel>

      <TabPanel value={selectedTab} index={2}>
        <TaskLister/>
      </TabPanel>
      
      {/* <TabPanel value={selectedTab} index={3}>
        <MeterLister 
          title="CRM"
          objectIdList={crmObjectIds}
          objectIdListReducer={setCrmObjectIds}
          isMapVisible={crmObjectIdsVisible}
          mapVisibleReducer={setCrmObjectIdsVisible}
        />
      </TabPanel>
      
      <TabPanel value={selectedTab} index={4}>
        <MeterLister  
          title="Letters " 
          objectIdList={lettersObjectIds} 
          objectIdListReducer={setLettersObjectIds}
          isMapVisible={lettersObjectIdsVisible} 
          mapVisibleReducer={setLettersObjectIdsVisible}
        />
      </TabPanel> */}
      {/* <TabPanel value={selectedTab} index={4}>
        <MeterLister  
          title="Calls " 
          objectIdList={callsObjectIds} 
          objectIdListReducer={setCallsObjectIds}
          isMapVisible={callsObjectIdsVisible} 
          mapVisibleReducer={setCallsObjectIdsVisible}
        />
      </TabPanel>
      <TabPanel value={selectedTab} index={5}>
        <MeterLister  
          title="Shutoff " 
          objectIdList={shutoffsObjectIds} 
          objectIdListReducer={setShutoffsObjectIds}
          isMapVisible={shutoffsObjectIdsVisible} 
          mapVisibleReducer={setShutoffsObjectIdsVisible}
        />
      </TabPanel>
      <TabPanel value={selectedTab} index={6}>
        <MeterLister  
          title="Scheduled " 
          objectIdList={scheduledObjectIds} 
          objectIdListReducer={setScheduledObjectIds} 
          isMapVisible={scheduledObjectIdsVisible} 
          mapVisibleReducer={setScheduledObjectIdsVisible}
        />
      </TabPanel> */}
    </Box>
  )
}

export default MasterLists