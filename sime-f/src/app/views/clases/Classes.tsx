import { useEffect, useState } from "react";
import "./Classes.scss";
import { useNavigate } from "react-router-dom";
import { Classe } from "../../interfaces/school/Classe";
import ModalCreate from "../../components/shared/modals/modalsSchool/ModalCreate";
import { UsersService } from "../../services/users/UsersService";
import { User } from "../../interfaces/user/User";
import { useLoader } from "../../Global/Context/globalContext";
import { toast } from "react-toastify";
import { ClassesService } from "../../services/school/ClassesService";
import { Group } from "../../interfaces/school/Group";
import DeleteModal from "../../components/shared/modals/modalDelete/DeleteModal";

const Classes = () => {
  const [classes, setClasses] = useState([] as Classe[]);
  const [users, setUsers] = useState([] as User[]);
  const [showModal, setShowModal] = useState(false);
  const [funct, setFunct] = useState("create");
  const [propClass, setPropClass] = useState({} as Classe)

  const navigate = useNavigate();
  const { setLoading } = useLoader();

  const handleCreate = async (data: Classe) => {
    setLoading(true);
    data.status = true;//por defecto la materia se crea activa
    const resp = await ClassesService.register(data);

    if (resp.status === 200) {
      toast.success("Materia creada correctamente");
      const newClasses = [...classes];//clonar el array
      let newId = resp.data.id;
      data.id = newId;
      newClasses.push(data);//agregar el nuevo elemento
      setClasses(newClasses);//actualizar el estado con la finalidad de volver a cargar la tabla desde el servidor
      setShowModal(!showModal);

    } else {
      toast.error("Error al crear la materia");
    }
    setLoading(false);
  }


  const handleUpdate = async (data: Classe) => {
    setLoading(true);
    const resp = await ClassesService.update(data, data.id as number);

    if (resp.status === 200) {
      toast.success("Materia actualizada correctamente");
      const newClasses = classes.map((classe) => {
        if (classe.id === data.id) {
          return data;
        }
        return classe;
      });
      setClasses(newClasses);
    } else {
      toast.error("Error al actualizar la materia");
    }
    setShowModal(!showModal);
    setLoading(false);
  }


  const handleDelete = async (id: number) => {
    setLoading(true);
    const resp = await ClassesService.delete(id);
    if (resp.status === 200) {
      toast.success("Materia eliminada correctamente");
      const newClasses = classes.filter((classe) => classe.id !== id);
      setClasses(newClasses);
    } else {
      toast.error("Error al eliminar la materia");
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
    let resp2 = await ClassesService.getClasses();
    if (resp2.status === 200) {
      setClasses(resp2.data);
    } else {
      toast.error("Error al cargar las materias");
    }
    setLoading(false);
  }

  const showModalType = (funct: string, classe?: Classe) => {
    setFunct(funct);
    if (funct === "edit") {
      setPropClass(classe as Classe);
    }
    setShowModal(!showModal);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="classes-table">
      <div className="container">
        <div className="divider">
          <h2 className="title">Materias</h2>
          <button className="btn btn-add"
            onClick={() => showModalType('create')}
          >
            <i className="bi bi-plus-lg"></i>
            &nbsp;
            Crear Materia
          </button>
        </div>
        <div className="row">
          <div className="col-12">
            <table className="table table-striped">
              <thead>
                <tr className="table-secondary">
                  <th scope="col">ID</th>
                  <th scope="col">Nombre</th>
                  <th scope="col">Descripción</th>
                  <th scope="col">Profesor</th>
                  <th scope="col">Máximo de estudiantes</th>
                  <th scope="col">Estado</th>
                  <th scope="col">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {classes.map((classe, index) => {
                  return (
                    <tr key={index}>
                      <td>{classe.id}</td>
                      <td>{classe.name}</td>
                      <td>{classe.description}</td>
                      <td>{users.find((user) => user?.id === parseInt(classe?.user_id))?.first_name}</td>
                      <td>{classe.max_students}</td>
                      <td>{classe.status ? "Activo" : "Inactivo"}</td>
                      <td>
                        <div className="btn-actions">
                          <button
                            className="btn btn-outline-primary me-2"
                            onClick={() => showModalType("edit", classe)}
                            >
                            <i className="bi bi-pencil"></i>
                          </button>
                          <button
                            className="btn btn-outline-danger me-2"
                            onClick={() => handleDelete(classe.id as number)}
                            >
                            <i className="bi bi-trash"></i>
                          </button>
                        </div>
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
        type="classe"
        funct={funct}
        users={users}
        propClass={propClass}
        onFunct={(data: Classe | Group) => {
          if (funct === "create") {
            handleCreate(data as Classe);
          } else {
            handleUpdate(data as Classe);
          }
        }}
      />
      {/* <DeleteModal
        obj="Materia"
        show={showDeleteModal}
        onClose={() => setShowDeleteModal(!showDeleteModal)}
        onDelete={() => handleDelete(propClass.id as number)}
      /> */}
    </div>
  );
};

export default Classes;
