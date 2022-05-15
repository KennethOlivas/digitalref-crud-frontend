import { gql, useMutation } from "@apollo/client";
import { Form, Input, Button, Modal, InputNumber } from "antd";
import { useState } from "react";

interface ICreateProductProps {
  onCreateProduct: (values: any) => void;
}

const CreateProduct = ({ onCreateProduct }: ICreateProductProps) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const onFinish = async (values: any) => {
    onCreateProduct(values);
    handleOk();
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Button
        type="primary"
        className="my-2"
        onClick={() => {
          setIsModalVisible(true);
        }}
      >
        Create Product
      </Button>
      <Modal
        title="Create Product"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[]}
      >
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: " name!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Price"
            name="price"
            rules={[{ required: true, message: " price!" }]}
          >
            <InputNumber step="0.01" />
          </Form.Item>

          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: " description!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Quantity"
            name="quantity"
            rules={[{ required: true, message: " quantity!" }]}
          >
            <InputNumber />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default CreateProduct;
