import { axios } from "@/app/axios"
import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  services: [],
}

const serviceSlice = createSlice({
  name: "services",
  initialState,
  reducers: {
    setServices: (state, { payload }) => {
      state.services = payload
    },
    addService: (state, { payload }) => {
      state.services = [...state.services, payload]
    },
    deleteService: (state, { payload }) => {
      state.services = state.services.filter(item => item.id === payload)
    },
  },
})

export const { addService, setServices, deleteService } = serviceSlice.actions

export const getServices = () => async dispatch => {
  try {
    const res = await axios.get("/service")
    if (res.status === 200) {
    //   console.log(res)
      dispatch(setServices(res.data))
    }
  } catch (error) {
    const { message, response } = error
    console.log(response)
    throw message
  }
}

const serviceReducer = serviceSlice.reducer
export default serviceReducer
