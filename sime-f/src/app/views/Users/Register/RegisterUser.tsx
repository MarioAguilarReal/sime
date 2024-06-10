import "./RegisterUser.scss";
import { User } from "../../../interfaces/user/User";
import { useForm } from "react-hook-form";
import TextField from "../../../components/shared/FormInputs/TextField";
import SelectField from "../../../components/shared/FormInputs/SelectFIeld";
import { CheckboxList } from "../../../components/shared/FormInputs/CheckBox";
import { UsersService } from "../../../services/users/UsersService";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { PATTERNS } from "../../../components/shared/FormInputs/patterns";
import { generalData } from "../../../common/generalData";
import { useLoader } from "../../../Global/Context/globalContext";
import { useState } from "react";

const RegisterUser = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    getValues,
    watch,
  } = useForm<User>();
  const navigate = useNavigate();

  const { setLoading } = useLoader();

  const [photo, setPhoto] = useState<File | null>(null);

  const handlePhotoChange = (e: any) => {
    const selectedPhoto = e.target.files[0];
    setPhoto(selectedPhoto);
  }

  const handleNewUser = async (data: User) => {
    setLoading(true);
    const formData = new FormData();
    console.log(data);
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
    formData.append("role", data.role.toString());


    if (photo) {
      formData.append("photo", photo);
    }
    //print the form data
    const resp = await UsersService.register(formData);
    console.log(resp);
    if (resp.status === 200) {
      toast.success(resp.message);
      navigate("/user/overview/" + resp.user.id);
    } else {
      toast.error(resp.message);
    }
    setLoading(false);
  };

  return (
    <div className="User-Register p-3">
      <h1>Registrar Usuario</h1>
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
          <div className="row mb-4">
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
          <div className="row">
            <h2>Información de Cuenta:</h2>
            <hr className="border border-secondary border-1 opacity-75" />
          </div>
          <div className="row mb-2">
            <div className="col-4">
              <TextField
                label="Correo Electronico"
                field="email"
                type="email"
                register={register}
                rules={{
                  required: "Este campo es requerido",
                  pattern: {
                    value: PATTERNS.emailRegEx,
                    message: "Invalid email address",
                  },
                }}
                errors={errors}
              />
            </div>
            <div className="col-4">
              <TextField
                label="Contraseña"
                field="password"
                type="password"
                register={register}
                rules={{ required: "Este campo es requerido" }}
                errors={errors}
              />
            </div>
            <div className="col-4">
              <TextField
                label="Confirmar Contraseña"
                field="confirm_password"
                type="password"
                register={register}
                rules={{
                  required: "Este campo es requerido",
                  validate: (val: any) => {
                    return (
                      val === watch("password") || "Las contraseñas no coinciden"
                    );
                  },
                }}
                errors={errors}
              />
              <p className="text-danger">{errors.confirm_password?.message}</p>
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
                src={photo ? URL.createObjectURL(photo) : 'https://via.placeholder.com/150'}
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
              <SelectField
                label="Rol"
                field="role"
                errors={errors}
                control={control}
                options={generalData.roles}
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
                onClick={handleSubmit((data) => handleNewUser(data))}
              >
                Registrar
              </button>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default RegisterUser;
