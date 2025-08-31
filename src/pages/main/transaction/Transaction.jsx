import React, { useEffect, useState } from "react";
import { Table, Tag } from "antd";
import { getUserTransactionAPI } from "~/apis";
import dayjs from "dayjs";

const Transaction = () => {
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        getUserTransactionAPI().then((res) => {
            setTransactions(res || []);
        });
    }, []);

    const columns = [
        {
            title: "Order Code",
            dataIndex: "orderCode",
            key: "orderCode",
        },
        {
            title: "Status",
            dataIndex: "transactionStatus",
            key: "transactionStatus",
            render: (status) => {
                let color =
                    status === "PAID"
                        ? "green"
                        : status === "PENDING"
                        ? "orange"
                        : "red";
                return <Tag color={color}>{status}</Tag>;
            },
        },
        {
            title: "Amount (VNĐ)",
            dataIndex: "amount",
            key: "amount",
            render: (amount) =>
                amount.toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                }),
        },
        {
            title: "Description",
            dataIndex: "description",
            key: "description",
        },
        {
            title: "Package",
            dataIndex: ["apackage", "packageName"],
            key: "package",
            render: (name, record) => (
                <Tag color="blue">{record.apackage.packageName}</Tag>
            ),
        },
        {
            title: "Created At",
            dataIndex: "createAt",
            key: "createAt",
            render: (date) => dayjs(date).format("YYYY-MM-DD HH:mm"),
        },
    ];

    return (
        <div style={{ padding: 20 }}>
            <h2 className="text-2xl" style={{ marginBottom: 16 }}>
                Transaction History
            </h2>
            <Table
                columns={columns}
                dataSource={transactions}
                rowKey="orderCode"
                bordered
                style={{
                    backgroundColor: "#fff",
                    borderRadius: "10px",
                    position: "relative",
                }}
            />
        </div>
    );
};

export default Transaction;
