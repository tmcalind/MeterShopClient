import React, {
    useRef,
    useEffect
} from 'react'

import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import MapView from "@arcgis/core/views/MapView";

import { createMap } from "./MapTools";

import "@arcgis/core/assets/esri/themes/light/main.css";

const BaseMap = ({
        basemap,
        height,
        width,
        center,
        scale
    }) => {
        
        const mapDiv = useRef(null);

        useEffect(() => {
            if (mapDiv.current) {
                const map = createMap(basemap);
                const addressLayerUrl = "https://citymap/arcgisa/rest/services/References/AddressMaster/MapServer/0";
                const addressLayer = new FeatureLayer({
                    //Address Points
                    url: addressLayerUrl,
                    popupTemplate: {
                        title: "{FullAddress}",
                        actions: [{
                            title: "Add/Remove",
                            id: "addRemoveAction",
                            className: "esri-icon-swap"
                        }]
                    },
                    id: "Address_layer",
                    labelingInfo: [{

                        labelExpressionInfo: {
                            expression: "$feature.MunicipalNumber"
                        },
                        labelPlacement: "center-center",
                        symbol: {
                            type: "text", // autocasts as new TextSymbol()
                            font: {
                                size: 8,
                                family: "Noto Sans"
                            },
                            horizontalAlignment: "left",
                            color: "#1B4D3E"
                        },
                        minScale: 6000
                    }],
                    renderer: {
                        type: "simple",
                        symbol: {
                            type: "simple-marker",
                            size: 1,
                            color: "#1B4D3E"
                        }
                    },
                    minScale: 8000,
                    outFields: ["*"]
                });
                map.add(addressLayer);

                // add parcels
                const parcelsLayerUrl = "https://citymap/arcgisa/rest/services/References/ParcelMapping/MapServer/0"
                const parcelsLayer = new FeatureLayer({
                    url: parcelsLayerUrl,
                    id: "Parcel_layer",
                    minScale: 10000,
                    renderer: {
                        type: "simple",
                        symbol: {
                            type: "simple-fill",
                            color: [120, 134, 107, 0.2]
                        },
                    }
                });
                map.add(parcelsLayer);

                // add buildings
                const buildingsLayerUrl = "https://citymap/arcgisb/rest/services/References/TOPO/MapServer/0"
                const buildingsLayer = new FeatureLayer({
                    url: buildingsLayerUrl,
                    id: "Building_layer",
                    minScale: 8000,
                    renderer: {
                        type: "simple",
                        symbol: {
                            type: "simple-fill",
                            color: [238, 238, 238, 0.5]
                        },
                    }
                });
                map.add(buildingsLayer);

                const view = new MapView({
                    map,
                    container: mapDiv.current,
                    center,
                    scale,
                });
            }
        }, [
            basemap,
            center,
            scale
        ]);

  return (
    <>
        <div className="mapDiv" ref={mapDiv} style={{ width, height }}></div>
    </>
  )
}

export default BaseMap