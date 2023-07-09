import { useDispatch } from "react-redux";
import { setTaxis } from "../slice/all-taxi-location-slice";
import { ActionBar } from "./action-bar";
import { Map } from "./map/map";

import styles from "./all-taxi-locations.module.scss";
import {
  ALL_TAXI_LOCATIONS_WEBSOCKET,
  AUTHORIZATION_TOKEN,
  SOCKET_BASE_ADDRESS,
} from "../api/constant";
export const TaxisLocations = () => {
  const dispatch = useDispatch();
  const websocket = new WebSocket(
    `${SOCKET_BASE_ADDRESS}${ALL_TAXI_LOCATIONS_WEBSOCKET}?Authorization=Bearer ${AUTHORIZATION_TOKEN}`
  );
  websocket.onmessage = (event) => {
    const data = JSON.parse(event.data);
    dispatch(setTaxis(data.payload));
  };
  return (
    <div className={styles.all_taxi_locations}>
      <ActionBar />
      <Map />
    </div>
  );
};
