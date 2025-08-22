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
        form.resetFields();
        setSelectedRole(null);
        onCancel();
    };

    return (
        <Modal
            title="Create Interview Session"
            open={open}
            onOk={handleSubmit}
            onCancel={handleCancelClick}
            okText="Create Interview"
            cancelText="Cancel"
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
                    label="Which role are you focusing on?"
                    name="role"
                    rules={[
                        {
                            required: true,
                            message: "Please select a role!",
                        },
                    ]}
                >
                    <Select
                        placeholder="Select role"
                        style={{ width: "100%" }}
                        onChange={handleRoleChange}
                        options={topicWithTags.map((topic) => ({
                            value: topic.topicId,
                            label: topic.title,
                        }))}
                    />
                </Form.Item>
                <Form.Item
                    label="Which tech stack would you like to practice with?"
                    name="techStack"
                    rules={[
                        {
                            required: true,
                            message: "Please select at least one tech stack!",
                        },
                    ]}
                >
                    <Select
                        mode="multiple"
                        placeholder="Select tech stack"
                        style={{ width: "100%" }}
                        options={getTagsForSelectedRole().map((tag) => ({
                            value: tag.tagId,
                            label: tag.title,
                        }))}
                    />
                </Form.Item>
                <Form.Item
                    label="How many questions do you want in the interview?"
                    name="duration"
                    rules={[
                        {
                            required: true,
                            message: "Please choose the number of questions!",
                        },
                    ]}
                >
                    <Select
                        placeholder="Select number of questions"
                        style={{ width: "100%" }}
                        options={[
                            {
                                value: "5",
                                label: "5 questions",
                            },
                            {
                                value: "10",
                                label: "10 questions",
                            },
                            {
                                value: "15",
                                label: "15 questions",
                            },
                        ]}
                    />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default ModalInterview;
