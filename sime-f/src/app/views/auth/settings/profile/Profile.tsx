import { useEffect, useState } from 'react';
import './Profile.scss';
import { User } from '../../../../interfaces/user/User';
import { useLoader } from '../../../../Global/Context/globalContext';
import { ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [user, setUser] = useState<User>({} as User);
  const { setLoading } = useLoader();
  const navigate = useNavigate();

  const handleChangePassword = () => {
    navigate(`/auth/change-password/${user.id}`);
    // setLoading(true);
    // let resp = await AuthService.sendEmailToChangePassword(user?.id);
    // console.log('resp: ', resp);
    // if(resp.status === 200){
    //   toast.success('Se ha enviado un correo para cambiar la contraseña');
    // }else{
    //   toast.error('Error al enviar el correo para cambiar la contraseña');
    // }
    // setLoading(false);
  }


  const handleEditProfile = () => {
    navigate(`/auth/edit-profile/${user.id}`);
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
  });

  return (
    <div className='profile'>
      <div className="navigation">
        <button className='button' onClick={() => navigate('/dashboard') }>
          <i className='bi bi-chevron-left' /><i className="bi bi-house" />
          Inicio
        </button>
      </div>
      <div className="image-section">
        <div className="user-image">
          <img src={user?.photo ? user?.photo : '/assets/images/default-user.jpg'} alt="user" />
        </div>
      </div>
      <div className="user-information">
        <div className="user-data">
          <p className='name'>{user?.first_name} {user?.last_name}</p>
          <p className='mail'>{user?.email}</p>
          <p className='role'>{user?.role === 1 ? 'Administrador' : 'Usuario'}</p>
        </div>
        <div className="options">
          <button className="button" onClick={handleEditProfile} >
            <i className="bi bi-pencil" />
            Editar Perfil
          </button>
          <button className="button" onClick={handleChangePassword}>
            <i className="bi bi-key" />
            Cambiar Contraseña
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Profile;
