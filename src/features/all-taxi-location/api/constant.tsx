declare global {
  interface Window {
    online_token?: string;
    websocekt_base_url?: string;
  }
}
export const SOCKET_BASE_ADDRESS =
  window.parent.websocekt_base_url || process.env.REACT_APP_BACKEND_BASE_WS;
export const ALL_TAXI_LOCATIONS_WEBSOCKET = "websocket/getAllTaxiLocation";
export const AUTHORIZATION_TOKEN =
  window.parent?.online_token ||
  "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJpbnRlcm5hbCIsImxvZ2luVXNlciI6InN5c3RlbSIsImFwaVVzZXJSb2xlIjoiaW50ZXJuYWwiLCJleHAiOjE2ODg4ODg1NTUsImlhdCI6MTY4ODgwMjE1NX0.vIn-bqZEWFw_Q0Egb8KGDpr1dtVYAaAWe81kKjjlXACH0GiSTudFLgUJAK8cNqD1-uXPSNAc0mxGHfqkUUzRpQ";
