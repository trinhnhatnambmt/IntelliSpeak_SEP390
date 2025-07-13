import { Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import UpgradePlan from "./pages/UpgradePlan";
import Auth from "./pages/Auth/Auth";

import MainPage from "./pages/main/MainPage";
import InterviewPractice from "./pages/main/interview/InterviewPractice";
import InterviewPage from "./pages/main/interview/InterviewPage";
import Topic from "./pages/main/topic/Topic";
import TopicDetail from "./pages/main/topic/TopicDetail";
import Profile from "./pages/main/personal/Profile";
import FeedBack from "./pages/main/personal/feedback/FeedBack";
import AnalyzePage from "./pages/main/analyse/AnalyzePage";
import Payment from "./pages/Payment/Payment";
import PaymentSuccess from "./pages/Payment/PaymentSuccess";
import PaymentFailed from "./pages/Payment/PaymentFailed";
import Settings from "./pages/main/settings/Settings";

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/upgrade-plan" element={<UpgradePlan />} />
            <Route path="/payment-success" element={<PaymentSuccess />} />
            <Route path="/payment-failed" element={<PaymentFailed />} />

            <Route path="/main" element={<MainPage />}>
                <Route index element={<InterviewPractice />} />
                <Route path="interviewPage" element={<InterviewPage />} />
                <Route path="topic" element={<Topic />} />
                <Route path="topicDetail" element={<TopicDetail />} />
                <Route path="profile" element={<Profile />} />
                <Route path="feedback" element={<FeedBack />} />
                <Route path="analyze" element={<AnalyzePage />} />
                <Route path="payment" element={<Payment />} />
                <Route path="settings" element={<Settings />} />
            </Route>

            {/* Authentication */}
            <Route path="/login" element={<Auth />} />
            <Route path="/register" element={<Auth />} />
        </Routes>
    );
};

export default App;
