import { Button } from "antd";
import { useState } from "react";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";

const LoginPage = () => {
  const [isRegisterFormVisible, setIsRegisterFormVisible] = useState(false);

  const handleRegisterFormVisible = () => {
    setIsRegisterFormVisible(!isRegisterFormVisible);
  };

  if (isRegisterFormVisible) {
    return (
      <>
        <RegisterForm handleRegisterFormVisible={handleRegisterFormVisible} 
          children={
            <Button type="link" onClick={handleRegisterFormVisible}>
              Login
            </Button>
          }
        />
      </>
    );
  } else {
    return (
      <>
        <LoginForm
          children={
            <Button type="link" onClick={handleRegisterFormVisible}>
              Create Account
            </Button>
          }
        />
      </>
    );
  }
};
export default LoginPage;
