import React, { useState, useEffect } from 'react'
import { useSelector } from "react-redux"

import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { DataGrid } from '@mui/x-data-grid';

import { queryFeatures } from "@esri/arcgis-rest-feature-layer";

import { WATER_METER_ADDRESSES_FEATURE_SERVER_URL } from "../../config";

const columns = [
  { field: "MeterNumber", headerName: "Meter", width: 100 },
  { field: "PremiseAddress", headerName: "Address", width: 150 },
  { field: "Status", headerName: "Status", width: 100 },
];

const CallsList = ({title}) => {
  const objectIdList = useSelector((state) => state.lists.callsObjectIds);
  const [meters, setMeters] = useState([]);
  const [viewOnMap, setViewOnMap] = useState(false);

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
      <Typography variant="h4" component="span">
            {title}
            </Typography>
      <AppBar position="static" color='primary'>
        <Toolbar >
        <FormControlLabel control={<Checkbox checked={viewOnMap} onChange={() => setViewOnMap(!viewOnMap)} />} label="View on map?" />
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

export default CallsList