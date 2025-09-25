import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { ClerkProvider } from "@clerk/clerk-react";
import { CrudProvider } from "./contexts/CrudContext.jsx";
import { ToastContainer } from "react-toastify";
import { CartAndCheckoutProvider } from "./contexts/CartAndCheckoutContext.jsx";
import { OrderContextProvider } from "./contexts/OrdersContext.jsx";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
        <CrudProvider>
          <ToastContainer />
          <CartAndCheckoutProvider>
            <OrderContextProvider>
              <App />
            </OrderContextProvider>
          </CartAndCheckoutProvider>
        </CrudProvider>
      </ClerkProvider>
    </BrowserRouter>
  </StrictMode>
);
