import { useLocation, useNavigate, useParams } from 'react-router-dom';
import './ChangePassword.scss';
import { useLoader } from '../../../../Global/Context/globalContext';
import { useForm } from 'react-hook-form';
import TextField from '../../../../components/shared/FormInputs/TextField';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { AuthService } from '../../../../services/auth/AuthService';

interface ChangePassword {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const ChangePassword = () => {
  const navigate = useNavigate();
  const {setLoading} = useLoader();
  const location = useLocation();

  const [ token, setToken ] = useState<string>();
  const [ email, setEmail ] = useState<string>();

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    getValues,
    watch,
  } = useForm<ChangePassword>();

  const currentPassword = watch('currentPassword');
  const newPassword = watch('newPassword');
  const confirmPassword = watch('confirmPassword');

  const handleChangePassword = async (data: ChangePassword) => {
    setLoading(true);
    if (newPassword === currentPassword) {
      toast.error('La nueva contraseña no puede ser igual a la actual');
      setLoading(false);
      return;
    }
    let payload = {...data, email, token};
    let resp = await AuthService.changePassword(payload);
    if(resp.status === 200){
      toast.success('Contraseña cambiada. Esta ventana se cerrará automaticamente en 5 segundos');
      // wait for the toast to show
      await new Promise((resolve) => setTimeout(resolve, 5000));
      window.close();
    }else{
      toast.error(resp.message);
    }
    setLoading(false);
  }


  useEffect(() => {
    let token = new URLSearchParams(location.search).get('token');
    let email = new URLSearchParams(location.search).get('email');
    if(token && email){
      setToken(token);
      setEmail(email);
    }
  }, []);


  return(
    <div className="change-password">
      <div className='change-password-container'>
        <div className="header">
          <h1 className="title">
            Cambiar Contraseña
          </h1>
          <button className="btn btn-primary">
            <i className="bi bi-chevron-left" />
            Cancelar
          </button>
        </div>
        <hr className="border border-secondary border-1 opacity-75" />
        <div className="change-password-content">
          <div className="change-password-form">
            <form>
              <div className="row mb-4">
                <div className="col-12">
                  <TextField
                    label="Contraseña Actual"
                    type="password"
                    field="currentPassword"
                    register={register}
                    rules={{ required: "Este campo es requerido" }}
                  />
                </div>
                <p className="text-danger">{errors.currentPassword?.message}</p>
              </div>
              <div className="row mb-4">
                <div className="col-12">
                  <TextField
                    label="Nueva Contraseña"
                    type="password"
                    field="newPassword"
                    register={register}
                    rules={{ required: "Este campo es requerido" }}
                  />
                  <p className="text-danger">{errors.newPassword?.message}</p>
                </div>
              </div>
              <div className="row mb-4">
                <div className="col-12">
                  <TextField
                    label="Confirmar Contraseña"
                    type="password"
                    field="confirmPassword"
                    register={register}
                    rules={{ required: "Este campo es requerido",
                    validate: (value : any) => value === getValues('newPassword') || "Las contraseñas no coinciden"}}
                    // errors={errors.confirmPassword}
                  />
                  <p className="text-danger">{errors.confirmPassword?.message}</p>
                </div>
              </div>
              <button type="submit" className="btn btn-primary" onClick={handleSubmit((data) => {
                handleChangePassword(data);
              })}>
                Cambiar Contraseña
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}


export default ChangePassword;
