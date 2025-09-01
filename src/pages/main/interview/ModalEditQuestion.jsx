import { Modal, Form, Input, Select } from "antd";

import React from "react";

const ModalEditQuestion = ({ onOk, visible, onCancel, form }) => {
    return (
        <Modal
            title="Edit Question"
            visible={visible}
            onOk={onOk}
            onCancel={onCancel}
            okText="Save"
            cancelText="Cancel"
        >
            <Form form={form} layout="vertical">
                <Form.Item
                    name="title"
                    label="Title"
                    rules={[
                        {
                            required: true,
                            message: "Please enter the title",
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="content"
                    label="Content"
                    rules={[
                        {
                            required: true,
                            message: "Please enter the content",
                        },
                    ]}
                >
                    <Input.TextArea rows={4} />
                </Form.Item>
                <Form.Item
                    name="suitableAnswer1"
                    label="Suitable Answer 1"
                    rules={[
                        {
                            required: true,
                            message: "Please enter the first suitable answer",
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="suitableAnswer2"
                    label="Suitable Answer 2"
                    rules={[
                        {
                            required: true,
                            message: "Please enter the second suitable answer",
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="difficulty"
                    label="Difficulty"
                    rules={[
                        {
                            required: true,
                            message: "Please select the difficulty",
                        },
                    ]}
                >
                    <Select>
                        <Option value="EASY">Easy</Option>
                        <Option value="MEDIUM">Medium</Option>
                        <Option value="HARD">Hard</Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    name="source"
                    label="Source"
                    rules={[
                        {
                            required: true,
                            message: "Please enter the source",
                        },
                    ]}
                >
                    <Input disabled />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default ModalEditQuestion;
