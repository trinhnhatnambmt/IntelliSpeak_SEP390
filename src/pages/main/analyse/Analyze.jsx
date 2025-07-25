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
        <div className="container mx-auto">
            <TabContext value={activeTab}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                    <TabList onChange={handleChangeTab}>
                        <Tab
                            label="Tải CV"
                            value={TABS.CV}
                            icon={<PersonStandingIcon />}
                            iconPosition="start"
                            component={Link}
                            to="/main/analyze/CV"
                            sx={{ color: "#fff", fontWeight: "bold" }}
                        />
                        <Tab
                            label="Tải JD"
                            value={TABS.JD}
                            icon={<NotepadText />}
                            iconPosition="start"
                            component={Link}
                            to="/main/analyze/JD"
                            sx={{ color: "#fff" }}
                        />
                    </TabList>
                </Box>
                <TabPanel value={TABS.CV}>
                    <AnalyzeCV />
                </TabPanel>
                <TabPanel value={TABS.JD}>
                    <AnalyzeJD />
                </TabPanel>
            </TabContext>
        </div>
    );
};

export default Analyze;
