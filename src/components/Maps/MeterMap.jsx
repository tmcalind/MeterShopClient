import React, { useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setWorkOrder } from '../../slices/workOrderSlice';

import FeatureLayer from '@arcgis/core/layers/FeatureLayer';
import MapView from '@arcgis/core/views/MapView';

import {
  createMap,
  getMetersFeatureLayer,
  getGraphicsLayer,
  tasksSymbol,
  lettersSymbol,
  callsSymbol,
  scheduledSymbol,
  shutoffsSymbol,
  hydroSymbol,
  crmSymbol,
} from './MapTools';

import '@arcgis/core/assets/esri/themes/light/main.css';

const MeterMap = ({ basemap, height, width, center, scale }) => {
  const dispatch = useDispatch();

  const cityworksTasks = useSelector((state) => state.cityworks.tasks);
  const cityworksTasksVisible = true; // useSelector(state => state.cityworks.tasksVisible)

  const hydroServiceOrderObjectIds = useSelector(
    (state) => state.lists.hydroServiceOrderObjectIds
  );
  const hydroServiceOrderObjectIdsVisible = useSelector(
    (state) => state.lists.hydroServiceOrderObjectIdsVisible
  );

  const hydroNotificationObjectIds = useSelector(
    (state) => state.lists.hydroNotificationObjectIds
  );
  const hydroNotificationObjectIdsVisible = useSelector(
    (state) => state.lists.hydroNotificationObjectIdsVisible
  );

  const crmObjectIds = useSelector((state) => state.lists.crmObjectIds);
  const crmObjectIdsVisible = useSelector(
    (state) => state.lists.crmObjectIdsVisible
  );

  const lettersObjectIds = useSelector((state) => state.lists.lettersObjectIds);
  const lettersObjectIdsVisible = useSelector(
    (state) => state.lists.lettersObjectIdsVisible
  );

  const callsObjectIds = useSelector((state) => state.lists.callsObjectIds);
  const callsObjectIdsVisible = useSelector(
    (state) => state.lists.callsObjectIdsVisible
  );

  const scheduledObjectIds = useSelector(
    (state) => state.lists.scheduledObjectIds
  );
  const scheduledObjectIdsVisible = useSelector(
    (state) => state.lists.scheduledObjectIdsVisible
  );

  const shutoffsObjectIds = useSelector(
    (state) => state.lists.shutoffsObjectIds
  );
  const shutoffsObjectIdsVisible = useSelector(
    (state) => state.lists.shutoffsObjectIdsVisible
  );

  const mapDiv = useRef(null);

  useEffect(() => {
    const loadMap = () => {
      if (mapDiv.current) {
        const map = createMap(basemap);

        // add parcels
        // const parcelsLayerUrl = "https://citymap/arcgisa/rest/services/References/ParcelMapping/MapServer/0"
        // const parcelsLayer = new FeatureLayer({
        //     url: parcelsLayerUrl,
        //     id: "Parcel_layer",
        //     minScale: 10000,
        //     renderer: {
        //         type: "simple",
        //         symbol: {
        //             type: "simple-fill",
        //             color: [120, 134, 107, 0.2]
        //         },
        //     }
        // });
        // map.add(parcelsLayer);

        // add buildings
        const buildingsLayerUrl =
          'https://citymap/arcgisb/rest/services/References/TOPO/MapServer/0';
        const buildingsLayer = new FeatureLayer({
          url: buildingsLayerUrl,
          id: 'Building_layer',
          minScale: 8000,
          renderer: {
            type: 'simple',
            symbol: {
              type: 'simple-fill',
              color: [238, 238, 238, 0.5],
            },
          },
        });
        map.add(buildingsLayer);

        const meterFeatureLayer = getMetersFeatureLayer();
        console.log(cityworksTasksVisible, cityworksTasks);

        if (cityworksTasksVisible) {
          if (cityworksTasks && cityworksTasks.length > 0) {
            const cityworksTasksObjectIds = cityworksTasks.map(
              (task) => task.ObjectId
            );
            console.log('tasks object ids', cityworksTasksObjectIds);
            map.add(
              getGraphicsLayer(
                cityworksTasksObjectIds,
                meterFeatureLayer,
                tasksSymbol,
                'cityworksTasks'
              )
            );
          }
        }

        if (hydroServiceOrderObjectIdsVisible) {
          if (
            hydroServiceOrderObjectIds &&
            hydroServiceOrderObjectIds.length > 0
          ) {
            map.add(
              getGraphicsLayer(
                hydroServiceOrderObjectIds,
                meterFeatureLayer,
                hydroSymbol,
                'hydroServiceOrders'
              )
            );
          }
        }

        if (hydroNotificationObjectIdsVisible) {
          if (
            hydroNotificationObjectIds &&
            hydroNotificationObjectIds.length > 0
          ) {
            map.add(
              getGraphicsLayer(
                hydroNotificationObjectIds,
                meterFeatureLayer,
                hydroSymbol,
                'hydroNotifications'
              )
            );
          }
        }

        if (crmObjectIdsVisible) {
          if (crmObjectIds && crmObjectIds.length > 0) {
            map.add(
              getGraphicsLayer(
                crmObjectIds,
                meterFeatureLayer,
                crmSymbol,
                'crm'
              )
            );
          }
        }

        if (lettersObjectIdsVisible) {
          if (lettersObjectIds && lettersObjectIds.length > 0) {
            const lettersLayer = getGraphicsLayer(
              lettersObjectIds,
              meterFeatureLayer,
              lettersSymbol,
              'letters'
            );
            map.add(lettersLayer);
          }
        }

        if (callsObjectIdsVisible) {
          if (callsObjectIds && callsObjectIds.length > 0) {
            const callsLayer = getGraphicsLayer(
              callsObjectIds,
              meterFeatureLayer,
              callsSymbol,
              'calls'
            );
            map.add(callsLayer);
          }
        }

        if (scheduledObjectIdsVisible) {
          if (scheduledObjectIds && scheduledObjectIds.length > 0) {
            const scheduledLayer = getGraphicsLayer(
              scheduledObjectIds,
              meterFeatureLayer,
              scheduledSymbol,
              'scheduled'
            );
            map.add(scheduledLayer);
          }
        }

        if (shutoffsObjectIdsVisible) {
          if (shutoffsObjectIds && shutoffsObjectIds.length > 0) {
            const shutoffsLayer = getGraphicsLayer(
              shutoffsObjectIds,
              meterFeatureLayer,
              shutoffsSymbol,
              'shutoffs'
            );
            map.add(shutoffsLayer);
          }
        }

        map.add(meterFeatureLayer);

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
                  console.log(
                    result.graphic.layer.name,
                    result.graphic.attributes
                  );
                  dispatch(
                    setWorkOrder({
                      id: result.graphic.attributes.OBJECTID,
                      type: result.graphic.layer.name,
                    })
                  );
                }
              });
            }
          });
        });
      }
    };

    loadMap();
  }, [
    dispatch,
    basemap,
    center,
    scale,
    cityworksTasks,
    cityworksTasksVisible,
    hydroServiceOrderObjectIds,
    hydroServiceOrderObjectIdsVisible,
    hydroNotificationObjectIds,
    hydroNotificationObjectIdsVisible,
    crmObjectIds,
    crmObjectIdsVisible,
    lettersObjectIds,
    lettersObjectIdsVisible,
    callsObjectIds,
    callsObjectIdsVisible,
    scheduledObjectIds,
    scheduledObjectIdsVisible,
    shutoffsObjectIds,
    shutoffsObjectIdsVisible,
  ]);

  return (
    <>
      <div className='mapDiv' ref={mapDiv} style={{ width, height }}></div>
    </>
  );
};

export default MeterMap;
