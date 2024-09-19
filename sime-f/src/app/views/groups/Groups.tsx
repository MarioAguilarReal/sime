import { useEffect, useState } from "react";
import "./Groups.scss";
import { useNavigate } from "react-router-dom";
import { Group } from "../../interfaces/school/Group";
import { User } from "../../interfaces/user/User";
import { useLoader } from "../../Global/Context/globalContext";
import { GroupsService } from "../../services/school/GroupsService";
import { toast } from "react-toastify";
import { UsersService } from "../../services/users/UsersService";
import ModalCreate from "../../components/shared/modals/modalsSchool/ModalCreate";
import { studentsData } from "../../common/studentEnums";
import { Classe } from "../../interfaces/school/Classe";

const Groups = () => {
  const [groups, setGroups] = useState([] as Group[]);
  const [users, setUsers] = useState([] as User[]);
  const [showModal, setShowModal] = useState(false);
  const [funct, setFunct] = useState("create");
  const [propGroup, setPropGroup] = useState({} as Group);

  const navigate = useNavigate();
  const { setLoading } = useLoader();

  const handleCreate = async (data: Group) => {
    setLoading(true);
    const resp = await GroupsService.register(data);

    if (resp.status === 200) {
      toast.success("Grupo creado correctamente");
      const newGroups = [...groups];
      let newId = resp.data.id;
      data.id = newId;
      newGroups.push(data);
      setGroups(newGroups);
      setShowModal(!showModal);
    } else {
      toast.error("Error al crear el grupo");
    }
    setLoading(false);
  }

  const handleUpdate = async (data: Group) => {
    setLoading(true);
    const resp = await GroupsService.update(data, data.id as number);
    console.log(resp);
    if (resp.status === 200) {
      toast.success("Grupo actualizado correctamente");
      const newGroups = groups.map(group => {
        if (group.id === data.id) {
          return data;
        }
        return group;
      });
      setGroups(newGroups);
    } else {
      toast.error("Error al actualizar el grupo");
    }
    setShowModal(!showModal);
    setLoading(false);
  }

  const handleDelete = async (id: number) => {
    setLoading(true);
    const resp = await GroupsService.delete(id);
    if (resp.status === 200) {
      toast.success("Grupo eliminado correctamente");
      const newGroups = groups.filter(group => group.id !== id);
      setGroups(newGroups);
    } else {
      toast.error("Error al eliminar el grupo");
    }
    setLoading(false);
  }

  const loadData = async () => {
    setLoading(true);
    let resp = await UsersService.getUsers();
    if (resp.status === 200) {
      setUsers(resp.users);
    } else {
      toast.error("Error al cargar los usuarios");
    }
    let resp2 = await GroupsService.getGroups();
    if (resp2.status === 200) {
      setGroups(resp2.data);
    } else {
      toast.error("Error al cargar los grupos");
    }
    setLoading(false);
  }

  const showModalType = (funct: string, group?: Group) => {
    setFunct(funct);
    if (funct === "edit") {
      setPropGroup(group as Group);
    }
    setShowModal(!showModal);
  }

  useEffect(() => {
    loadData();
  }, [])

  return (
    <div className="groups-table">
      <div className="container">
        <div className="divider">
          <h1 className="title">Grupos</h1>
          <button
            className="btn btn-primary"
            onClick={() => showModalType("create")}
          >
            Crear Grupo
          </button>
        </div>
        <div className="row">
          <div className="col-12">
            <table className="table table-striped">
              <thead>
                <tr className="table-secondary">
                  <th scope="col">ID</th>
                  <th scope="col">Grado</th>
                  <th scope="col">Grupo</th>
                  <th scope="col">Comentarios del Grupo</th>
                  <th scope="col">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {groups.map((group, index) => {
                  return (
                    <tr key={index}>
                      <td>{group.id}</td>
                      <td>{studentsData.grade.find(obj => obj.value === Number(group.grade))?.label}</td>
                      <td>{studentsData.group.find(obj => obj.value === Number(group.group))?.label}</td>
                      <td>{group.comments}</td>
                      <td>
                        <div className="btn-actions">
                          <button
                            className="btn btn-outline-primary me-2"
                            onClick={() => showModalType("edit", group)}
                          >
                            <i className="bi bi-pencil"></i>
                          </button>
                          <button
                            className="btn btn-outline-danger me-2"
                            onClick={() => handleDelete(group.id as number)}
                          >
                            <i className="bi bi-trash"></i>
                          </button>
                        </div>
                        <button
                          className="btn btn-outline-primary me-2"
                          onClick={() => navigate(`/group/overview/${group.id}`)}
                        >
                          <i className="bi bi-eye"></i>
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
      <ModalCreate
        show={showModal}
        onClose={() => setShowModal(!showModal)}
        type="group"
        funct={funct}
        users={users}
        propClass={propGroup}
        onFunct={(data: Group | Classe) => {
          if (funct === "create") {
            if (data.hasOwnProperty('grade') && data.hasOwnProperty('group')) {
              handleCreate(data as Group);
            }
          } else {
            if (data.hasOwnProperty('grade') && data.hasOwnProperty('group')) {
              handleUpdate(data as Group);
            }
          }
        }}
      />
    </div>
  );
};

export default Groups;
