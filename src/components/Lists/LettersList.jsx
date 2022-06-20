import React, { useState } from 'react'

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  { field: "MeterNumber", headerName: "Meter", width: 100 },
  { field: "PremiseAddress", headerName: "Address", width: 150 },
  { field: "Status", headerName: "Status", width: 100 },
];

const rows = [
  { id: 1, MeterNumber: 'W000001', PremiseAddress: '123 Any St', Status: 'Letter2' },
  { id: 2, MeterNumber: 'W000002', PremiseAddress: '125 Any St', Status: 'Letter1' },
  { id: 3, MeterNumber: 'W000003', PremiseAddress: '127 Any St', Status: 'Letter1' },
  { id: 4, MeterNumber: 'W000004', PremiseAddress: '129 Any St', Status: 'Letter1' },
  { id: 5, MeterNumber: 'W000005', PremiseAddress: '131 Any St', Status: 'Letter1' },
  { id: 6, MeterNumber: 'W000006', PremiseAddress: '133 Any St', Status: 'Letter1' },
  { id: 7, MeterNumber: 'W000007', PremiseAddress: '135 Any St', Status: 'Letter1' },
  { id: 8, MeterNumber: 'W000008', PremiseAddress: '137 Any St', Status: 'Letter1' },
  { id: 9, MeterNumber: 'W000009', PremiseAddress: '139 Any St', Status: 'Letter1' },
];

const LettersList = () => {
  const [viewOnMap, setViewOnMap] = useState(false);
  return (
    <div style={{ height: 600, width: '100%' }}>
      <AppBar position="static">
        <Toolbar>
        <FormControlLabel control={<Checkbox checked={viewOnMap} onChange={() => setViewOnMap(!viewOnMap)} />} label="View on map?" />
        </Toolbar>
      </AppBar>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableSelectionOnClick
        density='compact'
      />
    </div>
  )
}

export default LettersList