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
    <div className='profile'>
      <div className="imagen-section">
        <div className="user-image">
          <img src={user?.photo} alt="user" />
        </div>
      </div>
      <div className="user-information">
        <div className="user-data">
          <p className='name'>{user?.first_name} {user?.last_name}</p>
          <p className='mail'>{user?.email}</p>
          <p className='role'>{user?.role === 1 ? 'Administrador' : 'Usuario'}</p>
        </div>
        <div className="options">
          <button className="button">
            <i className="bi bi-pencil" />
            Editar Perfil
          </button>
          <button className="button" onClick={handleChangePassword}>
            <i className="bi bi-key" />
            Cambiar Contraseña
          </button>
        </div>
      </div>

      <div className="perfil-interaction">
        <div className="perfil-interaction-item">
          <h2>Proyectos</h2>
          <p>0</p>
        </div>
        <div className="perfil-interaction-item">
          <h2>Eventos</h2>
          <p>0</p>
        </div>
        <div className="perfil-interaction-item">
          <h2>Notificaciones</h2>
          <p>0</p>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Profile;
