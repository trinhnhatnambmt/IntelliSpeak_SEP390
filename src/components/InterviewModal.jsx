import { Form, Modal, Select } from "antd";
import { useState } from "react";

const ModalInterview = ({ open, onOk, onCancel, topicWithTags }) => {
    const [form] = Form.useForm();
    const [selectedRole, setSelectedRole] = useState(null);

    const handleRoleChange = (value) => {
        setSelectedRole(value);
    };

    const getTagsForSelectedRole = () => {
        const topic = topicWithTags.find((t) => t.topicId === selectedRole);
        return topic?.tags || [];
    };

    const handleSubmit = async () => {
        try {
            const values = await form.validateFields();
            const payload = {
                numberOfQuestion: Number(values.duration),
                topicId: values.role,
                tagIds: values.techStack,
            };
            onOk(payload);
            form.resetFields();
            setSelectedRole(null);
        } catch (error) {
            console.log("Validation failed:", error);
        }
    };

    const handleCancelClick = () => {
        form.resetFields(); // ✅ clear khi bấm close
        setSelectedRole(null);
        onCancel();
    };

    return (
        <Modal
            title="Tạo buổi phỏng vấn"
            open={open}
            onOk={handleSubmit}
            onCancel={handleCancelClick}
            okText="Tạo buổi phỏng vấn"
            cancelText="Hủy"
        >
            <Form
                form={form}
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
                        placeholder="Chọn số lượng câu hỏi"
                        style={{ width: "100%" }}
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
