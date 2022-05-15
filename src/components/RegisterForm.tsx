import { Form, Input, Button, Modal, message } from "antd";
import "antd/dist/antd.css";
import { useMutation } from "@apollo/client";
import { useRouter } from "@uirouter/react";
import { useEffect, useState } from "react";
import { REGISTER_MUTATION } from "../services/mutations";

interface Props {
  children: React.ReactNode;
  handleRegisterFormVisible : () => void;
}

const RegisterForm = ({ children, handleRegisterFormVisible}: Props) => {
  const router = useRouter();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [register] = useMutation(REGISTER_MUTATION);
  const [error, setError] = useState("");

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      router.stateService.go("home");
    }
  }, [router]);

  const onFinish = async (values: any) => {
    console.log("Received values of form: ", values);
    const { data } = await register({ variables: values });
    console.log(data);
    if (data.register.error) {
      showModal(data.register.error);
    }
    if (!data.register.error) {
      message.success(
        "You have successfully registered. Please login to continue.",
        10
      );
      handleRegisterFormVisible();
    }
  };

  const showModal = (error: string) => {
    setError(error);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="fullscreen">
      <h1 className="text-center">Register</h1>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="email"
          name="email"
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Sing Up
          </Button>
        </Form.Item>
      </Form>

      <Modal
        title="Authentication Error"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p className="text-error">{error}</p>
      </Modal>
      {children}
    </div>
  );
};

export default RegisterForm;
