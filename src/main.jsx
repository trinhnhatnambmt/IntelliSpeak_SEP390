import { createRoot } from "react-dom/client";
import "./index.css";
import App from "~/App";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "./utils/ThemeContext";

createRoot(document.getElementById("root")).render(
    <BrowserRouter basename="/">
        <ThemeProvider>
            <App />
        </ThemeProvider>
    </BrowserRouter>
);
