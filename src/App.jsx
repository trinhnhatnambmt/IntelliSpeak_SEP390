import { Route, Routes } from "react-router-dom";
import Header from "./sections/Header";
import Homepage from "./pages/Homepage";

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<Homepage />} />
        </Routes>
    );
};

export default App;
