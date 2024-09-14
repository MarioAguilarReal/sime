import { useEffect, useState } from "react"
import { User } from "../../../interfaces/user/User"
import { useLoader } from "../../../Global/Context/globalContext";
import { UsersService } from "../../../services/users/UsersService";
import { AuthService } from "../../../services/auth/AuthService";
import { useNavigate } from "react-router-dom";
import "./UsersTable.scss";

const UsersTable = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [admin, setAdmin] = useState<User>();
  const { setLoading } = useLoader();
  const navigate = useNavigate();

  const loadData = async () => {
    setLoading(true);

    let me = await AuthService.me();
    if (me.status === 200){
      setAdmin(me.user);
    }

    let resp = await UsersService.getUsers();
    if (resp.status === 200) {
      setUsers(resp.users);
    }
    setLoading(false);
  }

  const formatDate = (date: Date) => {
    let d = new Date(date);
    return (d.getDate() < 10 ? `0${d.getDate()}` : d.getDate()) + '-' + ((d.getMonth() + 1) < 10 ? `0${d.getMonth()+1}`: d.getMonth()+1) + '-' + d.getFullYear();
  };

  useEffect(() => {
    loadData();
  }, []);


  return (
    <div className="users-table">
      <div className="container">
        <div className="divider">
          <h1 className="title">USUARIOS</h1>
          <hr />
        </div>
        <div className="row">
          <div className="col-12">
            <table className="table table-striped">
              <thead>
                <tr className="table-primary">
                  <th scope="col">ID</th>
                  <th scope="col">Nombre</th>
                  <th scope="col">Apellidos</th>
                  <th scope="col">Email</th>
                  <th scope="col">Fecha de Nacimiento</th>
                  <th scope="col">Edad</th>
                  <th scope="col">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => {
                  if (user.id !== admin?.id) {
                    return (
                      <tr key={index}>
                        <td>{user.id}</td>
                        <td>{user.first_name}</td>
                        <td>{user.last_name}</td>
                        <td>{user.email}</td>
                        <td>{formatDate(user.birth_date)}</td>
                        <td>{new Date().getFullYear() - new Date(user.birth_date).getFullYear()}</td>
                        <td>
                          <button className="btn btn-primary me-2" onClick={() => navigate(`/user/overview/${user.id}`)}>Ver Usuario</button>
                        </td>
                      </tr>
                    )
                  }
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}


export default UsersTable;
