import React, { useEffect, useState } from "react";
import { ComposableMap, Geographies, Geography, ZoomableGroup } from "react-simple-maps";

const geoUrl = "https://raw.githubusercontent.com/Subhash9325/GeoJson-Data-of-Indian-States/master/Indian_States/Maharashtra/Maharashtra.json";

export function MahaMap() {
  return (
    <div style={{ width: '100%', height: '500px' }}>
      <ComposableMap 
        projection="geoMercator" 
        projectionConfig={{ scale: 3500, center: [76, 19] }}
        width={800}
        height={600}
      >
        <ZoomableGroup>
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography 
                  key={geo.rsmKey} 
                  geography={geo} 
                  fill="#D6D6DA" 
                  stroke="#FFFFFF"
                  style={{
                    default: { outline: "none" },
                    hover: { fill: "#10b981", outline: "none" },
                    pressed: { outline: "none" },
                  }}
                  onClick={() => {
                    console.log(geo.properties);
                  }}
                />
              ))
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>
    </div>
  );
}