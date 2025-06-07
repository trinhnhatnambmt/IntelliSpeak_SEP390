import { Form, Modal, Select } from "antd";

const ModalInterview = ({ open, onOK, onCancel }) => {
    const handleChange = (value) => {
        console.log(`selected ${value}`);
    };
    return (
        <Modal
            title="Bắt đầu phỏng vấn"
            open={open}
            onOk={onOK}
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
                    label="Loại phỏng vấn bạn muốn luyện tập?"
                    name="typeOfInterview"
                    rules={[
                        {
                            required: true,
                            message: "Chọn loại phỏng vấn!",
                        },
                    ]}
                >
                    <Select
                        defaultValue="technical"
                        style={{ width: "100%" }}
                        onChange={handleChange}
                        options={[
                            {
                                value: "technical",
                                label: "Technical",
                            },
                            {
                                value: "non-technical",
                                label: "Non-Technical",
                            },
                        ]}
                    />
                </Form.Item>
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
                        defaultValue="frontend"
                        style={{ width: "100%" }}
                        onChange={handleChange}
                        options={[
                            {
                                value: "frontend",
                                label: "Frontend",
                            },
                            {
                                value: "backend",
                                label: "Backend",
                            },
                            {
                                value: "fullstack",
                                label: "Fullstack",
                            },
                            {
                                value: "data-scientist",
                                label: "Data Scientist",
                            },
                        ]}
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
                        defaultValue="javascript"
                        style={{ width: "100%" }}
                        onChange={handleChange}
                        options={[
                            {
                                value: "javascript",
                                label: "JavaScript",
                            },
                            {
                                value: "python",
                                label: "Python",
                            },
                            {
                                value: "java",
                                label: "Java",
                            },
                            {
                                value: "csharp",
                                label: "C#",
                            },
                        ]}
                    />
                </Form.Item>
                <Form.Item
                    label="Thời lượng buổi phỏng vấn bạn mong muốn là bao lâu?"
                    name="duration"
                    rules={[
                        {
                            required: true,
                            message: "Chọn thời lượng!",
                        },
                    ]}
                >
                    <Select
                        defaultValue="10ph"
                        style={{ width: "100%" }}
                        onChange={handleChange}
                        options={[
                            {
                                value: "10ph",
                                label: "10 phút",
                            },
                            {
                                value: "20ph",
                                label: "20 phút",
                            },
                            {
                                value: "30ph",
                                label: "30 phút",
                            },
                        ]}
                    />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default ModalInterview;
