import { Form, Modal, Select } from "antd";
import { useState } from "react";

const ModalInterview = ({ open, onOk, onCancel, topicWithTags }) => {
    const [selectedRole, setSelectedRole] = useState(null);

    const handleRoleChange = (value) => {
        setSelectedRole(value); // value = topicId
    };

    console.log("🚀 ~ ModalInterview ~ topicWithTags:", topicWithTags);
    const handleChange = (value) => {
        console.log(`selected ${value}`);
    };

    const getTagsForSelectedRole = () => {
        const topic = topicWithTags.find((t) => t.topicId === selectedRole);
        return topic?.tags || [];
    };

    return (
        <Modal
            title="Bắt đầu phỏng vấn"
            open={open}
            onOk={onOk}
            onCancel={onCancel}
            okText="Bắt đầu phỏng vấn"
            cancelText="Hủy"
        >
            <Form
                name="basic"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                initialValues={{ remember: true }}
                autoComplete="off"
            >
                <Form.Item
                    label="Bạn đang tập trung vào vai trò nào?"
                    name="role"
                    rules={[
                        {
                            required: true,
                            message: "Chọn vai trò phỏng vấn!",
                        },
                    ]}
                >
                    <Select
                        placeholder="Chọn vai trò"
                        style={{ width: "100%" }}
                        onChange={handleRoleChange}
                        options={topicWithTags.map((topic) => ({
                            value: topic.topicId,
                            label: topic.title,
                        }))}
                    />
                </Form.Item>
                <Form.Item
                    label="Bạn muốn luyện tập với tech stack nào?"
                    name="techStack"
                    rules={[
                        {
                            required: true,
                            message: "Chọn tech stack!",
                        },
                    ]}
                >
                    <Select
                        mode="multiple"
                        placeholder="Chọn tech stack"
                        style={{ width: "100%" }}
                        options={getTagsForSelectedRole().map((tag) => ({
                            value: tag.tagId,
                            label: tag.title,
                        }))}
                    />
                </Form.Item>
                <Form.Item
                    label="Số lượng câu hỏi bạn muốn đặt ra trong bài phỏng vấn"
                    name="duration"
                    rules={[
                        {
                            required: true,
                            message: "Chọn số lượng câu hỏi!",
                        },
                    ]}
                >
                    <Select
                        defaultValue="5"
                        style={{ width: "100%" }}
                        onChange={handleChange}
                        options={[
                            {
                                value: "5",
                                label: "5 câu",
                            },
                            {
                                value: "10",
                                label: "10 câu",
                            },
                            {
                                value: "15",
                                label: "15 câu",
                            },
                        ]}
                    />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default ModalInterview;
