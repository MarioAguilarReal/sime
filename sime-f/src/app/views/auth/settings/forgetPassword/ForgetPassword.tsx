import { useLocation } from "react-router-dom";
import "./forgetPassword.scss";
import { useLoader } from "../../../../Global/Context/globalContext";
import { set, useForm } from "react-hook-form";
import TextField from "../../../../components/shared/FormInputs/TextField";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { AuthService } from "../../../../services/auth/AuthService";

interface ForgetPasswordForm {
  newPassword: string;
  confirmPassword: string;
}

const ForgetPassword = () => {
  // const navigate = useNavigate();
  const { setLoading } = useLoader();
  const location = useLocation();

  const [token, setToken] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<ForgetPasswordForm>();

  const handleChangePassword = async (data: ForgetPasswordForm) => {
    setLoading(true);
    let passwordCorrect =
      data.newPassword.length >= 8 &&
      data.newPassword.length <= 20 &&
      data.newPassword.match(/[a-z]/g) && // at least one lowercase
      data.newPassword.match(/[A-Z]/g) && // at least one uppercase
      data.newPassword.match(/[0-9]/g) && // at least one number
      data.newPassword.match(/[^a-zA-Z\d]/g); // at least one special character

    if (!passwordCorrect) {
      toast.error(
        "La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un caracter especial"
      );
      setLoading(false);
      return;
    }
    let payload = { ...data, email, token };
    let resp = await AuthService.resetPassword(payload);
    if (resp.status === 200) {
      toast.success(
        "Contraseña cambiada. Esta ventana se cerrará automaticamente en 5 segundos"
      );
      // wait for the toast to show
      await new Promise((resolve) => setTimeout(resolve, 5000));
      window.close();
    } else {
      toast.error(resp.message);
    }
    setLoading(false);
  };

  const verifyToken = async (email: string, token: string) => {
    setLoading(true);
    let resp = await AuthService.verifyToken({ email, token });
    if (resp.status === 200) {
      toast.success(resp.message);
    } else {
      toast.error(resp.message);
      toast.error("Esta ventana se cerrará automaticamente en 5 segundos");
      setTimeout(() => {
        window.close();
      }, 5000);
    }
    setLoading(false);
  };

  useEffect(() => {
    let token = new URLSearchParams(location.search).get("token");
    let email = new URLSearchParams(location.search).get("email");
    if (token && email) {
      setToken(token);
      setEmail(email);
      verifyToken(email, token);
    }
  }, [location]);

  return (
    <div className="forget-password">
      <div className="forget-password-container">
        <div className="header">
          <h1 className="title">Cambiar Contraseña</h1>
        </div>
        <hr className="border border-1 opacity-75" />
        <div className="forget-password-content">
          <div className="forget-password-form">
            <form>
              <div className="form-group">
                <div className="pass">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="form-control"
                    id="password"
                    placeholder="Password"
                    {...register("newPassword", { required: true })}
                  />
                  <i
                    className={`bi ${
                      showPassword ? "bi-eye-slash" : "bi-eye"
                    } see-pass`}
                    onClick={() => setShowPassword(!showPassword)}
                  ></i>
                </div>
              </div>
              <div className="form-group">
                <div className="pass">
                  <input
                  type={showPassword ? "text" : "password"}
                  className="form-control"
                  id="confirmPassword"
                  placeholder="Confirm Password"
                  {...register("confirmPassword", {
                    required: true,
                    validate: (value) =>
                    value === getValues("newPassword") || "Las contraseñas deben coincidir",
                  })}
                  />
                  <i
                  className={`bi ${
                    showPassword ? "bi-eye-slash" : "bi-eye"
                  } see-pass`}
                  onClick={() => setShowPassword(!showPassword)}
                  ></i>
                </div>
                {errors.confirmPassword && (
                  <span className="error">*{errors.confirmPassword.message}</span>
                )}
              </div>
              {errors.newPassword && (
                <span className="error">*{errors.newPassword.message}</span>
              )}
              <div className="interaction">
                <div className="btn cancel" onClick={
                  () => window.close()
                }>
                  <i className="bi bi-chevron-left" />
                  Cancelar
                </div>
                <div
                  className="btn submit"
                  onClick={handleSubmit((data) => {
                    handleChangePassword(data);
                  })}
                >
                  Cambiar Contraseña
                  <i className="bi bi-chevron-right" />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
