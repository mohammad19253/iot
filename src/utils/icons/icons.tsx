import L from "leaflet";

import "./iconStyle.scss";

export const BusMarkerIcon = (
  direction: string,
  isConnected: boolean,
  isBlink: boolean
) => {
  const markerStatus = isConnected ? "active" : "deactive";
  if (direction === "O") {
    return L.icon({
      iconUrl: require(`../../assests/red-${markerStatus}-marker.svg`),
      iconSize: [20, 32],
      iconAnchor: [10, 35],
      className: isBlink ? "blinking" : "",
    });
  }
  if (direction === "I") {
    return L.icon({
      iconUrl: require(`../../assests/blue-${markerStatus}-marker.svg`),
      iconSize: [20, 32],
      iconAnchor: [10, 35],
      className: isBlink ? "blinking" : "",
    });
  }
  if (direction === "U") {
    return L.icon({
      iconUrl: require(`../../assests/green-${markerStatus}-marker.svg`),
      iconSize: [20, 32],
      iconAnchor: [10, 35],
      className: isBlink ? "blinking" : "",
    });
  }
};

export const TaxiMarkerIcon = (
  isConnected: boolean,
  isBlink: boolean
) => {
  const markerStatus = isConnected ? "active" : "deactive";
  return L.icon({
    iconUrl: require(`../../assests/taxi-${markerStatus}.svg`),
    iconSize: [20, 32],
    iconAnchor: [12, 36],
    className: isBlink ? "blinking" : "",
  });
};
