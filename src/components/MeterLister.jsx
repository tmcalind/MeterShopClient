import React, { useState, useEffect } from 'react'
import { useDispatch } from "react-redux"

import Button from '@mui/material/Button'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { DataGrid } from '@mui/x-data-grid';

import { queryFeatures } from "@esri/arcgis-rest-feature-layer";

import { WATER_METER_ADDRESSES_FEATURE_SERVER_URL } from "../config";

const columns = [
  { field: "MeterNumber", headerName: "Meter", width: 100 },
  { field: "PremiseAddress", headerName: "Address", width: 150 },
  { field: "Status", headerName: "Status", width: 100 },
];

const MeterLister = ({title, objectIdList, objectIdListReducer, isMapVisible, mapVisibleReducer}) => {
  const dispatch = useDispatch();
    const [meters, setMeters] = useState([]);


    useEffect(() => {
        if (objectIdList && objectIdList.length > 0) {
          // fetch feature info
          queryFeatures({
            url: WATER_METER_ADDRESSES_FEATURE_SERVER_URL,
            objectIds: objectIdList,
          }).then((response) => {
            const featureAttributes = response.features.map((item) => {
              return {
                id: item.attributes.OBJECTID,
                ...item.attributes,
              };
            });
            setMeters(featureAttributes);
            console.log(featureAttributes);
          });
        }
        else {
          setMeters([]);
        }
      }, [objectIdList]);
      
  return (
    <div style={{ height: 600, width: '100%' }}> 
    <AppBar position="static" color='primary'>
      <Toolbar edge="end">
        <FormControlLabel 
          control={<Checkbox color='secondary' checked={isMapVisible} onChange={() => dispatch(mapVisibleReducer(!isMapVisible))} />} 
          label="View on map?" 
        />
        <Button variant="text" color='secondary' onClick={() => dispatch(objectIdListReducer([]))} >Clear</Button>      
      </Toolbar>
    </AppBar>
    <DataGrid
      rows={meters}
      columns={columns}
      pageSize={25}
      rowsPerPageOptions={[5,10,25]}
      checkboxSelection
      disableSelectionOnClick
      density='compact'
    />
  </div>
  )
}

export default MeterLister