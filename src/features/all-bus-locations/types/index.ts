export interface buses {
  clientDate: string;
  busCode: number;
  busId: number;
  latitude: number;
  longitude: number;
  pointOrder: number;
  groundSpeed: number;
  altitude: number;
  satelliteInuse: number;
  validationCount: number;
  switchState: number;
  utcDate: number;
  frontDoorTransactionCount: number;
  backDoorTransactionCount: number;
  dcTransactionCount: number;
  tripCode: number;
  ccTripCode: number;
  shiftType: string;
  tripId: number;
  tripLegalSpeed: number;
  direction: string;
  schematicPoint: number;
  stopCode: number;
  locationLabel: number;
  busPlate: string;
  fuelType: string;
  suspended: boolean;
  inGarage: boolean;
  busStatus: string;
  busOperatorCode: number;
  inboundHalfBusHalfTripCount: number;
  outboundHalfBusHalfTripCount: number;
  inboundFullBusHalfTripCount: number;
  outboundFullBusHalfTripCount: number;
  connected: boolean;
  busy: boolean;
  illegalSpeed: boolean;
  outbound: boolean;
  activeInLine: boolean;
  inbound: boolean;
}