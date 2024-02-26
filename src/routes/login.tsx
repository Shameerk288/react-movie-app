import { useMutation } from "@tanstack/react-query";
import { login } from "../components/mutation";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const { data, mutateAsync, isSuccess } = useMutation({
    mutationKey: ["login"],
    mutationFn: login,
  });

  const navigate = useNavigate();

  const handleLogin = async () => {
    await mutateAsync();
    localStorage.setItem("guest_session_id", data.guest_session_id);
    navigate("/");
  };

  if (isSuccess) {
    handleLogin();
  }

  return (
    <div>
      <h2 className="mt-5 mb-4" style={{ fontWeight: "bold" }}>
        Welcome! Please login
      </h2>

      <button className="btn btn-primary" onClick={handleLogin}>
        Login
      </button>
    </div>
  );
};

export default Auth;
