import { axios } from "@/app/axios"
import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  show: false,
  data: {},
}

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    toggleMenu: state => {
      state.show = !state.show
    },
    closeMenu: state => {
      state.show = false
    },
    setData: (state, { payload }) => {
      state.data = payload
    },
  },
})

export const { toggleMenu, closeMenu, setData } = userSlice.actions

export const getUserData = () => async dispatch => {
  try {
    const response = await axios.get("/user/profile")

    dispatch(setData(response.data))
  } catch (error) {
    const { message, response } = error
    console.log(response, message)
  }
}

const userReducer = userSlice.reducer
export default userReducer
