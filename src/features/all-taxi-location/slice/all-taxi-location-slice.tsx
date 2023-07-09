import { createSlice } from "@reduxjs/toolkit";

import { taxi, status } from "../types";
interface all_bus_locations_state {
  status: status;
  taxis: taxi[];
  selectedTaxi: number | null;
}
const initialState: all_bus_locations_state = {
  taxis: [],
  status: {
    disconnected: true,
    connected: true,
  },
  selectedTaxi: null,
};

export const all_taxi_locations_slice = createSlice({
  name: "all_taxi_locations",
  initialState,
  reducers: {
    setTaxis: (state, action) => {
      state.taxis = action.payload;
    },
    setStatus: (state, action) => {
      state.status = action.payload;
    },
    setSelectedTaxi: (state, action) => {
      state.selectedTaxi = action.payload;
    },
  },
});

export const { setStatus, setSelectedTaxi, setTaxis } =
  all_taxi_locations_slice.actions;

export default all_taxi_locations_slice.reducer;
