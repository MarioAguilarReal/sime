import { useContext, useEffect, useState } from "react";
import { AuthContext, useLoader } from "../../../Global/Context/globalContext";
import { User } from "./../../../interfaces/user/User";
import { AuthService } from "../../../services/auth/AuthService";
import { useNavigate } from "react-router-dom";
import "./Login.scss";
import { useForm } from "react-hook-form";

interface login {
  email: string;
  password: string;
}

const Login = () => {
  const { dispatchUser }: any = useContext(AuthContext);
  const { setLoading } = useLoader();

  const [showPassword, setShowPassword] = useState(false);
  const [user, setUser] = useState({} as User);
  const [canLogin, setCanLogin] = useState(false);

  const {register, handleSubmit, watch, formState: {errors}, } = useForm<login>();

  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true);

    const resp = await AuthService.login(user);

    if (resp.status === 200) {
      dispatchUser({ type: "LOGIN", payload: resp.user });
      navigate("/dashboard");
    } else {
      // we can use a toast library to show the message
      console.log(resp.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    setUser({
      email: watch("email"),
      password: watch("password"),
    });

    if (watch("email") && watch("password")) {
      setCanLogin(true);
    } else {
      setCanLogin(false);
    }

  }, [watch("email"), watch("password")]);


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
              {...register("email", {required: true})}
            />
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
        <button className="btn btn-primary" onClick={handleSubmit(handleLogin)} disabled={!canLogin}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default Login;
