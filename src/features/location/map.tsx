import L from "leaflet";
import { useEffect, useRef, useState } from "react";
import { ArrowsMove } from "react-bootstrap-icons";
import {
  FeatureGroup,
  MapContainer,
  Marker,
  TileLayer,
  Tooltip,
} from "react-leaflet";
import axios from "../../libs/axios";
import { TaxiMarkerIcon } from "../../utils/icons/icons";

import styles from "./locations.module.scss";

export const Map = () => {
  const mapRef = useRef<any>();
  const mapGroupRef = useRef<any>();

  useEffect(() => {
    console.log("test");
    axios.get("http://192.168.229.234/location").then((e) => {
      console.log(e.data);
      setLocation(e.data);
    });
  }, []);
  const [location, setLocation] = useState<any>({
    latitude: 35.7108,
    longitude: 51.4274,
  });
  const fitBounds = () => {
    if (mapGroupRef.current !== undefined && mapRef.current !== undefined) {
      const map = mapRef?.current;
      map.fitBounds(mapGroupRef.current.getBounds());
    }
  };
  return (
    <MapContainer
      center={[32.65709667, 51.72394833]}
      zoom={13}
      className={styles.map_container}
      ref={mapRef}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <FeatureGroup ref={mapGroupRef}>
        {
          <Marker
            position={[location?.latitude, location?.longitude]}
            icon={TaxiMarkerIcon(true, true)}
          >
            <Tooltip permanent={true} direction="bottom" offset={L.point(0, 0)}>
              your esp32 is here
            </Tooltip>
          </Marker>
        }
        <button className={styles.fit_bounds_btn} onClick={() => fitBounds()}>
          <ArrowsMove />
        </button>
      </FeatureGroup>
    </MapContainer>
  );
};
