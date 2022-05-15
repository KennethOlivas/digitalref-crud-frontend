import { Form, Input, Button, Modal } from "antd";
import "antd/dist/antd.css";
import { useMutation } from "@apollo/client";
import { useRouter } from "@uirouter/react";
import { useEffect, useState } from "react";
import { LOGIN_MUTATION } from "../services/mutations";
import RegisterForm from "./RegisterForm";

interface Props {
	children: React.ReactNode
}

const LoginForm = ({children}: Props) => {
  const router = useRouter();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [login] = useMutation(LOGIN_MUTATION);
  const [error, setError] = useState("");

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      router.stateService.go("home");
    }
  }, [router]);

  const onFinish = async (values: any) => {
    console.log("Received values of form: ", values);
    const { data } = await login({ variables: values });
    console.log(data);
    if (data.login.error) {
      showModal(data.login.error);
    }
    if (!data.login.error) {
      localStorage.setItem("accessToken", data.login.accessToken);
      localStorage.setItem("refreshToken", data.login.refreshToken);
      router.stateService.go("home");
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
      {}
      <h1 className="text-center">Login</h1>
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
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Sing in
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

export default LoginForm;
