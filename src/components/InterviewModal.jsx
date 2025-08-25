import { Form, Modal, Select } from "antd";
import { useState, useEffect } from "react";
import { getAllTag } from "~/apis";


const ModalInterview = ({ open, onOk, onCancel, topicWithTags }) => {
    const [form] = Form.useForm();
    const [allTags, setAllTags] = useState([]);

    useEffect(() => {
        const fetchTags = async () => {
            try {
                const tags = await getAllTag();
                setAllTags(tags);
                console.log("Fetched tags:", tags);
            } catch {
                setAllTags([]);
            }
        };
        fetchTags();
    }, []);

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
        } catch (error) {
            console.log("Validation failed:", error);
        }
    };

    const handleCancelClick = () => {
        form.resetFields();
        onCancel();
    };

    return (
        <Modal
            title="Create Interview Template"
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
                        // onChange removed, no longer needed
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
                    <div className="flex flex-wrap gap-2">
                        {allTags.map((tag) => (
                            <label key={tag.tagId || tag.id} className="flex items-center gap-1 bg-gray-50 dark:bg-[#23232a] px-2 py-1 rounded border border-gray-200 dark:border-[#333]">
                                <Form.Item name="techStack" noStyle valuePropName="checked">
                                    <input
                                        type="checkbox"
                                        value={tag.tagId || tag.id}
                                        onChange={e => {
                                            const checked = e.target.checked;
                                            const value = String(tag.tagId || tag.id);
                                            const prev = form.getFieldValue("techStack") || [];
                                            if (checked) {
                                                form.setFieldsValue({ techStack: [...prev, value] });
                                            } else {
                                                form.setFieldsValue({ techStack: prev.filter((id) => id !== value) });
                                            }
                                        }}
                                        checked={(form.getFieldValue("techStack") || []).includes(String(tag.tagId || tag.id))}
                                        disabled={false}
                                    />
                                </Form.Item>
                                <span className="text-xs text-gray-700 dark:text-gray-200">{tag.title}</span>
                            </label>
                        ))}
                    </div>
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
                                value: "3",
                                label: "3 questions",
                            },
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
