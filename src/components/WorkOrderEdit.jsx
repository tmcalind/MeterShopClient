import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import { CITYWORKS_REST_BASE_URL } from '../config';
import StatusSelector from './Status/StatusSelector';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

const modalBoxStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 1100,
  height: 750,
  bgcolor: '#ffecb3',
};

const WorkOrderEdit = ({ workOrderId }) => {
  const selectedWorkOrderId = useSelector(
    (state) => state.cityworks.selectedWorkOrderId
  );

  const [selectedWorkOrder, setSelectedWorkOrder] = useState(null);

  useEffect(() => {
    const workOrdersUrl =
      CITYWORKS_REST_BASE_URL + '/workOrders/' + workOrderId;
    console.log(workOrdersUrl);
    fetch(workOrdersUrl)
      .then((response) => response.json())
      .then((data) => setSelectedWorkOrder(data));
  }, [selectedWorkOrderId, workOrderId]);

  return (
    <>
      {selectedWorkOrder && (
        <Card sx={modalBoxStyle}>
          <CardContent>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <Card
                  sx={{
                    height: '100px',
                    bgcolor: '#fff8e1',
                    paddingLeft: '10px',
                  }}
                >
                  <Grid container spacing={1}>
                    <Grid item xs={9}>
                      <h4>
                        Water Service Maintenance Order:{' '}
                        {selectedWorkOrder.WorkOrderId}
                      </h4>
                    </Grid>
                    <Grid item xs={3}>
                      <p>Current Status: {selectedWorkOrder.Status}</p>
                      <p>Order Date: {selectedWorkOrder.InitiateDate}</p>
                    </Grid>
                  </Grid>
                </Card>
              </Grid>

              <Grid item xs={3}>
                <Stack spacing={1}>
                  <Card
                    sx={{
                      height: '200px',
                      bgcolor: '#fff8e1',
                      paddingLeft: '10px',
                    }}
                  >
                    <h4>Order Details</h4>
                  </Card>
                  <Card
                    sx={{
                      height: '350px',
                      bgcolor: '#fff8e1',
                      paddingLeft: '10px',
                    }}
                  >
                    <h4>Current Meter Service Information</h4>
                  </Card>
                </Stack>
              </Grid>

              <Grid item xs={6}>
                <Stack spacing={1}>
                  <Card
                    sx={{
                      height: '200px',
                      bgcolor: '#fff8e1',
                      paddingLeft: '10px',
                    }}
                  >
                    <h4>Instructions</h4>
                  </Card>
                  <Card
                    sx={{
                      height: '200px',
                      bgcolor: '#fff8e1',
                      paddingLeft: '10px',
                    }}
                  >
                    <h4>Work Order Action</h4>
                    <p>New Meter</p>
                    <p>Old Meter Read NewMeter Read</p>
                    <p>Additional Information</p>
                    <p>SCB Location</p>
                  </Card>
                  <Card
                    sx={{
                      height: '100%',
                      bgcolor: '#fff8e1',
                      paddingLeft: '10px',
                    }}
                  >
                    <h4>Completion Information</h4>
                    {selectedWorkOrder.ActualFinishDate && (
                      <p>***{selectedWorkOrder.ActualFinishDate}</p>
                    )}
                    {/* {selectedWorkOrder.ActualFinishDate ? (
                <>
                <h1>{selectedWorkOrder.ActualFinishDate}</h1>
                <Button>Complete Workorder</Button></>) : (
                  <>
                    <p>Completed By</p>
                    <p>Date/Time</p>
                    
                  </>
                  
                )} */}
                  </Card>
                </Stack>
              </Grid>

              <Grid item xs={3}>
                {selectedWorkOrder && (
                  <Card
                    sx={{
                      height: '550px',
                      bgcolor: '#fff8e1',
                    }}
                  >
                    <StatusSelector currentStatus={selectedWorkOrder.Status} />
                  </Card>
                )}
              </Grid>
            </Grid>
          </CardContent>
          <CardActions>
            <Button>Take Photo</Button>
            <Button>Attach Photo</Button>
            <Button>Submit to SAP</Button>
          </CardActions>
        </Card>
      )}
    </>
  );
};

export default WorkOrderEdit;
