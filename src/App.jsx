import { Route, Routes } from "react-router-dom";
import Header from "./sections/Header";
import Homepage from "./pages/Homepage";
import UpgradePlan from "./pages/UpgradePlan";

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/upgrade-plan" element={<UpgradePlan />} />
        </Routes>
    );
};

export default App;
