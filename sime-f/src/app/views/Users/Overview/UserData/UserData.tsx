import { useEffect, useState } from 'react';
import { User } from '../../../../interfaces/user/User';
import './UserData.scss';
import { UsersService } from '../../../../services/users/UsersService';
import { Classe } from '../../../../interfaces/school/Classe';
import { Group } from '../../../../interfaces/school/Group';

const UserData = (user: User) => {
  const [classes, setClasses] = useState<Classe[]>([]);
  const [groups, setGroups] = useState<Group[]>([]);

  const loadData = async () => {
    if (!user?.id) return;

    let respClases = await UsersService.getUserClasses(user?.id);
    let respGroups = await UsersService.getUserGroups(user?.id);
    if (respClases.status === 200) {
      setClasses(respClases.data);
    }
    if (respGroups.status === 200) {
      setGroups(respGroups.data);
    }
  }

  useEffect(() => {
    loadData();
  }, [user]);

  return (
    <div className="card-data">
      <div className="groups-table table-section">
        <div className="header-data">
          <h6>Grupos</h6>
        </div>
        <div className="table-data">
          <table className='table table-striped'>
            <thead>
              <tr className='table-secondary'>
                <th scope="col">ID</th>
                <th scope="col">Nombre</th>
                <th scope="col">Descripción</th>
                <th scope="col">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {groups?.map(group => (
                <tr key={group.id}>
                  <td>{group.id}</td>
                  <td>{group.grade}</td>
                  <td>{group.group}</td>
                  <td>
                    <button className="btn btn-primary">Ver</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="classes-table table-section">
        <div className="header-data">
          <h6>Clases</h6>
        </div>
        <div className="table-data">
          <table className='table table-striped'>
            <thead>
              <tr className='table-secondary'>
                <th scope="col">ID</th>
                <th scope="col">Nombre</th>
                <th scope="col">Descripción</th>
                <th scope="col">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {classes?.map(clas => (
                <tr key={clas.id}>
                  <td>{clas.id}</td>
                  <td>{clas.name}</td>
                  <td>{clas.description}</td>
                  <td>
                    <button className="btn btn-primary">Ver</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserData;
