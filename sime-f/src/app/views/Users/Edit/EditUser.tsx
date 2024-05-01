import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UsersService } from "../../../services/users/UsersService";
import { ToastContainer, toast } from "react-toastify";
import { CheckboxList } from "../../../components/shared/FormInputs/CheckBox";
import TextField from "../../../components/shared/FormInputs/TextField";
import SelectField from "../../../components/shared/FormInputs/SelectFIeld";
import { useForm } from "react-hook-form";
import { User } from "../../../interfaces/user/User";
import { useLoader } from "../../../Global/Context/globalContext";
import { generalData } from "../../../common/generalData";

const EditUser = () => {
  const { id } = useParams<{ id: string }>();
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    getValues,
    watch,
    setValue,
  } = useForm<User>();
  const navigate = useNavigate();

  const { setLoading } = useLoader();

  const [photo, setPhoto] = useState<File | null>(null);
  const [user, setUser] = useState<User>();

  const handlePhotoChange = (e: any) => {
    const selectedPhoto = e.target.files[0];
    setPhoto(selectedPhoto);
  }




  const loadData = async (userId: number) => {
    setLoading(true);
    let resp = await UsersService.getUser(userId);
    if (resp.status === 200) {
      setUser(resp.user);
    }else{
      toast.error(resp.message);
    }
    setLoading(false);
  };

  const handleUpdateUser = async (data: User) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("first_name", data.first_name);
    formData.append("last_name", data.last_name);
    formData.append("birth_date", data.birth_date.toString());
    formData.append("age", data.age.toString());
    formData.append("gender", data.gender.toString());
    formData.append("address", data.address);
    formData.append("phone", data.phone);
    formData.append("civil_status", data.civil_status.toString());
    formData.append("email", data.email);
    formData.append("password", data.password?.toString() || "");
    formData.append("is_teacher", data.is_teacher ? "1" : "0");
    formData.append("is_tutor", data.is_tutor ? "1" : "0");
    formData.append("is_admin", data.is_admin ? "1" : "0");


    if (photo) {
      formData.append("photo", photo);
    }
    //print the form data
    const resp = await UsersService.update(formData, user?.id || 0);
    if (resp.status === 200) {
      toast.success(resp.message);
      navigate("/user/overview/" + resp.user.id);
    } else {
      toast.error(resp.message);
    }
    setLoading(false);
  };


  useEffect(() => {
    if (!id) return;
    let userId = parseInt(id);
    loadData(userId);
  }, [id]);

  useEffect(() => {
    if (user) {
      setValue("first_name", user.first_name);
      setValue("last_name", user.last_name);
      setValue("birth_date", user.birth_date);
      setValue("age", user.age);
      setValue("gender", user.gender);
      setValue("address", user.address);
      setValue("phone", user.phone);
      setValue("civil_status", user.civil_status);
      setValue("email", user.email);
      setValue("is_teacher", user.is_teacher);
      setValue("is_tutor", user.is_tutor);
      setValue("is_admin", user.is_admin);
    }
  }
  , [user]);
  // if (!user) return null;

  return (
    <div className="User-Register p-3">
      <h1>Editar Usuario</h1>
      <div className="form">
        <div className="container-fluid-mb-3 form-group">
          <div className="row">
            <h2>Datos Personales:</h2>
            <hr className="border border-secondary border-1 opacity-75" />
          </div>
          <div className="row mb-4">
            <div className="col-6">
              <TextField
                label="Nombre"
                field="first_name"
                type="text"
                register={register}
                rules={{ required: "Este campo es requerido" }}
                errors={errors}
              />
            </div>
            <div className="col-6">
              <TextField
                label="Apellido"
                field="last_name"
                type="text"
                register={register}
                rules={{ required: "Este campo es requerido" }}
                errors={errors}
              />
            </div>
          </div>
          <div className="row mb-4">
            <div className="col-4">
              <TextField
                label="Fecha de Nacimiento"
                field="birth_date"
                type="date"
                register={register}
                rules={{ required: "Este campo es requerido" }}
                errors={errors}
              />
            </div>
            <div className="col-4">
              <TextField
                label="Edad"
                field="age"
                type="number"
                register={register}
                rules={{ required: "Este campo es requerido" }}
                errors={errors}
              />
            </div>
            <div className="col-4">
              <SelectField
                label="Genero"
                field="gender"
                errors={errors}
                control={control}
                options={generalData.gender}
                rules={{ required: "Este campo es requerido" }}
              />
            </div>
          </div>
          <div className="row">
            <h2>Información de Contacto:</h2>
            <hr className="border border-secondary border-1 opacity-75" />
          </div>
          <div className="row">
            <div className="col-4">
              <TextField
                label="Dirección"
                field="address"
                type="text"
                register={register}
                rules={{ required: "Este campo es requerido" }}
                errors={errors}
              />
            </div>
            <div className="col-4">
              <TextField
                label="Telefono"
                field="phone"
                type="text"
                register={register}
                rules={{ required: "Este campo es requerido" }}
                errors={errors}
              />
            </div>
            <div className="col-4">
              <SelectField
                label="Estado Civil"
                field="civil_status"
                errors={errors}
                control={control}
                options={generalData.civil_status}
                rules={{ required: "Este campo es requerido" }}
              />
            </div>
          </div>
          <div className="row mb-4">
            <div className="col-4">
              <label htmlFor="">Photo</label>
              <input
                type="file"
                className="form-control"
                accept="image/*"
                onChange={handlePhotoChange}
              />
            </div>
            <div className="col-4">
              <p>Photo Preview</p>
              <img
                src={photo ? URL.createObjectURL(photo) : user?.photo || 'https://via.placeholder.com/150'}
                alt="student"
                className="user-photo"
              />
            </div>
          </div>
          <div className="row">
            <h2>Roles:</h2>
            <hr className="border border-secondary border-1 opacity-75" />
          </div>
          <div className="row">
            <div className="col-3">
              <CheckboxList
                items={[
                  { field: "is_teacher", label: "Profesor" },
                  { field: "is_tutor", label: "Tutor" },
                  { field: "is_admin", label: "Admin" },
                ]}
                register={register}
                getValues={getValues}
                errors={errors}
                rules={{ required: "Este campo es requerido" }}
              />
            </div>
          </div>
          <div className="row mb-2 mt-3">
            <hr className="border border-secondary border-1 opacity-75" />
          </div>
          <div className="row">
            <div className="col-8">
              <button
                className="btn btn-primary xl"
                onClick={handleSubmit((data) => handleUpdateUser(data))}
              >
                Actualizar
              </button>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );

}

export default EditUser;
