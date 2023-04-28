import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import { toast } from "react-hot-toast"
import { useNavigate } from "react-router-dom"

const login = createAsyncThunk("user/login", async (data) => {
  try {
    const tryLogin = await axios.post(
      "http://localhost:8000/user/v1/login",
      data
    )
    if (tryLogin.data.token) {
      const config = {
        headers: { Authorization: tryLogin.data.token },
      }

      const bodyParameters = {
        key: "value",
      }

      const authorizeSeason = await axios.post(
        "http://localhost:8000/user/v1/authorize",
        bodyParameters,
        config
      )
      return authorizeSeason.data.data
    } else {
      console.log("tidak ada")
    }
  } catch (err) {
    return err.response.data.message
  }
})

const allProduct = createAsyncThunk("product/allProduct", async (data) => {
  try {
    const tryGetAllProduct = await axios.get(
      "http://localhost:8000/product/v1/allProduct"
    )
    if (tryGetAllProduct) {
      return tryGetAllProduct.data.data
    }
  } catch (err) {
    return "err"
  }
})

const slice = createSlice({
  name: "root",
  initialState: {
    user: [],
    product: [],
    start: false,
    loading: false,
    coin: 1,
  },
  reducers: {
    setStart: (state, actions) => {
      state.start = true
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state, action) => {
      state.loading = true
    })
    builder.addCase(login.fulfilled, (state, action) => {
      if (typeof action.payload === "object") {
        toast.success("berhasil login")
        state.user = [action.payload]
      } else {
        state.loading = false
        toast.error(action.payload)
      }
    })
    builder.addCase(login.rejected, (state, action) => {
      toast.error("gagal login")
    })

    // PRODUCT
    builder.addCase(allProduct.pending, (state, action) => {
      state.loading = true
    })
    builder.addCase(allProduct.fulfilled, (state, action) => {
      state.product = action.payload
    })
    builder.addCase(allProduct.rejected, (state, action) => {
      toast.error("gagal get all product")
    })
  },
})

export const actions = {
  ...slice.actions,
  login,
  allProduct,
}

export default slice.reducer
// const slice = createSlice({
//     name: "mybot",
//     initialState: {

//     },
//     reducers: {

//     },
//     extraReducers: (builder) => {
//       builder.addCase(coinsShortTerms.pending, (state, action) => {
//         console.log("pending")
//       })
//       builder.addCase(coinsShortTerms.fulfilled, (state, action) => {
//         state.coinsShortTerms = action.payload
//       })
//       builder.addCase(coinsShortTerms.rejected, (state, action) => {
//         console.log("error")
//       })

//     },
//   })

//   export const actions = {
//     ...slice.actions,

//   }

//   export default slice.reducer
