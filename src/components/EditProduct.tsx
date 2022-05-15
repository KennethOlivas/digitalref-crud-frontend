import { Modal, Form, Input, InputNumber, Button } from "antd";
import { useState } from "react";

interface IEditProductProps {
  onEditProduct: (values: any) => void;
  setValues: any;
}

const EditProduct = ({ onEditProduct, setValues }: IEditProductProps) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const onFinish = async (values: any) => {
    onEditProduct({ ...values, id: setValues.key });
    handleOk();
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div>
      <Button type="primary" onClick={() => setIsModalVisible(true)}>
        Edit Product
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
            initialValue={setValues.name}
            rules={[{ required: false, message: " name!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Price"
            name="price"
            initialValue={setValues.price}
            rules={[{ required: false, message: " price!" }]}
          >
            <InputNumber step="0.01" />
          </Form.Item>

          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: false, message: " description!" }]}
            initialValue={setValues.description}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Quantity"
            name="quantity"
            rules={[{ required: false, message: " quantity!" }]}
            initialValue={setValues.quantity}
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
    </div>
  );
};

export default EditProduct;
