import React from 'react'
import StatusSelector from './StatusSelector'


const StatusSet = () => {
    const currentStatus = "Call";

  return (
    <div>
        <StatusSelector currentStatus={currentStatus}  />
    </div>
  )
}

export default StatusSet