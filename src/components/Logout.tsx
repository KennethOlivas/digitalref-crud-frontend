import { useRouter } from "@uirouter/react";
import { Button } from "antd";
const Logout = () => {
  const router = useRouter();
  const handleClick = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    router.stateService.go("login");
  };

  return (
    <div className="abosulte-right-position my-1 mx-4">
      <Button onClick={handleClick}>Logout</Button>
    </div>
  );
};

export default Logout;
