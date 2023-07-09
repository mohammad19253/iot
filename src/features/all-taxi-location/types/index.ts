export interface taxi  {
  taxiOperatorCode: number;
  taxiPlate: string;
  driverCode: string;
  driverFirstName:string;
  driverLastName: string;
  clientDate:string;
  latitude:number;
  longitude: number;
  groundSpeed: number;
  isConnected: boolean;
}
export interface status {
  connected?: boolean;
  disconnected?: boolean;
}
