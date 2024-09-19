import { useEffect, useState } from 'react';
import { User } from '../../../interfaces/user/User';
import UserCard from './UserCard/UserCard';
import UserData from './UserData/UserData';
import './UserOverview.scss';
import { useLoader } from '../../../Global/Context/globalContext';
import { UsersService } from '../../../services/users/UsersService';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

const UserOverview = () => {

  const { setLoading } = useLoader();
  const { id } = useParams();

  const [user, setUser] = useState<User>({} as User);

  const loadData = async (userId: number) => {
    setLoading(true);
    let resp = await UsersService.getUser(userId);
    if (resp.status === 200) {
      setUser(resp.user);
    }
    setLoading(false);
  }

  useEffect(() => {
    if (id) {
      let userId = parseInt(id);
      loadData(userId);
    }
  }, [id]);

  return (
    <div className="user-overview">
      <div className="header">
        <h1 className="title">
          <i className="bi bi-person" />
          Información del Usuario: {user.first_name + " " + user.paternal_surname + " " + user.maternal_surname}
        </h1>
        <Link to="/list/users" className="btn btn-primary">
          <i className="bi bi-chevron-left" />
          Volver
        </Link>
      </div>
      <div className="user-content">
        <div className="data">
          <UserData {...user} />
        </div>
        <div className="info">
          <UserCard {...user} />
        </div>
      </div>
    </div>
  );
}

export default UserOverview;
