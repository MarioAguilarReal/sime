import { useForm } from "react-hook-form";
import { Group } from "../../../../interfaces/school/Group";
import "./modalGroup.scss";
import { useEffect, useState } from "react";
import TextField from "../../FormInputs/TextField";
import Checkbox from "../../FormInputs/CheckBox";
import SelectField from "../../FormInputs/SelectFIeld";
import { studentsData } from "./../../../../common/studentEnums";
import { User } from "../../../../interfaces/user/User";
import { MAX_VALUE_REG } from "recharts/types/util/ChartUtils";
import { Classe } from "../../../../interfaces/school/Classe";
import { ClassesService } from "../../../../services/school/ClassesService";
import { useLoader } from "../../../../Global/Context/globalContext";
import { GroupsService } from "../../../../services/school/GroupsService";
import { toast } from "react-toastify";

interface ModalProps {
  show: boolean;
  type: string;
  users: User[];
  propGroup: Group;
  onClose: () => void;
  onFunction: (data: Group) => void;
}

const ModalGroup = (props: ModalProps) => {
  const { show, type, onClose, propGroup, users } = props;
  const { setLoading } = useLoader();


  const [usersOptions, setUsers] = useState([] as User[]);
  const [availableClasses, setAvailableClasses] = useState([] as Classe[]);
  const [GroupClasses, setGroupClasses] = useState([] as Classe[]);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    getValues,
    setValue,
    reset,
  } = useForm<Group>();

  const loadData = async () => {
    await getAvailableClasses();
    if (type === "edit" && propGroup.id) {
      await getGroupClasses(propGroup.id);
    }

  };

  const getAvailableClasses = async () => {
    const resp = await ClassesService.getAvailableClasses();
    if (resp.status === 200) {
      setAvailableClasses(resp.data);
    } else {
      toast('No hay manterias disponibles');
    }
  }

  const getGroupClasses = async (id: number) => {
    const resp = await ClassesService.getClassesByGroup(id);
    if (resp.status === 200) {
      setGroupClasses(resp.data);
    } else {
      toast('El grupo no tiene materias asignadas');
    }
  }

  const handleOnSubmit = (data: Group) => {
    reset();

    if (type === "create") {
      props.onFunction(data);
    } else {
      props.onFunction({ ...data, id: propGroup.id, subject_id: GroupClasses.map((classe) => classe.id as number) });
    }
  };

  const handleRemoveClass = (id: number | undefined) => {
    const removedClass = GroupClasses.find((classe) => classe.id === id);
    const newClasses = GroupClasses.filter((classe) => classe.id !== id);
    setGroupClasses(newClasses);
    setAvailableClasses([...availableClasses, removedClass as Classe]);
  };

  const handleAddClass = (id: number | undefined) => {
    const addedClass = availableClasses.find((classe) => classe.id === id);
    const newClasses = availableClasses.filter((classe) => classe.id !== id);
    setAvailableClasses(newClasses);
    setGroupClasses([...GroupClasses, addedClass as Classe]);
  }



  useEffect(() => {
    if(show){

      loadData();
      setUsers(users);
      if (type === "edit" && propGroup.id) {
        setValue("grade", propGroup.grade);
        setValue("group", propGroup.group);
        setValue("user_id", propGroup.user_id);
        setValue("comments", propGroup.comments);
      }
    }else {
      reset();
      setAvailableClasses([]);
      setGroupClasses([]);
    }
    }, [users, show]);

  return (
    <div className={`modal-group ${show ? "modal-show" : "modal-hide"}`}>
      <div className="modal-content">
        <div className="modal-header">
          <button className="btn-close-modal" onClick={onClose}>
            <i className="bi bi-x"></i> Cerrar Modal
          </button>
          <div className="modal-title">
            <h2>{type === "create" ? "Crear" : "Editar"} Grupo</h2>
          </div>
          <button className="btn-save" onClick={handleSubmit(handleOnSubmit)}>
            Guardar  <i className="bi bi-save"></i>
          </button>
        </div>
        <div className="form">
          <div className="row">
            <div className="col-6">
              <SelectField
                label="Grado"
                field="grade"
                errors={errors}
                control={control}
                options={studentsData.grade?.map((grade) => {
                  return { value: grade.value, label: grade.label };
                })}
                rules={{ required: "Este campo es requerido" }}
              />
            </div>
            <div className="col-6">
              <SelectField
                label="Grupo"
                field="group"
                errors={errors}
                control={control}
                options={studentsData.group?.map((group) => {
                  return { value: group.value, label: group.label };
                })}
                rules={{ required: "Este campo es requerido" }}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-6">
              <SelectField
                label="Tutor del Grupo"
                field="user_id"
                errors={errors}
                control={control}
                options={usersOptions?.map((user) => {
                  return {
                    value: user.id,
                    label:
                      user.first_name +
                      " " +
                      user.paternal_surname +
                      " " +
                      user.maternal_surname,
                  };
                })}
                rules={{ required: "Este campo es requerido" }}
              />
            </div>
            <div className="col-6">
              <TextField
                label="Comentarios hacia el grupo"
                field="comments"
                type="text"
                register={register}
              />
            </div>
          </div>
          <div className="row">
            <div className="classes">
              <p className="classes-title">Materias</p>
              <div className="classes-selector">
                <div className="availables">
                  <div className="header">
                    <p>Materias Disponibles</p>
                  </div>
                  <div className="classes-av">
                    {availableClasses.map((classe, index) => {
                      return (
                        <div key={index} className="class">
                          <p>{classe.name}</p>
                          <button className="btn-add" onClick={() => handleAddClass(classe.id)}>
                            <i className="bi bi-plus"></i>
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="selected">
                  <div className="header">
                    <p>Materias Seleccionadas</p>
                  </div>
                  <div className="classes-sl">
                    {GroupClasses.map((classe, index) => {
                      return (
                        <div key={index} className="class">
                          <button className="btn-remove" onClick={()=>handleRemoveClass( classe.id )} >
                            <i className="bi bi-x"></i>
                          </button>
                          <p>{classe.name}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalGroup;
