import L from "leaflet";
import { MAP_TILE } from "../../../../config/global";
import { MapContainer, Marker, TileLayer, Tooltip } from "react-leaflet";
import { useAppDispatch, useAppSelector } from "../../../../store/store";
import { BusMarkerIcon } from "../../../../utils/icons/icons";
import { setSelectedBus } from "../../slice/all-bus-location-slice";
import { active, buses, busy, status } from "../../types";

import styles from "../all-bus-locations.module.scss";

export const Map = () => {
  const dispatch = useAppDispatch();
  const selectedBus = useAppSelector(
    (state) => state.all_bus_locations.selectedBus
  );
  const buses = useAppSelector((state) => state.all_bus_locations.buses);
  const filterBusy = useAppSelector((state) => state.all_bus_locations.busy);
  const filterStatus = useAppSelector(
    (state) => state.all_bus_locations.status
  );
  const filterActive = useAppSelector(
    (state) => state.all_bus_locations.active
  );
  const filterState = useAppSelector(
    (state) => state.all_bus_locations.filterState
  );

  const connected = buses.filter((item) => item.connected);
  const disconnected = buses.filter((item) => !item.connected);
  const repair = buses.filter((item) => item.inGarage);
  const suspended = buses.filter((item) => item.suspended);
  const inline = buses.filter((item) => item.activeInLine);
  const outline = buses.filter((item) => !item.activeInLine);
  const active = buses.filter((item) => item.busy);
  const deactive = buses.filter((item) => !item.busy);

  const checkRouts = (status: buses[], filterState: status | active | busy) => {
    const inbound = status.filter((item) => item.direction === "I");
    const outbound = status.filter((item) => item.direction === "O");
    const unknown = status.filter((item) => item.direction === "U");
    let routes: buses[] = [];
    if (filterState.inbound) routes = [...routes, ...inbound];
    if (filterState.outbound) routes = [...routes, ...outbound];
    if (filterState.unknown) routes = [...routes, ...unknown];
    return routes;
  };
  const statusMarkers = () => {
    let markers: buses[] = [];
    if (filterStatus.connected) markers = [...markers, ...connected];
    if (filterStatus.disconnected) markers = [...markers, ...disconnected];
    if (filterStatus.repair) markers = [...markers, ...repair];
    if (filterStatus.suspended) markers = [...markers, ...suspended];
    return checkRouts(markers, filterStatus);
  };
  const activeMarkers = () => {
    let markers: buses[] = [];
    if (filterActive.inline) markers = [...markers, ...inline];
    if (filterActive.outline) markers = [...markers, ...outline];
    return checkRouts(markers, filterActive);
  };
  const busyMarkers = () => {
    let markers: buses[] = [];
    if (filterBusy.active) markers = [...markers, ...active];
    if (filterBusy.deactive) markers = [...markers, ...deactive];
    return checkRouts(markers, filterBusy);
  };
  const markers = (filterState: "busy" | "active" | "status") => {
    switch (filterState) {
      case "busy":
        return busyMarkers();
      case "status":
        return statusMarkers();
      case "active":
        return activeMarkers();
    }
  };
  return (
    <MapContainer
      center={[32.65709667, 51.72394833]}
      zoom={13}
      className={styles.map_container}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url={MAP_TILE}
      />
      {markers(filterState)?.map((bus, index) => {
        if (bus.busOperatorCode === 124) console.log(bus);
        return (
          <Marker
            key={index}
            position={[bus.latitude, bus.longitude]}
            icon={BusMarkerIcon(
              bus.direction,
              bus.connected,
              bus.busCode === selectedBus
            )}
            eventHandlers={{
              click: (e) => {
                dispatch(setSelectedBus(bus.busCode));
              },
            }}
          >
            <Tooltip
              className={bus.busy ? styles.busy_bus_tooltip : ""}
              permanent={true}
              direction="bottom"
              offset={L.point(0, 0)}
            >
              {bus.busOperatorCode}
            </Tooltip>
          </Marker>
        );
      })}
    </MapContainer>
  );
};
