import WebMap from "@arcgis/core/WebMap";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer";
import UniqueValueRenderer from "@arcgis/core/renderers/UniqueValueRenderer";
import TextSymbol from '@arcgis/core/symbols/TextSymbol'
import "@arcgis/core/assets/esri/themes/light/main.css";

import { WATER_METER_ADDRESSES_FEATURE_SERVER_URL } from '../../config'

const inServiceGreen = [17, 102, 0];
const markedBlue = [0, 38, 230];
const letter1Yellow = [255, 255, 0];
const letter2Orange = [255, 187, 51];
const letter3OrangeRed = [255, 153, 102];
const letter4RedOrange = [255, 143, 80];
const scheduledBlack = [0, 0, 0];
const symbolOpacity = 1.0;
const symbolSize = 8;
const symbolOutlineWidth = 3;

const waterMeterRenderer = new UniqueValueRenderer({
  field: "Status",
  defaultSymbol: { type: "simple-marker" },
  uniqueValueInfos: [
    {
      value: "InService",
      type: "simple",

      symbol: {
        type: "simple-marker",
        size: symbolSize,
        color: [...inServiceGreen, symbolOpacity],
        outline: {
          width: symbolOutlineWidth,
          color: [...inServiceGreen, symbolOpacity],
        },
      },
    },
    {
      value: "Marked",
      type: "simple",
      symbol: {
        type: "simple-marker",
        size: symbolSize,
        color: [...markedBlue, symbolOpacity],
        outline: {
          width: symbolOutlineWidth,
          color: [...markedBlue, symbolOpacity],
        },
      },
    },
    {
      value: "Letter1",
      type: "simple",
      symbol: {
        type: "simple-marker",
        size: symbolSize,
        color: [...letter1Yellow, symbolOpacity],
        outline: {
          width: symbolOutlineWidth,
          color: [...markedBlue, symbolOpacity],
        },
      },
    },
    {
      value: "Letter2",
      type: "simple",
      symbol: {
        type: "simple-marker",
        size: symbolSize,
        color: [...letter2Orange, symbolOpacity],
        outline: {
          width: symbolOutlineWidth,
          color: [...markedBlue, symbolOpacity],
        },
      },
    },
    {
      value: "Letter3",
      type: "simple",
      symbol: {
        type: "simple-marker",
        size: symbolSize,
        color: [...letter3OrangeRed, symbolOpacity],
        outline: {
          width: symbolOutlineWidth,
          color: [...markedBlue, symbolOpacity],
        },
      },
    },
    {
      value: "Letter4",
      type: "simple",
      symbol: {
        type: "simple-marker",
        size: symbolSize,
        color: [...letter4RedOrange, symbolOpacity],
        outline: {
          width: symbolOutlineWidth,
          color: [...markedBlue, symbolOpacity],
        },
      },
    },
    {
      value: "ShutoffNotice",
      type: "simple",
      symbol: {
        type: "simple-marker",
        size: symbolSize,
        color: [...letter4RedOrange, symbolOpacity],
        outline: {
          width: symbolOutlineWidth,
          color: [...markedBlue, symbolOpacity],
        },
      },
    },
    {
      value: "Scheduled",
      type: "simple",
      symbol: {
        type: "simple-marker",
        size: symbolSize,
        color: [...scheduledBlack, symbolOpacity],
        outline: {
          width: symbolOutlineWidth,
          color: [...scheduledBlack, symbolOpacity],
        },
      },
    },
  ],
});

let waterMeterLabelArcade = "var meterNumberLine = $feature.METERNUMBER;";
waterMeterLabelArcade += "var premiseAddressLine = $feature.PREMISEADDRESS;";
waterMeterLabelArcade += "var installed = $feature.INSTALLDATE;";
waterMeterLabelArcade +=
  "var inServiceYears = DateDiff(Now(), installed, 'years');";
waterMeterLabelArcade +=
  "var inServiceLine = 'In service ' + Round(inServiceYears) + ' yrs';";
waterMeterLabelArcade +=
  "var labels = [ meterNumberLine, premiseAddressLine, inServiceLine ];";
waterMeterLabelArcade += "return Concatenate(labels, TextFormatting.NewLine);";

const waterMeterLabelingInfo = {
  labelExpressionInfo: {
    expression: waterMeterLabelArcade,
  },
  labelPlacement: "below-center",
  symbol: {
    type: "text", // autocasts as new TextSymbol()
    font: {
      size: 9,
      family: "Noto Sans",
    },
    horizontalAlignment: "left",
    color: "#2b2b2b",
  },
  minScale: 6000,
};

let meterStatusLabelArcade = "var meterStatus = $feature.STATUS;";
meterStatusLabelArcade +=
  "var meterStatusDate = Text($feature.STATUSDATE, 'Y-MM-DD');";
meterStatusLabelArcade += "var labels = [ meterStatus, meterStatusDate ];";
meterStatusLabelArcade += "return Concatenate(labels, TextFormatting.NewLine);";

const meterStatusLabelingInfo = {
  labelExpressionInfo: {
    expression: meterStatusLabelArcade,
  },
  labelPlacement: "above-center",
  symbol: {
    type: "text", // autocasts as new TextSymbol()
    font: {
      size: 9,
      family: "Noto Sans",
    },
    horizontalAlignment: "left",
    color: "#2b2b2b", 
  },
  minScale: 6000,
};

export const createMap = (basemap) => {
    let map;
    if (basemap === "LONDON_BASEMAP") {
      map = new WebMap({
        portalItem: {
          id: "9616afa1c77d4654950a53d519765442",
        },
      });
    } else {
      map = new WebMap({ basemap });
    }
  
    return map;
};
  
export const getMetersFeatureLayer = () => {
    const waterMetersFeatureLayer = new FeatureLayer({
        url: WATER_METER_ADDRESSES_FEATURE_SERVER_URL,
        spatialReference: 26917,
        name: "WaterMeters",
        title: "Water Meters",
        outFields: [
        "OBJECTID",
        "MeterNumber",
        "Manufacturer",
        "MeterType",
        "InstallDate",
        "Status",
        "PremiseAddress",
        ],
        renderer: waterMeterRenderer,
        minScale: 8000,
        labelingInfo: [waterMeterLabelingInfo, meterStatusLabelingInfo],
        // definitionExpression: "Status <> 'InService'"
    });

    const query = waterMetersFeatureLayer.createQuery();

    waterMetersFeatureLayer.queryFeatures(query).then(() => {});

    return waterMetersFeatureLayer;
};

export const getGraphicsLayer = (
  objectIds,
  featureLayer,
  symbol,
  name
) => {
  let objectIdListGraphicsLayer = new GraphicsLayer();
  if (objectIds && objectIds.length > 0) {
    featureLayer.queryFeatures({
      objectIds,
      returnGeometry: true,
      outFields: ["*"]
    }).then((featureSet) => {
      const symbolizedFeatureSet = featureSet.features.map((graphic) => {
        graphic.symbol = symbol
        return graphic;
      });
      objectIdListGraphicsLayer.graphics.addMany(symbolizedFeatureSet);
    });

    objectIdListGraphicsLayer.name = name
  }
  return objectIdListGraphicsLayer;
};

export const tasksSymbol = new TextSymbol({
  color: '#bf00ff',
  text: '\ue61d',  // esri-icon-map-pin
  font: {  // autocast as new Font()
    size: 24,
    family: 'CalciteWebCoreIcons'
  }
});

export const lettersSymbol = new TextSymbol({
  color: 'blue',
  text: '\ue645',  // esri-icon-contact
  font: {  // autocast as new Font()
    size: 24,
    family: 'CalciteWebCoreIcons'
  }
});

export const callsSymbol = new TextSymbol({
  color: 'green',
  text: '\ue665',  // esri-icon-phone
  font: {  // autocast as new Font()
    size: 24,
    family: 'CalciteWebCoreIcons'
  }
});

export const scheduledSymbol = new TextSymbol({
  color: 'yellow',
  haloColor: "black",
  haloSize: "1px",
  text: '\ue676',  // esri-icon-time-clock
  font: {  // autocast as new Font()
    size: 24,
    family: 'CalciteWebCoreIcons'
  }
});

export const shutoffsSymbol = new TextSymbol({
  color: 'red',
  text: '\ue64f',  // esri-icon-error
  font: {  // autocast as new Font()
    size: 24,
    family: 'CalciteWebCoreIcons'
  }
});

export const hydroSymbol = new TextSymbol({
  color: 'red',
  text: '\ue901',  // esri-icon-lightbulb
  font: {  // autocast as new Font()
    size: 24,
    family: 'CalciteWebCoreIcons'
  }
});

export const crmSymbol = new TextSymbol({
  color: '#bf00ff',
  text: '\ue61d',  // esri-icon-map-pin
  font: {  // autocast as new Font()
    size: 24,
    family: 'CalciteWebCoreIcons'
  }
});

// Hydro
// esri-icon-lightbulb
// \ue901
// A40000 Dark red

// CRM
// esri-icon-map-pin
// \ue61d
// BF00FF purple