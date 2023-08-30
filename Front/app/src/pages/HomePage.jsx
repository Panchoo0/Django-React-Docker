import React from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polygon,
  Circle,
  SVGOverlay,
} from "react-leaflet";

import { Icon } from "leaflet";

export default function HomePage() {
  return (
    <>
      <div style={{ overflow: "hidden" }}>HomePage</div>
      <div className="map-container">
        <MapContainer center={[-42.52575, -73.49699]} zoom={13}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

          <Circle center={[-42.52575, -73.49699]} radius={200}>
            <Popup>
              <img src="https://i.stack.imgur.com/ATB3o.gif" alt="img" />
            </Popup>
          </Circle>

          <Marker position={[-42.52575, -73.49699]}>
            <Popup>
              <img src="https://i.stack.imgur.com/ATB3o.gif" alt="img" />
            </Popup>
          </Marker>

          {/* <SVGOverlay attributes={{ stroke: "red" }} bounds={
            [
                [-42.62575, -73.59699],
                [-42.42575, -73.39699]
            ]
          }>
            <circle r="10%" cx="50%" cy="50%" fill="red" width="100%" height="100%"/>
            <text x="50%" y="50%" stroke="white" width="50%" height="50%" scale="1">
              text
            </text>
          </SVGOverlay> */}
        </MapContainer>
      </div>
    </>
  );
}
