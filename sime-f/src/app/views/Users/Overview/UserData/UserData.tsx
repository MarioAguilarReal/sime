import { User } from '../../../../interfaces/user/User';
import './UserData.scss';

const UserData = (user : User) => {
  return (
    <div className="card-data">
      <div className="groups-table">
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
              {/* {user.groups?.map(group => (
                <tr key={group.id}>
                  <td>{group.id}</td>
                  <td>{group.name}</td>
                  <td>{group.description}</td>
                  <td>
                    <button className="btn btn-primary">Ver</button>
                  </td>
                </tr>
              ))} */}
            </tbody>
          </table>
        </div>
      </div>
      <div className="classes-table">
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
              {/* {user.classes?.map(clas => (
                <tr key={clas.id}>
                  <td>{clas.id}</td>
                  <td>{clas.name}</td>
                  <td>{clas.description}</td>
                  <td>
                    <button className="btn btn-primary">Ver</button>
                  </td>
                </tr>
              ))} */}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserData;
