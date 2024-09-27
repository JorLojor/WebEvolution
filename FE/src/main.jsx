import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import "./index.css";
import App from "./App";
import Login from "./auth/Login";
import Register from "./auth/Register";
import NotFound from "./pages/NotFound";
import Dashboard from "./layout/Layout";
import { store, persistor } from "./store";

const router = createBrowserRouter([
  {
    path: "*",
    element: <NotFound />,
  },
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/competitions",
    element: <Competitions />,
  },
  {
    path: "/member",
    element: <MemberTeam />,
  },
  {
    path: "/finalis",
    element: <Finalis />,
  },
]);

function Root() {
     return <RouterProvider router={router} />;
}

ReactDOM.createRoot(document.getElementById("root")).render(
     <React.StrictMode>
          <Provider store={store}>
               <PersistGate loading={null} persistor={persistor}>
                    <Root />
               </PersistGate>
          </Provider>
     </React.StrictMode>
);
