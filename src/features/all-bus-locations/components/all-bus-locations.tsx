import { useDispatch } from "react-redux";
import { setBuses } from "../slice/all-bus-location-slice";
import { ActionBar } from "./action-bar/action-bar";
import { Map } from "./map/map";

import styles from "./all-bus-locations.module.scss";
import {
  AUTHORIZATION_TOKEN,
  SOCKET_BASE_ADDRESS,
} from "../../../config/global";
import { ALL_BUS_LOCATIONS_WEBSOCKET } from "../api/constant";
export const AllBusLocations = () => {
  const dispatch = useDispatch();
  const websocket = new WebSocket(
    `${SOCKET_BASE_ADDRESS}${ALL_BUS_LOCATIONS_WEBSOCKET}?Authorization=Bearer ${AUTHORIZATION_TOKEN}`
  );
  websocket.onmessage = (event) => {
    const data = JSON.parse(event.data);
    dispatch(setBuses(data.payload));
  };
  return (
    <div className={styles.all_bus_locations}>
      <ActionBar />
      <Map />
    </div>
  );
};
