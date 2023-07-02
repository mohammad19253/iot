import { MapContainer, Marker, TileLayer, Popup } from "react-leaflet";
import { useAppSelector } from "../../../../store/store";
import { MarkerIcon } from "../../../../utils/icons/icons";

import styles from "../all-bus-locations.module.scss";

export const Map = () => {
  const buses = useAppSelector((state) => state.all_bus_locations.buses);
  return (
    <MapContainer
      center={[32.65709667, 51.72394833]}
      zoom={13}
      className={styles.map_container}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {buses?.map((bus) => {
        return (
          <Marker
            position={[bus.latitude, bus.longitude]}
            icon={MarkerIcon(bus.direction, bus.connected, false)}
          >
            <Popup>{bus.busOperatorCode}</Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
};
