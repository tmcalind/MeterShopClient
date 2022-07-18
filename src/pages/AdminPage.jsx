import React, { useState } from 'react';
import { useSelector } from 'react-redux';
// import Card from '@mui/material/Card'
import { Container, Grid, Paper, Card } from '@mui/material';
import AdminAppBar from '../components/AdminAppBar';
import MasterLists from '../components/MasterLists';
import MeterMap from '../components/Maps/MeterMap';
import MainMap from '../components/Maps/MainMap';
import { esriMapStreets } from '../components/Maps/MapConfigs';
import WorkOrderEdit from '../components/WorkOrderEdit';
import Modal from '@mui/material/Modal';
import Stack from '@mui/material/Stack';
import DeviceLocationInfo from '../components/DeviceLocationInfo';

const AdminPage = () => {
  const selectedDeviceLocationId = useSelector(
    (state) => state.cityworks.selectedDeviceLocationId
  );

  const workOrderType = useSelector((state) => state.workOrder.WorkOrderType);

  const selectedWorkOrderId = useSelector(
    (state) => state.cityworks.selectedWorkOrderId
  );
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <AdminAppBar title='MeterShop Admin' />
      <Container maxWidth='xl' style={{ paddingTop: '15px' }}>
        <Paper
          style={{
            paddingLeft: '10px',
            paddingRight: '10px',
            paddingBottom: '10px',
          }}
        >
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <MasterLists />
            </Grid>
            <Grid item xs={6}>
              {/* <MeterMap {...esriMapStreets}/> */}
              {selectedDeviceLocationId && selectedDeviceLocationId.id?.length > 0 ? (
                <>
                  <Stack spacing={1}>
                    <DeviceLocationInfo />
                    <MainMap {...esriMapStreets} />
                  </Stack>
                </>
              ) : (
                <>
                  <MainMap {...esriMapStreets} />
                </>
              )}

              
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </>
  );
};

export default AdminPage;
