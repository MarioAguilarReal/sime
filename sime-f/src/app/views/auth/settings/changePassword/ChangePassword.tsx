import { useLocation, useNavigate } from 'react-router-dom';
import "./ChangePassword.scss";
import { AuthContext, useLoader } from "../../../../Global/Context/globalContext";
import { useForm } from "react-hook-form";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { AuthService } from "../../../../services/auth/AuthService";
import { User } from "../../../../interfaces/user/User";

interface ChangePasswordForm {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const ChangePassword = () => {
  const navigate = useNavigate();
  const { setLoading } = useLoader();
  const { dispatchUser }: any = useContext(AuthContext);
  // const location = useLocation();

  const [user, setUser] = useState<User>({} as User);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<ChangePasswordForm>();

  const handleChangePassword = async (data: ChangePasswordForm) => {
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

    let payload = { ...data, email: user?.email };
    let resp = await AuthService.changePassword(payload);
    if (resp.status === 200) {
      toast.success(
        "Contraseña cambiada. Por favor, inicie sesión nuevamente."
      );
      logout();
    } else {
      toast.error(resp.message);
    }
    setLoading(false);
  };

  const logout = async () => {
    setLoading(true);
    const resp = await AuthService.logout();
    if (resp.status === 200) {
      dispatchUser({ type: "LOGOUT" });
      navigate("/");
    } else {
    }
    setLoading(false);
  };

  const loadData = () => {
    setLoading(true);
    let sessionUser: any = sessionStorage.getItem("user");
    if (sessionUser) {
      setUser(JSON.parse(sessionUser));
    }
    setLoading(false);
  };

  useEffect(() => {}, [user]);

  useEffect(() => {
    loadData();
  },[]);

  return (
    <div className="change-password">
      <div className="change-password-container">
        <div className="header">
          <h1 className="title">Cambiar Contraseña</h1>
        </div>
        <hr className="border border-1 opacity-75" />
        <div className="change-password-content">
          <div className="change-password-form">
          <form>
              <div className="form-group">
                <div className="pass">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="form-control"
                    id="current-password"
                    placeholder="Current Password"
                    autoComplete='off'
                    {...register("currentPassword", { required: true })}
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
                    id="new-password"
                    placeholder="New Password"
                    autoComplete='off'
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
                  id="confirm-new-password"
                  placeholder="Confirm New Password"
                  autoComplete='off'
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
                  () => navigate(-1)
                } >
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

export default ChangePassword;
