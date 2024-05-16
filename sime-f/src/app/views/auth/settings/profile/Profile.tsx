import { useEffect, useReducer, useState } from 'react';
import './Profile.scss';
import { User } from '../../../../interfaces/user/User';
import { useLoader } from '../../../../Global/Context/globalContext';
import { AuthService } from '../../../../services/auth/AuthService';
import { ToastContainer, toast } from 'react-toastify';

const Profile = () => {
  const [user, setUser] = useState<User>({} as User);
  const { setLoading } = useLoader();

  const handleChangePassword = async() => {
    setLoading(true);
    let resp = await AuthService.sendEmailToChangePassword(user?.id);
    console.log('resp: ', resp);
    if(resp.status === 200){
      toast.success('Se ha enviado un correo para cambiar la contraseña');
    }else{
      toast.error('Error al enviar el correo para cambiar la contraseña');
    }
    setLoading(false);
  }

  const loadData = () => {
    setLoading(true);
    let sessionUser: any = sessionStorage.getItem("user");
    if (sessionUser) {
      setUser(JSON.parse(sessionUser));
    }
    setLoading(false);
  }

  useEffect(() => {
  }, [user]);

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      Profile

      <div className="actions">
        <button className="btn btn-primary">
          <i className="bi bi-pencil" />
          Editar Perfil
        </button>
        <button className="btn btn-primary" onClick={handleChangePassword}>
          <i className="bi bi-key" />
          Cambiar Contraseña
        </button>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Profile;
