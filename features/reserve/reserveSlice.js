import { axios } from "@/app/axios"
import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  reserves: [],
}

export const reserveSlice = createSlice({
  name: "reserves",
  initialState,
  reducers: {
    setReserves: (state, { payload }) => {
      state.reserves = payload
    },
    addReserve: (state, { payload }) => {
      state.reserves = [...state.reserves, payload]
    },
    deleteReserve: (state, { payload }) => {
      state.reserves = state.reserves.filter(item => item.id === payload)
    },
  },
})

export const { addReserve, setReserves, deleteReserve } = reserveSlice.actions

export const getReserves = () => async dispatch => {
  try {
    const res = await axios.get("/reserve")
    if (res.status === 200) {
      // console.log(res)
      dispatch(setReserves(res.data.reserves))
    }
  } catch (error) {
    const { message, response } = error
    console.log(response)
    throw message
  }
}

const reserveReducer = reserveSlice.reducer
export default reserveReducer
