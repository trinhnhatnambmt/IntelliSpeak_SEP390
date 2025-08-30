import { Navigate, Outlet, Route, Routes } from "react-router-dom";
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
import Payment from "./pages/Payment/Payment";
import PaymentSuccess from "./pages/Payment/PaymentSuccess";
import PaymentFailed from "./pages/Payment/PaymentFailed";
import Settings from "./pages/main/settings/Settings";
import Forum from "./pages/main/forum/Forum";
import SavedForum from "./pages/main/forum/SavedForum";
import ForumDetail from "./pages/main/forum/SinglePostPage/SinglePostPage";
import SinglePostPage from "./pages/main/forum/SinglePostPage/SinglePostPage";
import MyPostPage from "./pages/main/forum/MyPostPage/MyPostPage";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "./redux/user/userSlice";
import UpdateHR from "./pages/main/update/UpdateHR";
import UploadPage from "./pages/main/analyse/UploadPage";
import Resume from "./pages/main/analyse/Resume";
import AnalyzeCV from "./pages/main/analyse/AnalyzeCV";
import Analyze from "./pages/main/analyse/Analyze";
import UploadJDPage from "./pages/main/analyse/UploadJDPage";
import JobDescription from "./pages/main/analyse/JobDescription";
import HRCreateQuestionPage from "./pages/main/hr/HRCreateQuestionPage";
import Companies from "./pages/main/companies/Companies";
import CompanyDetail from "./pages/main/companies/CompanyDetail";
import ChooseLanguage from "./pages/main/interview/ChooseLanguage";
import Complaint from "./pages/main/complaint/Complaint";
import InterviewSessionDetail from "./pages/main/interview/interviewSessionDetail";
import CompanyJdDetail from "./pages/main/companies/CompanyJdDetail";
import CompareCV from "./components/jobDescription/CompareCV";

const ProtectedRoutes = ({ user }) => {
    if (!user) return <Navigate to="/" replace={true} />;
    return <Outlet />;
};

const PublicRoutes = ({ user }) => {
    if (user) return <Navigate to="/main" replace />;
    return <Outlet />;
};

const App = () => {
    const currentUser = useSelector(selectCurrentUser);

    return (
        <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/upgrade-plan" element={<UpgradePlan />} />
            <Route path="/payment-success" element={<PaymentSuccess />} />
            <Route path="/payment-failed" element={<PaymentFailed />} />

            {/* After analyze */}
            <Route path="/resume/:id" element={<Resume />} />
            <Route path="/jd/:id" element={<JobDescription />} />
            <Route path="/jd/:id/compare" element={<CompareCV />} />

            <Route element={<ProtectedRoutes user={currentUser} />}>
                <Route path="/main" element={<MainPage />}>
                    <Route index element={<InterviewPractice />} />
                    <Route
                        path="interviewPage/:id"
                        element={<InterviewPage />}
                    />
                    <Route path="language/:id" element={<ChooseLanguage />} />

                    <Route path="topic" element={<Topic />} />
                    <Route path="topicDetail/:id" element={<TopicDetail />} />
                    <Route path="profile" element={<Profile />} />
                    <Route path="complaint" element={<Complaint />} />
                    <Route path="feedback/:id" element={<FeedBack />} />

                    {/* Analyze  */}
                    <Route path="analyze/CV" element={<Analyze />} />
                    <Route path="analyze/JD" element={<Analyze />} />

                    {/* Upload cv/jd */}
                    <Route path="upload" element={<UploadPage />} />
                    <Route path="uploadJD" element={<UploadJDPage />} />

                    {/* Companies */}
                    <Route path="companies" element={<Companies />} />
                    <Route path="company/:id" element={<CompanyDetail />} />
                    <Route
                        path="companyJdDetail/:id"
                        element={<CompanyJdDetail />}
                    />

                    <Route path="payment" element={<Payment />} />
                    <Route path="settings" element={<Settings />} />
                    <Route path="forum" element={<Forum />} />
                    <Route path="saved-forum" element={<SavedForum />} />
                    <Route
                        path="singlePostPage/:postId"
                        element={<SinglePostPage />}
                    />
                    <Route path="myPostPage" element={<MyPostPage />} />

                    <Route
                        path="interviewSessionDetail/:id"
                        element={<InterviewSessionDetail />}
                    />

                    {/* HR */}
                    <Route path="updateHR" element={<UpdateHR />} />
                    <Route
                        path="hr/create-question"
                        element={<HRCreateQuestionPage />}
                    />
                </Route>
            </Route>

            {/* Authentication */}
            <Route element={<PublicRoutes user={currentUser} />}>
                <Route path="/login" element={<Auth />} />
                <Route path="/register" element={<Auth />} />
            </Route>
        </Routes>
    );
};

export default App;
