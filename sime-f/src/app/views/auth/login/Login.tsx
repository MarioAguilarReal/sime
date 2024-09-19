import { useContext, useEffect, useState } from "react";
import { AuthContext, useLoader } from "../../../Global/Context/globalContext";
import { AuthService } from "../../../services/auth/AuthService";
import { useNavigate } from "react-router-dom";
import "./Login.scss";
import { set, useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import { PATTERNS } from "../../../components/shared/FormInputs/patterns";

interface login {
  email: string;
  password: string;
}

const Login = () => {
  const { dispatchUser }: any = useContext(AuthContext);
  const { setLoading } = useLoader();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<login>();

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

  const handleForgetPassword = async  () => {
    setLoading(true);
    if(email){
      let resp = await AuthService.sendEmailToForgetPassword(email);
      console.log("resp: ", resp);
      if (resp.status === 200) {
        toast.success(resp.message + ": " + email);
      } else {
        toast.error(resp.message);
      }
    } else {
      toast.error("Por favor ingrese su correo electrónico");
    }
    setLoading(false);
  }

  useEffect(() => {
    if (email && password) {
      setCanLogin(true);
    } else {
      setCanLogin(false);
    }
  }, [email, password]);

  useEffect(() => {
    document.addEventListener("keydown", (e) => {
      if (e.key === "Enter" && canLogin) {
        handleSubmit((data) => handleLogin(data))();
      }
    });

    return () => {
      document.removeEventListener("keydown", () => {});
    };
  }, [canLogin]);

  return (
    <div className="login">
      <div className="login-wrapper">
        <div className="login-image"></div>
        <div className="login-form">
          <h1 style={{ color: "white" }}>Iniciar Sesión</h1>
          <form>
            <div className="form-group">
              <input
                type="email"
                className="form-control"
                id="email"
                aria-describedby="emailHelp"
                placeholder="Correo Electrónico"
                {...register("email", {
                  required: true,
                  pattern: {
                    value: PATTERNS.emailRegEx,
                    message: "Invalid email address",
                  },
                })}
              />
              {errors.email && (
                <span className="error">*{errors.email.message}</span>
              )}
            </div>
            <div className="form-group">
              <div className="pass">
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control"
                  id="password"
                  placeholder="Contraseña"
                  {...register("password", { required: true })}
                />
                <i
                  className={`bi ${
                    showPassword ? "bi-eye-slash" : "bi-eye"
                  } see-pass`}
                  onClick={() => setShowPassword(!showPassword)}
                ></i>
              </div>
            </div>
          </form>
          <div className="forgot-password">
            {/* <a href="/forgot-password">Recuperar Contraseña</a> */}
            <p role="button" onClick={handleForgetPassword}>Recuperar Contraseña</p>
          </div>
          <button
            className="btn-xl"
            onClick={handleSubmit((data) => handleLogin(data))}
            disabled={password?.length < 8 || !canLogin}
          >
            Iniciar Sesión <i className="bi bi-box-arrow-in-right"></i>
          </button>
          <ToastContainer />
        </div>
      </div>
    </div>
  );
};

export default Login;
