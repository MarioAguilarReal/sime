import { useState } from "react";
import "./Groups.scss";
import { useNavigate } from "react-router-dom";
import { Group } from "../../interfaces/school/Group";

const Groups = () => {
  const [groups, setGroups] = useState([] as Group[]);

  const navigate = useNavigate();

  return (
    <div className="groups-table">
      <div className="container">
        <div className="divider">
          <h1 className="title">Grupos</h1>
        </div>
        <div className="row">
          <div className="col-12">
            <table className="table table-striped">
              <thead>
                <tr className="table-secondary">
                  <th scope="col">ID</th>
                  <th scope="col">Nombre</th>
                  <th scope="col">Descripción</th>
                  <th scope="col">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {groups.map((group, index) => {
                  return (
                    <tr key={index}>
                      <td>{group.id}</td>
                      <td>{group.name}</td>
                      <td>{group.description}</td>
                      <td>{group.user_id}</td>
                      <td>
                        <button
                          className="btn btn-primary me-2"
                          onClick={() => navigate(`/group/overview/${group.id}`)}
                        >
                          Ver Grupo
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Groups;
