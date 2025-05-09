"use client";

import { Typography, Form, Input, Button, Space } from "antd";

const { Title } = Typography;

export default function EditBilling() {
  const [form] = Form.useForm();

  const handleSave = (values: any) => {
    console.log("Billing Info Saved:", values);
  };

  return (
    <div style={{ padding: "30px" }}>
      <Title level={3}>Edit Billing Information</Title>
      <Form
        layout="vertical"
        form={form}
        initialValues={{
          name: "John Doe",
          cardNumber: "**** **** **** 4242",
          expiry: "12/27",
          address: "123 Main Street, Springfield",
        }}
        onFinish={handleSave}
      >
        <Form.Item label="Cardholder Name" name="name">
          <Input />
        </Form.Item>

        <Form.Item label="Card Number" name="cardNumber">
          <Input disabled />
        </Form.Item>

        <Form.Item label="Expiry Date" name="expiry">
          <Input />
        </Form.Item>

        <Form.Item label="Billing Address" name="address">
          <Input />
        </Form.Item>

        <Space>
          <Button type="primary" htmlType="submit">
            Save Changes
          </Button>
          <Button htmlType="button" onClick={() => form.resetFields()}>
            Cancel
          </Button>
        </Space>
      </Form>
    </div>
  );
}
