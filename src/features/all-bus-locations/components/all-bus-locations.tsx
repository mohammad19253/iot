import { useDispatch } from "react-redux";
import { setBuses } from "../slice/all-bus-location-slice";
import { ActionBar } from "./action-bar";
import { Map } from "./map/map";

import styles from "./all-bus-locations.module.scss";
export const AllBusLocations = () => {
  const dispatch = useDispatch();
  const websocket = new WebSocket(
    `${process.env.REACT_APP_BACKEND_BASE_WS}websocket/getAllBusLocations?Authorization=Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJpbnRlcm5hbCIsImxvZ2luVXNlciI6InN5c3RlbSIsImFwaVVzZXJSb2xlIjoiaW50ZXJuYWwiLCJleHAiOjE2ODg0Njc1MTAsImlhdCI6MTY4ODM4MTExMH0.FWaYrp0FQIa-gNrgJaj7HZsVO8nno4xX2fq_rYIy49dEyODeaLbHiVwXMBsT3yybNn8b44ODmq-cDbF2D489yg`
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
