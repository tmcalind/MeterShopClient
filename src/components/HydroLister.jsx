import React from 'react'
import { useSelector } from "react-redux"
import { DataGrid } from '@mui/x-data-grid';

const serviceOrdersColumns = [
  { field: "ORDERID", headerName: "Order Id", width: 120 },
  { field: "ENTER_DATE", headerName: "Date", width: 100 },
  { field: "SHORT_TEXT", headerName: "Description", width: 400 },
]

const notificationsColumns = [
  { field: "FUNCLOC", headerName: "Device Location", width: 100 },
  { field: "EQUIPMENT", headerName: "Meter", width: 100 },
  { field: "DESCRIPT", headerName: "Description", width: 200 },
];

const HydroLister = ({ serviceOrders, notifications }) => {

  return (
    <div>
      {serviceOrders && serviceOrders.length > 0 && (
        <div style={{ height: 600, width: '100%' }}> 
          <DataGrid
            rows={serviceOrders}
            columns={serviceOrdersColumns}
            pageSize={25}
            rowsPerPageOptions={[5,10,25]}
            checkboxSelection
            disableSelectionOnClick
            density='compact'
          />
        </div>
      )}
      {notifications && notifications.length > 0 && (
          <div style={{ height: 600, width: '100%' }}> 
            <DataGrid
              rows={notifications}
              columns={notificationsColumns}
              pageSize={25}
              rowsPerPageOptions={[5,10,25]}
              checkboxSelection
              disableSelectionOnClick
              density='compact'
            />
          </div>
      )
      }
    </div>
  )
}

export default HydroLister