import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Tab } from "@mui/material";
import {
    Calendar,
    HistoryIcon,
    NotepadText,
    PersonStandingIcon,
} from "lucide-react";

import Info from "./Info";
import Daily from "./Daily";
import History from "./History";

const TABS = {
    PROFILE: "PROFILE",
    HISTORY: "HISTORY",
    DAILY: "DAILY",
};

const Profile = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const getActiveTabFromPath = useCallback(() => {
        if (location.pathname.includes("history")) {
            return TABS.HISTORY;
        } else if (location.pathname.includes("daily")) {
            return TABS.DAILY;
        } else {
            return TABS.PROFILE;
        }
    }, [location.pathname]);

    const [activeTab, setActiveTab] = useState(getActiveTabFromPath());

    useEffect(() => {
        const newTab = getActiveTabFromPath();
        if (newTab !== activeTab) {
            setActiveTab(newTab);
        }
    }, [location.pathname, getActiveTabFromPath, activeTab]);

    const handleChangeTab = useCallback(
        (event, selectedTab) => {
            setActiveTab(selectedTab);

            if (selectedTab === TABS.PROFILE) {
                navigate("/main/profile/info");
            } else if (selectedTab === TABS.DAILY) {
                navigate("/main/profile/daily");
            } else if (selectedTab === TABS.HISTORY) {
                navigate("/main/profile/history");
            }
        },
        [navigate]
    );

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-[#0e0c15] text-gray-900 dark:text-white transition-colors duration-300 container mx-auto py-10 px-4">
            <TabContext value={activeTab}>
                <Box
                    sx={{
                        borderBottom: 1,
                        borderColor: "divider",
                        bgcolor: "transparent",
                    }}
                >
                    <TabList
                        onChange={handleChangeTab}
                        aria-label="Profile Tabs"
                        sx={{
                            "& .MuiTabs-indicator": {
                                transition: "all 0.3s ease-in-out",
                            },
                        }}
                    >
                        <Tab
                            label={
                                <span className="text-gray-900 dark:text-white font-bold">
                                    Profile
                                </span>
                            }
                            value={TABS.PROFILE}
                            icon={
                                <PersonStandingIcon className="text-gray-900 dark:text-white" />
                            }
                            iconPosition="start"
                            sx={{ color: "inherit", fontWeight: "bold" }}
                        />
                        <Tab
                            label={
                                <span className="text-gray-900 dark:text-white">
                                    Daily
                                </span>
                            }
                            value={TABS.DAILY}
                            icon={
                                <Calendar className="text-gray-900 dark:text-white" />
                            }
                            iconPosition="start"
                            sx={{ color: "inherit" }} // Bỏ component={Link}
                        />
                        <Tab
                            label={
                                <span className="text-gray-900 dark:text-white">
                                    History
                                </span>
                            }
                            value={TABS.HISTORY}
                            icon={
                                <HistoryIcon className="text-gray-900 dark:text-white" />
                            }
                            iconPosition="start"
                            sx={{ color: "inherit" }} // Bỏ component={Link}
                        />
                    </TabList>
                </Box>

                <TabPanel value={TABS.PROFILE}>
                    <Info />
                </TabPanel>
                <TabPanel value={TABS.DAILY}>
                    <Daily />
                </TabPanel>
                <TabPanel value={TABS.HISTORY}>
                    <History />
                </TabPanel>
            </TabContext>
        </div>
    );
};

export default Profile;
