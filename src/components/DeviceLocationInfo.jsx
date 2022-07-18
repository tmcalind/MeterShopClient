import React, { useEffect, useCallback, useState } from 'react';
import { useSelector } from 'react-redux';

import { Card, CardContent, Grid, Typography } from '@mui/material';

import { FiX as ClearIcon, FiMap as MapIcon } from 'react-icons/fi';

import { METERSHOPSERVER_BASE_URL } from '../config';

const DeviceLocationInfo = () => {
  const selectedDeviceLocationId = useSelector(
    (state) => state.cityworks.selectedDeviceLocationId
  );
  const [deviceLocation, setDeviceLocation] = new useState();
  const [meter, setMeter] = new useState();

  const formatInstallDate = (dateText) => {
    const nowDate = new Date()
    const inDate = new Date(dateText)
    const diffYears = nowDate.getFullYear() - inDate.getFullYear()
    return `${inDate.getFullYear()}-${inDate.getMonth()}-${inDate.getDate()} (${diffYears} yrs.)`;
  }

  const getDeviceLocationInfo = useCallback(
    (selectedDeviceLocationId) => {
      const meterShopServerUrl = `${METERSHOPSERVER_BASE_URL}/GetDeviceLocation/${selectedDeviceLocationId.id}`;
      fetch(meterShopServerUrl)
        .then((response) => response.json())
        .then((data) => {
          if (data?.payload?.DeviceLocation) {
            setDeviceLocation(data.payload.DeviceLocation);
          }
          if (data?.payload?.Meter) {
            setMeter(data.payload.Meter);
          }
        });
    },
    [selectedDeviceLocationId]
  );

  useEffect(() => {
    getDeviceLocationInfo(selectedDeviceLocationId);
  }, [selectedDeviceLocationId]);

  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        {selectedDeviceLocationId && selectedDeviceLocationId.id?.length > 0 ? (
          <Card variant='outlined'>
            <CardContent>
              {meter && (
                <>
                  <Typography variant='h4' component='div'>
                    {meter.id}
                  </Typography>
                  <Typography variant='body1' component='div'>
                    {meter.manufacturer} {meter.meterType} ({meter.meterSize} cm.)
                  </Typography>
                  <Typography variant='body1' gutterBottom component='div'>
                    {formatInstallDate(meter.installDate)}
                  </Typography>
                </>
              )}
              {deviceLocation && (
                <>
                  <Typography variant='h5' component='div'>
                  {deviceLocation.premiseAddress}
                  </Typography>
              
                  <Typography variant='body1' component='div'>
                    {deviceLocation.curbstopLocation}
                  </Typography>
                  <Typography variant='body2' component='div'>
                    Id: {deviceLocation.id} Contract: {deviceLocation.contracts} (acct: {deviceLocation.contractAccount})
                  </Typography>
                  <Typography variant='body2' component='div'>
                    Rate class: {deviceLocation.rateClass} Register: {deviceLocation.register}
                  </Typography>

                </>
              )}
            </CardContent>
          </Card>
        ) : (
          <Card variant='outlined'>
            <CardContent>Select a Meter</CardContent>
          </Card>
        )}
      </Grid>
    </Grid>
  );
};

export default DeviceLocationInfo;
