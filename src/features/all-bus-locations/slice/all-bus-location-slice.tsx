import { createSlice } from "@reduxjs/toolkit";

import { buses } from "../types";
interface all_bus_locations_state {
  buses: buses[];
}
const initialState: all_bus_locations_state = {
  buses: [],
};

export const all_bus_locations_slice = createSlice({
  name: "all_bus_locations",
  initialState,
  reducers: {
    setBuses: (state, action) => {
      state.buses = action.payload;
    },
  },
});

export const { setBuses } = all_bus_locations_slice.actions;

export default all_bus_locations_slice.reducer;
