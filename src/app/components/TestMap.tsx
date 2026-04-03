import React, { useEffect, useState } from "react";
import { ComposableMap, Geographies, Geography, ZoomableGroup } from "react-simple-maps";

const geoUrl = "https://raw.githubusercontent.com/deldersveld/topojson/master/countries/india/india-districts.json";

export function TestMap() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch(geoUrl).then(res => res.json()).then(d => {
      console.log("Map data loaded:", Object.keys(d.objects));
      console.log("Sample geo properties:", d.objects['IND_adm2'].geometries[0].properties);
      setData(d);
    }).catch(console.error);
  }, []);

  if (!data) return <div>Loading Map...</div>;

  return (
    <ComposableMap projection="geoMercator" projectionConfig={{ scale: 3000, center: [76, 19] }}>
      <ZoomableGroup>
        <Geographies geography={data}>
          {({ geographies }) =>
            geographies.map((geo) => {
              // Filter for Maharashtra
              if (geo.properties.NAME_1 !== "Maharashtra") return null;
              return (
                <Geography 
                  key={geo.rsmKey} 
                  geography={geo} 
                  fill="#EAEAEC" 
                  stroke="#D6D6DA" 
                  onClick={() => console.log(geo.properties)}
                />
              );
            })
          }
        </Geographies>
      </ZoomableGroup>
    </ComposableMap>
  );
}