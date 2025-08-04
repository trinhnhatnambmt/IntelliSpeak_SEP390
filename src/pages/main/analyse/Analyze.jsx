import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Tab } from "@mui/material";
import { NotepadText, PersonStandingIcon, Save } from "lucide-react";
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import AnalyzeCV from "./AnalyzeCV";
import AnalyzeJD from "./AnalyzeJD";

const TABS = {
    CV: "CV",
    JD: "JD",
};

const Analyze = () => {
    const location = useLocation();

    const getDefaultTab = () => {
        if (location.pathname.includes(TABS.JD)) return TABS.JD;
        return TABS.CV;
    };

    const [activeTab, setActiveTab] = useState(getDefaultTab());

    const handleChangeTab = (event, selectedTab) => {
        setActiveTab(selectedTab);
    };

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-[#0e0c15] text-gray-900 dark:text-white transition-colors duration-300 container mx-auto py-10 px-4">
            <TabContext value={activeTab}>
                <Box sx={{ borderBottom: 1, borderColor: "divider", bgcolor: 'transparent' }}>
                    <TabList onChange={handleChangeTab}>
                        <Tab
                            label={<span className="text-gray-900 dark:text-white font-bold">Tải CV</span>}
                            value={TABS.CV}
                            icon={<PersonStandingIcon className="text-gray-900 dark:text-white" />}
                            iconPosition="start"
                            component={Link}
                            to="/main/analyze/CV"
                            sx={{ color: 'inherit', fontWeight: 'bold' }}
                        />
                        <Tab
                            label={<span className="text-gray-900 dark:text-white">Tải JD</span>}
                            value={TABS.JD}
                            icon={<NotepadText className="text-gray-900 dark:text-white" />}
                            iconPosition="start"
                            component={Link}
                            to="/main/analyze/JD"
                            sx={{ color: 'inherit' }}
                        />
                    </TabList>
                </Box>
                <TabPanel value={TABS.CV}>
                    <div className="text-gray-900 dark:text-white">
                        <AnalyzeCV />
                    </div>
                </TabPanel>
                <TabPanel value={TABS.JD}>
                    <div className="text-gray-900 dark:text-white">
                        <AnalyzeJD />
                    </div>
                </TabPanel>
            </TabContext>
        </div>
    );
};

export default Analyze;
