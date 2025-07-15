import { createRoot } from "react-dom/client";
import "./index.css";
import App from "~/App";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "./utils/ThemeContext";
import { Provider } from "react-redux";
import { store } from "./redux/store";

createRoot(document.getElementById("root")).render(
    <BrowserRouter basename="/">
        <Provider store={store}>
            <ThemeProvider>
                <App />
            </ThemeProvider>
        </Provider>
    </BrowserRouter>
);
