import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { active, buses, busy, filterState, status } from "../types";
interface all_bus_locations_state {
  buses: buses[];
  active: active;
  status: status;
  busy: busy;
  filterState: filterState;
  selectedBus: number | null;
}
const initialState: all_bus_locations_state = {
  buses: [],
  status: {
    disconnected: true,
    connected: true,
    suspended: true,
    repair: true,
    inbound: true,
    outbound: true,
    unknown: true,
  },
  active: {
    inline: true,
    outline: true,
    inbound: true,
    outbound: true,
    unknown: true,
  },
  busy: {
    active: true,
    deactive: true,
    inbound: true,
    outbound: true,
    unknown: true,
  },
  selectedBus: null,
  filterState: "status",
};

export const all_bus_locations_slice = createSlice({
  name: "all_bus_locations",
  initialState,
  reducers: {
    setBuses: (state, action) => {
      state.buses = action.payload;
    },
    setActive: (state, action: PayloadAction<active>) => {
      state.active = action.payload;
    },
    setStatus: (state, action) => {
      state.status = action.payload;
    },
    setBusy: (state, action) => {
      state.busy = action.payload;
    },
    setFilterState: (state, action) => {
      state.filterState = action.payload;
    },
    setSelectedBus: (state, action) => {
      state.selectedBus = action.payload;
    },
  },
});

export const { setBuses, setFilterState, setStatus, setBusy, setActive ,setSelectedBus } =
  all_bus_locations_slice.actions;

export default all_bus_locations_slice.reducer;
