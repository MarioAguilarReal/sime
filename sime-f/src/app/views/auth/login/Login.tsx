import { useContext, useEffect, useState } from "react";
import { AuthContext, useLoader } from "../../../Global/Context/globalContext";
import { AuthService } from "../../../services/auth/AuthService";
import { useNavigate } from "react-router-dom";
import "./Login.scss";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";

interface login {
  email: string;
  password: string;
}

const Login = () => {
  const { dispatchUser }: any = useContext(AuthContext);
  const { setLoading } = useLoader();
  const navigate = useNavigate();
  const {register, handleSubmit, watch, formState: {errors}, } = useForm<login>();

  const [showPassword, setShowPassword] = useState(false);
  const [canLogin, setCanLogin] = useState(false);
  let email = watch("email");
  let password = watch("password");


  const handleLogin = async (data: login) => {
    setLoading(true);

    const resp = await AuthService.login(data);
    if (resp.status === 200) {
      dispatchUser({ type: "LOGIN", payload: resp.user });
      navigate("/dashboard");
    } else {
      toast.error(resp.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (email && password) {
      setCanLogin(true);
    } else {
      setCanLogin(false);
    }
  }, [email, password]);

  return (
    <div className="login">
      <div className="login-form">
        <form>
          <h1>SIME Login</h1>
          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              className="form-control"
              id="email"
              aria-describedby="emailHelp"
              placeholder="Enter email"
              {...register("email", {
                required: true,
                pattern: {
                  value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: "Invalid email address",
                }})}
            />
            {errors.email && <span className="error">*{errors.email.message}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="input-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                className="form-control"
                id="password"
                placeholder="Password"
                {...register("password", {required: true})}
              />
              {/* <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} className="see-pass" onClick={() => setShowPassword(!showPassword)} /> */}
              <i
                className={`bi ${
                  showPassword ? "bi-eye-slash" : "bi-eye"
                } see-pass`}
                onClick={() => setShowPassword(!showPassword)}
              ></i>
            </div>
          </div>
        </form>
        <button className="btn btn-primary" onClick={handleSubmit((data) => handleLogin(data))} disabled={!canLogin}>
          Submit
        </button>
        <ToastContainer />
      </div>
    </div>
  );
};

export default Login;
