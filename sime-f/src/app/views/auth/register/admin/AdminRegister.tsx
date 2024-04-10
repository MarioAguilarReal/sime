import { useForm } from "react-hook-form";
import TextField from "../../../../components/shared/FormInputs/TextField";

interface UserAdmin{
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

const AdminRegister = () => {

  const {
    register,
    formState: { errors },
    getValues
  } = useForm<UserAdmin>();


  const handleRegister = () => {
    const data = getValues();
    console.log(data);
  }

  return (
    <div className="registerAdmin">
      <div className="form">
        <div className="md-3">
          <TextField
            field="name"
            label="Name"
            type="text"
            register={register}
            errors={errors}
            />
        </div>
        <div className="md-3">
          <TextField
            field="email"
            label="Email"
            type="email"
            register={register}
            errors={errors}
            />
        </div>
        <div className="md-3">
          <TextField
            field="password"
            label="Password"
            type="password"
            register={register}
            errors={errors}
            />
          </div>
        <div className="md-3">
          <TextField
            field="password_confirmation"
            label="Confirm Password"
            type="password"
            register={register}
            errors={errors}
            />
        </div>

        <div className="md-3">
          <button className="btn btn-primary" onClick={handleRegister}>Register</button>
        </div>
      </div>
    </div>
  );

}

export default AdminRegister;
