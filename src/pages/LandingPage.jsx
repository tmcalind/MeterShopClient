import React from 'react'

import LandingAppBar from '../components/LandingAppBar'
import MainMap from '../components/Maps/MainMap'
import { esriMapStreets } from '../components/Maps/MapConfigs'

const LandingPage = ({ message }) => {
  return (
    <>
        <LandingAppBar title="MeterShop Home" />
        
        <h1>LandingPage</h1>
        <h5>{message}</h5>
   
    </>
  )
}

export default LandingPage