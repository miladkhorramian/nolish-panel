import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  show: false,
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
  },
})

const userReducer = userSlice.reducer

export const { toggleMenu, closeMenu } = userSlice.actions

export default userReducer
