import { Modal } from "react-bootstrap";
import "./ModalCreate.scss";
import { useEffect, useState } from "react";
import TextField from "../../FormInputs/TextField";
import SelectField from "../../FormInputs/SelectFIeld";
import Checkbox from "../../FormInputs/CheckBox";
import { useForm } from "react-hook-form";
import { Classe } from "../../../../interfaces/school/Classe";
import { Group } from "../../../../interfaces/school/Group";
import { User } from "../../../../interfaces/user/User";
import { studentsData } from "../../../../common/studentEnums";
import { ClassesService } from "../../../../services/school/ClassesService";

interface ModalProps {
  show: boolean;
  type: string;
  funct: string;
  users: User[];
  propClass: Classe | Group;
  onClose: () => void;
  onFunct: (data: Classe | Group) => void;
}

const ModalCreate = (props: ModalProps) => {
  const { show, type, onClose, onFunct, users, funct, propClass } = props;
  const [usersOptions, setUsers] = useState([] as User[]);
  const [classesOptions, setClassesOptions] = useState([] as Classe[]);

  const titleMode = funct === "create" ? "Crear" : "Editar";
  const title = type === "group" ? `${titleMode} Grupo` : `${titleMode} Clase`;
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    getValues,
    setValue,
    reset,
  } = useForm<Classe & Group>();

  const handleOnSubmit = (data: Classe | Group) => {
    if (data.subject_id) {
      data.subject_id = data.subject_id.map(subject => subject.valueOf());
    }
    reset();
    if (funct === "create") {
      onFunct(data);
    } else {
      onFunct({ ...data, id: propClass.id });
    }
  }

  useEffect(() => {

    const fetchClasses = async () => {
      const resp = await ClassesService.getClasses();
      if (resp.status === 200) {
        setClassesOptions(resp.data);
      }
    };
    fetchClasses();
    setUsers(users);
    if (funct === "edit") {
      setValue("user_id", propClass.user_id);
      if (type === "group") {
        const group = propClass as Group;
        setValue("grade", group.grade);
        setValue("group", group.group);
        setValue("comments", group.comments);
        setValue("subject_id", propClass.subject_id || []);
      }
      if (type === "classe") {
        const classe = propClass as Classe; // Add type assertion here
        setValue("name", classe.name);
        setValue("description", classe.description);
        setValue("max_students", classe.max_students);
        setValue("status", classe.status);
      }
    } else {
      reset();
    }
  }, [props]);

  const getModalType = () => {
    if (type === "classe") {
      return (
        <div>
          <div className="row mb-4">
            <div className="col-12">
              <TextField
                label="Maximo de Estudiantes"
                field="max_students"
                type="number"
                register={register}
                rules={{ required: "Este campo es requerido" }}
              />
              <p className="text-danger">{errors.max_students?.message}</p>
            </div>
          </div>
          <div className="row mb-4">
            <div className="col-12">
              <Checkbox
                label="¿Activo?"
                field="status"
                register={register}
              />
            </div>
            <p className="text-danger">{errors.status?.message}</p>
          </div>
        </div>
      );
    }
  };

  return (
    <div>
      <Modal show={show} onHide={onClose}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="row -mb-4">
              {type === "classe" ?
                <div>
                  <div className="col-12">
                    <TextField
                      label="Nombre"
                      field="name"
                      type="text"
                      register={register}
                      rules={{ required: "Este campo es requerido" }}
                    />
                    <p className="text-danger">{errors.name?.message}</p>
                  </div>
                  <div className="row mb-4">
                    <div className="col-12">
                      <TextField
                        label="Descripción"
                        field="description"
                        type="text"
                        register={register}
                        rules={{ required: "Este campo es requerido" }}
                      />
                      <p className="text-danger">{errors.description?.message}</p>
                    </div>
                  </div>
                  <div className="row mb-4">
                    <div className="col-12">
                      <SelectField
                        label="Usuario"
                        field="user_id"
                        errors={errors}
                        control={control}
                        options={usersOptions?.map((user) => {
                          return { value: user.id, label: user.first_name + " " + user.paternal_surname + " " + user.maternal_surname };
                        })}
                        rules={{ required: "Este campo es requerido" }}
                      />
                    </div>
                  </div>
                </div>
                :
                <div>
                  <div className="row mb-4">
                    <div className="col-12">
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
                  </div>
                  <div className="row mb-4">
                    <div className="col-12">
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
                  <div className="row mb-4">
                    <div className="col-12">
                      <SelectField
                        label="Tutor del Grupo"
                        field="user_id"
                        errors={errors}
                        control={control}
                        options={usersOptions?.map((user) => {
                          return { value: user.id, label: user.first_name + " " + user.paternal_surname + " " + user.maternal_surname };
                        })}
                        rules={{ required: "Este campo es requerido" }}
                      />
                    </div>
                  </div>
                  <div className="row mb-4">
                    <div className="col-12">
                      <TextField
                        label="Comentarios hacia el grupo"
                        field="comments"
                        type="text"
                        register={register}
                      />
                    </div>
                  </div>
                  <div className="row mb-4">
                    <div className="col-12">
                      <SelectField
                        label="Materias"
                        field="subject_id"
                        errors={errors}
                        control={control}
                        options={classesOptions.map(subject => ({
                          value: subject.id,
                          label: subject.name
                        }))}
                        rules={{ required: "Este campo es requerido" }}
                        multiSelect // Propiedad para habilitar la selección múltiple
                      />
                    </div>
                  </div>
                </div>}
            </div>
            {getModalType()}
          </form>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-secondary" onClick={onClose}>
            Cancelar
          </button>
          <button className="btn btn-primary" onClick={handleSubmit((data) => handleOnSubmit(data))}>
            {funct === "create" ? "Crear" : "Actualizar"}
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ModalCreate;
