import { Table, Tag } from "antd";
import React, { useEffect, useState } from "react";
import { getApplyCVStatusToCompany, getComplaintStatusAPI } from "~/apis";

const Complaint = () => {
    const [complaints, setComplaints] = useState([]);
    const [applyStatuses, setApplyStatuses] = useState([]);

    useEffect(() => {
        getComplaintStatusAPI().then((data) => {
            setComplaints(data);
        });
    }, []);

    useEffect(() => {
        getApplyCVStatusToCompany().then((res) => {
            setApplyStatuses(res);
        });
    }, []);

    const getStatusTag = (status) => {
        if (status === null) {
            return <Tag color="warning">IN PROGRESS</Tag>;
        }
        if (status === true) {
            return <Tag color="success">RESOLVED</Tag>;
        }
        if (status === false) {
            return <Tag color="error">CANCELED</Tag>;
        }
    };

    const complaintColumns = [
        {
            title: "Description",
            dataIndex: "description",
            key: "description",
            render: (text) => <spa>{text || <i>No description</i>}</spa>,
        },
        {
            title: "Created At",
            dataIndex: "createAt",
            key: "createAt",
            render: (text) => <span>{text}</span>,
        },
        {
            title: "Status",
            dataIndex: "isHandled",
            key: "isHandled",
            render: (status) => getStatusTag(status),
        },
    ];

    const applyStatusColumns = [
        {
            title: "CV Title",
            dataIndex: "memberCvTitle",
            key: "memberCvTitle",
            render: (text) => <span>{text}</span>,
        },
        {
            title: "Company",
            dataIndex: "companyName",
            key: "companyName",
            render: (text) => <span>{text}</span>,
        },
        {
            title: "CV Link",
            dataIndex: "memberCvLinkToCv",
            key: "memberCvLinkToCv",
            render: (text) => (
                <a
                    href={text}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                >
                    View CV
                </a>
            ),
        },
        {
            title: "Status",
            dataIndex: "isViewed",
            key: "isViewed",
            render: (status) => getStatusTag(status),
        },
    ];

    return (
        <div className="container mx-auto p-4 sm:p-6 min-h-screen">
            <div className="relative z-10">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-6 animate-fade-in">
                    My Complaints
                </h1>
                <Table
                    columns={complaintColumns}
                    dataSource={complaints}
                    className="rounded-lg shadow-md bg-white"
                />
            </div>
            <div className="mt-10 relative z-10">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-6 animate-fade-in">
                    My Apply CV to Company Status
                </h1>
                <Table
                    columns={applyStatusColumns}
                    dataSource={applyStatuses}
                    className="rounded-lg shadow-md bg-white"
                />
            </div>
        </div>
    );
};

export default Complaint;
