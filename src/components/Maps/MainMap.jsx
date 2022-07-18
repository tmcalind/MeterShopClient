import React, { useRef, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedDeviceLocationId } from '../../slices/cityworksSlice';

import FeatureLayer from '@arcgis/core/layers/FeatureLayer';
import MapView from '@arcgis/core/views/MapView';

import {
  createMap,
  getDeviceLocationsFeatureLayer,
  getBuildingsFeatureLayer,
  getGraphicsLayer,
} from './MapTools';

import '@arcgis/core/assets/esri/themes/light/main.css';

const MainMap = ({ basemap, height, width, center, scale }) => {
  const dispatch = useDispatch();
  const mapDiv = useRef(null);
  const selectedDeviceLocationId = useSelector(
    (state) => state.cityworks.selectedDeviceLocationId
  );

  const cityworksTasks = useSelector((state) => state.cityworks.tasks);
  const cityworksTasksVisible = true; // useSelector(state => state.cityworks.tasksVisible)

  const loadMap = useCallback(() => {
    if (mapDiv.current) {
      const map = createMap(basemap);

      // add buildings
      map.add(getBuildingsFeatureLayer());

      const deviceLocationsFeatureLayer = getDeviceLocationsFeatureLayer();
      map.add(deviceLocationsFeatureLayer);

      const view = new MapView({
        map,
        container: mapDiv.current,
        center,
        scale,
      });

      view.on('click', (event) => {
        view.hitTest(event).then((event) => {
          if (event.results) {
            event.results.forEach((result) => {
              if (result.graphic.layer.name) {
                if (result.graphic.layer.name === 'DeviceLocations') {
                  dispatch(
                    setSelectedDeviceLocationId({
                      id: result.graphic.attributes.Id,
                      type: result.graphic.layer.name,
                    })
                  );
                }
              }
            });
          }
        });
      });
    }
  }, [basemap, center, scale, selectedDeviceLocationId]);

  useEffect(() => {
    loadMap();
  }, [basemap, center, scale]);

  return (
    <>
      <div className='mapDiv' ref={mapDiv} style={{ width, height }}></div>
    </>
  );
};

export default MainMap;
