import L from "leaflet";
import { useEffect, useRef } from "react";
import { ArrowsMove } from "react-bootstrap-icons";
import {
  FeatureGroup,
  MapContainer,
  Marker,
  TileLayer,
  Tooltip,
} from "react-leaflet";
import { useAppDispatch, useAppSelector } from "../../../../store/store";
import { TaxiMarkerIcon } from "../../../../utils/icons/icons";
import { MAP_CENTER, MAP_TILE } from "../../../../config/global";
import { setSelectedTaxi } from "../../slice/all-taxi-location-slice";
import { taxi } from "../../types";

import styles from "../all-taxi-locations.module.scss";

export const Map = () => {
  const mapRef = useRef<any>();
  const mapGroupRef = useRef<any>();
  const dispatch = useAppDispatch();
  const selectedTaxi = useAppSelector(
    (state) => state.all_taxi_locations.selectedTaxi
  );
  const taxis = useAppSelector((state) => state.all_taxi_locations.taxis);
  const filterStatus = useAppSelector(
    (state) => state.all_taxi_locations.status
  );
  const connected = taxis.filter((item) => item.isConnected);
  const disconnected = taxis.filter((item) => !item.isConnected);

  const statusMarkers = () => {
    let markers: taxi[] = [];
    if (filterStatus.connected) markers = [...markers, ...connected];
    if (filterStatus.disconnected) markers = [...markers, ...disconnected];
    return markers;
  };
  useEffect(() => {
    fitBounds();
  }, [selectedTaxi]);
  const fitBounds = () => {
    if (mapGroupRef.current !== undefined && mapRef.current !== undefined) {
      const map = mapRef?.current;
      map.fitBounds(mapGroupRef.current.getBounds());
    }
  };

  return (
    <MapContainer
      center={[MAP_CENTER.lat, MAP_CENTER.lng]}
      zoom={13}
      className={styles.map_container}
      ref={mapRef}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url={MAP_TILE}
      />
      <FeatureGroup ref={mapGroupRef}>
        {statusMarkers()?.map((taxi, index) => {
          return (
            <Marker
              key={index}
              position={[taxi.latitude, taxi.longitude]}
              icon={TaxiMarkerIcon(
                taxi.isConnected,
                taxi.taxiOperatorCode === selectedTaxi
              )}
              eventHandlers={{
                click: (e) => {
                  dispatch(setSelectedTaxi(taxi.taxiOperatorCode));
                },
              }}
            >
              <Tooltip
                permanent={true}
                direction="bottom"
                offset={L.point(0, 0)}
              >
                {taxi.taxiOperatorCode}
              </Tooltip>
            </Marker>
          );
        })}
        <button className={styles.fit_bounds_btn} onClick={() => fitBounds()}>
          <ArrowsMove />
        </button>
      </FeatureGroup>
    </MapContainer>
  );
};
