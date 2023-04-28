import React from "react"
import ReactDOM from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router-dom"

// redux
import { Provider } from "react-redux"
import store from "./routes/Store"

// routes
import ErrorPage from "./routes/error-page"
import Login from "./routes/Login"
import Home from "./routes/Home"
import Detail from "./routes/Detail"
import Signup from "./routes/Signup"

// toaster
import { Toaster } from "react-hot-toast"

const root = ReactDOM.createRoot(document.getElementById("root"))

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/home/detail",
        element: <Detail />,
      },
    ],
  },
])

root.render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={router} />
      <Toaster />
    </React.StrictMode>
  </Provider>
)
