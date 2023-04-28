// import { combineReducers, configureStore } from "@reduxjs/toolkit"
// import mybot from "../mybot/slice"

// const rootReducer = combineReducers({
//   mybot,
// })

// export default configureStore({
//   reducer: rootReducer,
//   devTools: true,
// })

import { combineReducers, configureStore } from "@reduxjs/toolkit"
import root from "../Home/slice"

const rootReducer = combineReducers({
  root,
})

export default configureStore({
  reducer: rootReducer,
  devTools: true,
})
