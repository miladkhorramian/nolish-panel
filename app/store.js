import { configureStore } from "@reduxjs/toolkit"
import userReducer from "@/features/user/userSlice"
import reserveReducer from "@/features/reserve/reserveSlice"
import serviceReducer from "@/features/services/serviceSlice"

export const store = configureStore({
  reducer: {
    user: userReducer,
    reserve: reserveReducer,
    service: serviceReducer,
  },
})
