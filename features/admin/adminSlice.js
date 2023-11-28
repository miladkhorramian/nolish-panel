import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  users: [],
  operators: [],
  reserves: [],
  services: [],
}

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setUsers: (state, { payload }) => {
      state.users = payload
    },
    setOperators: (state, { payload }) => {
      state.operators = payload
    },
    setReserves: (state, { payload }) => {
      state.reserves = payload
    },
    setServices: (state, { payload }) => {
      state.services = payload
    },
  },
})

const adminReducer = adminSlice.reducer

export const { setUsers, setOperators, setReserves, setServices } = adminSlice.actions
export default adminReducer
