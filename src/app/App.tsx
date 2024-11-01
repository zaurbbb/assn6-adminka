import React, { Suspense } from "react";
import { BrowserRouter } from "react-router-dom";
import CustomSpin from "../components/CustomSpin";
import RouterProvider from "./providers/RouterProvider";
import TanstackProvider from "./providers/TanstackProvider";

function App() {
  return (
    <Suspense
      fallback={
        <CustomSpin />
      }
    >
      <TanstackProvider>
        <BrowserRouter>
          <RouterProvider />
        </BrowserRouter>
      </TanstackProvider>
    </Suspense>
  );
}

export default App;
