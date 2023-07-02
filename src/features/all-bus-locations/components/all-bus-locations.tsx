import { useDispatch } from "react-redux";
import { setBuses } from "../slice/all-bus-location-slice";
import { ActionBar } from "./action-bar";
import { Map } from "./map/map";
export const AllBusLocations = () => {
  const dispatch = useDispatch();
  const websocket = new WebSocket(
    `${process.env.REACT_APP_BACKEND_BASE_WS}websocket/getAllBusLocations?Authorization=Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJpbnRlcm5hbCIsImxvZ2luVXNlciI6InN5c3RlbSIsImFwaVVzZXJSb2xlIjoiaW50ZXJuYWwiLCJleHAiOjE2ODgzNzk3MDEsImlhdCI6MTY4ODI5MzMwMX0.EFl1yo8RZlnf6MezMJgChCVHUpwY4WO47xBk6aj7SKh9IUeMuVcKZZQVcf5fn_H3gSGRYAWHW-l3fC4xpCpmQA`
  );
  websocket.onmessage = (event) => {
    const data = JSON.parse(event.data);
    dispatch(setBuses(data.payload));
  };
  return (
    <div>
      <ActionBar />
      <Map />
    </div>
  );
};
