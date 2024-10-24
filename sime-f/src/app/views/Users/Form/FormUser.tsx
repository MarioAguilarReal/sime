import "./FormUser.scss";
import { User } from "../../../interfaces/user/User";
import { useForm } from "react-hook-form";
import TextField from "../../../components/shared/FormInputs/TextField";
import SelectField from "../../../components/shared/FormInputs/SelectFIeld";
import { UsersService } from "../../../services/users/UsersService";
import { ToastContainer, toast } from "react-toastify";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { PATTERNS } from "../../../components/shared/FormInputs/patterns";
import { generalData } from "../../../common/generalData";
import { useLoader } from "../../../Global/Context/globalContext";
import { useEffect, useState } from "react";

const FormUser = () => {

  const { id } = useParams<{ id: string }>();

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    getValues,
    setValue,
    watch,
  } = useForm<User>();

  const navigate = useNavigate();
  const location = useLocation();

  const { setLoading } = useLoader();

  const [photo, setPhoto] = useState<File | null>(null);
  const [user, setUser] = useState<User>();

  const loadData = async (userId: number) => {
    setLoading(true);
    let resp = await UsersService.getUser(userId);
    if (resp.status === 200) {
      setUser(resp.user);
    } else {
      toast.error(resp.message);
    }
    setLoading(false);
  };

  const handlePhotoChange = (e: any) => {
    const selectedPhoto = e.target.files[0];
    setPhoto(selectedPhoto);
  };

  const handleCancelEdit = () => {
    location.pathname.includes("auth") ? navigate("/auth/profile") : navigate("/user/overview/" + user?.id);
  };

  const handleOnSubmit = async (data: User) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("first_name", data.first_name);
    formData.append("maternal_surname", data.maternal_surname);
    formData.append("paternal_surname", data.paternal_surname);
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
    let resp ={} as any;
    if(id){
      formData.append("id", id);
      resp = await UsersService.update(formData, parseInt(id));
    }else{
      resp = await UsersService.register(formData);
    }
    console.log(resp);
    if (resp.status === 200) {
      toast.success(resp.message);
      navigate("/user/overview/" + resp.user.id);
    } else {
      toast.error(resp.message);
    }
    setLoading(false);
  };


  useEffect(() => {
    let birthDate = watch("birth_date");
    let age = new Date().getFullYear() - new Date(birthDate).getFullYear();
    setValue("age", age);

  }, [watch("birth_date")]);

  useEffect(() => {
    if (id) {
      loadData(parseInt(id));
    }
  }, [id]);

  useEffect(() => {
    if (user) {
      setValue("first_name", user.first_name);
      setValue("maternal_surname", user.maternal_surname);
      setValue("paternal_surname", user.paternal_surname);
      setValue("birth_date", user.birth_date);
      setValue("age", user.age);
      setValue("gender", user.gender);
      setValue("address", user.address);
      setValue("phone", user.phone);
      setValue("civil_status", user.civil_status);
      setValue("email", user.email);
      setValue("role", user.role);
    }
  }, [user]);

  return (
    <div className="User-Register p-3">
      <h1>{id ? 'Editar' : 'Crear'} Usuario</h1>
      <div className="form">
        <div className="container-fluid-mb-3 form-group">
          <div className="row">
            <h2>Datos Personales:</h2>
            <hr />
          </div>
          <div className="row mb-4">
            <div className="col-4">
              <TextField
                label="Nombre"
                field="first_name"
                type="text"
                register={register}
                rules={{ required: "Este campo es requerido"}}
                errors={errors}
              />
            </div>
            <div className="col-4">
              <TextField
                label="Apellido Paterno"
                field="paternal_surname"
                type="text"
                register={register}
                rules={{ required: "Este campo es requerido" }}
                errors={errors}
              />
            </div>
            <div className="col-4">
              <TextField
                label="Apellido Materno"
                field="maternal_surname"
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
                rules={{ required: "Este campo es requerido"}}
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
                disabled={true}
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
            <hr />
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
                maxLength="10"
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
            <hr />
          </div>
          {!id && (
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
                      val === watch("password") ||
                      "Las contraseñas no coinciden"
                    );
                  },
                }}
                errors={errors}
              />
              <p className="text-danger">{errors.confirm_password?.message}</p>
            </div>
          </div>
          )}
          <div className="row mb-4">
            <div className="col-4">
              <SelectField
                label="Rol"
                field="role"
                errors={errors}
                control={control}
                options={generalData.roles}
                rules={{ required: "Este campo es requerido" }}
              />
            </div>
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
                src={
                  photo
                    ? URL.createObjectURL(photo)
                    : "https://via.placeholder.com/150"
                }
                alt="student"
                className="user-photo"
              />
            </div>
          </div>
          <div className="row">
            <hr />
          </div>
          <div className="row mb-4">
            {!id ? (
              <div className="button-container col-12">
                <button
                  className="btn btn-primary xl"
                  onClick={handleSubmit((data) => handleOnSubmit(data))}
                >
                  Registrar
                </button>
              </div>
            ):(
              <div className="row">
                <div className="col-2">
                  <button
                    className="btn btn-primary xl"
                    onClick={handleSubmit((data) => handleOnSubmit(data))}
                  >
                    Actualizar
                  </button>
                </div>
                <div className="col-2">
                  <button
                    className="btn btn-danger xl"
                    onClick={handleCancelEdit}
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default FormUser;
