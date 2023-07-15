import { DUMMY_TOKEN } from "./dummy-token";

declare global {
  interface Window {
    online_token?: string;
    websocekt_base_url?: string;
    globalLat?: string;
    globalLong?: string;
    mapOnline?: string;
    language?: string;
    tiles_address?: string;
  }
}
export const SOCKET_BASE_ADDRESS =
  window.parent.websocekt_base_url ||"wss://busservices.arak.ir:9092/tms/"
export const AUTHORIZATION_TOKEN = window.parent?.online_token || DUMMY_TOKEN;
const GLOBAL_LAT = window.parent.globalLat || "32.65709667";
const GLOBAL_LONG = window.parent.globalLong || "51.72394833,";
export const MAP_CENTER = {
  lat: parseFloat(GLOBAL_LAT) || 32.65709667,
  lng: parseFloat(GLOBAL_LONG) || 51.72394833,
};
export const LANGUAGE = window.parent.language || "persian";
const MAP_ONLINE = window.parent.mapOnline || "1";
const TILES_ADDRESS =
  window.parent.tiles_address ||
  "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
export const MAP_TILE =
  MAP_ONLINE === "0"
    ? TILES_ADDRESS + "/tiles/{z}/{x}/{y}.png"
    : "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
