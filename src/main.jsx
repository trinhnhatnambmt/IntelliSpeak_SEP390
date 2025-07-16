import { createRoot } from "react-dom/client";
import "./index.css";
import App from "~/App";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "./utils/ThemeContext";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { ToastContainer } from "react-toastify";

import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import { ConfirmProvider } from "material-ui-confirm";

const persistor = persistStore(store);

createRoot(document.getElementById("root")).render(
    <BrowserRouter basename="/">
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                <ThemeProvider>
                    <App />
                    <ToastContainer />
                </ThemeProvider>
            </PersistGate>
        </Provider>
    </BrowserRouter>
);
