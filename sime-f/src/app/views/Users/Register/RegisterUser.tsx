import './RegisterUser.scss'
import { User } from '../../../interfaces/user/User';
import { useForm } from 'react-hook-form';
import TextField from '../../../components/shared/FormInputs/TextField';
import SelectField from '../../../components/shared/FormInputs/SelectFIeld';
import { CheckboxList } from '../../../components/shared/FormInputs/CheckBox';
import { UsersService } from '../../../services/users/UsersService';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const RegisterUser = () => {

  const { register, handleSubmit, formState: { errors }, control, getValues, watch} = useForm<User>();
  const navigate = useNavigate();

  const handleNewUser = async (data: User) => {
    const resp = await UsersService.register(data);
    console.log(resp);
    if (resp.status === 200) {
      toast.success(resp.message);
      navigate('/student/overview/' + resp.user.id)
    } else {
      toast.error(resp.message);
    }
  }

  return (
    <div className="Teacher-Register">
      <div className="container-fluid-mb-3 form-group">
        <div className="row">
          <div className="col-4">
            <TextField
              label='First Name'
              field='first_name'
              type='text'
              register={register}
              rules={{ required: 'This field is required' }}
              errors={errors}
            />
          </div>
          <div className="col-4">
            <TextField
              label='Last Name'
              field='last_name'
              type='text'
              register={register}
              rules={{ required: 'This field is required' }}
              errors={errors}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-3">
            <TextField
              label='Birth Date'
              field='birth_date'
              type='date'
              register={register}
              rules={{ required: 'This field is required' }}
              errors={errors}
            />
          </div>
          <div className="col-2">
            <TextField
              label='Age'
              field='age'
              type='number'
              register={register}
              rules={{ required: 'This field is required' }}
              errors={errors}
            />
          </div>
          <div className="col-3">
            <SelectField
              label='Gender'
              field='gender'
              errors={errors}
              control={control}
              options={[
                { value: 1, label: 'Masculino' },
                { value: 2, label: 'Femenino' },
                { value: 3, label: 'Otro' }
              ]}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-4">
            <TextField
              label='Address'
              field='address'
              type='text'
              register={register}
              rules={{ required: 'This field is required' }}
              errors={errors}
            />
          </div>
          <div className="col-2">
            <TextField
              label='Phone'
              field='phone'
              type='text'
              register={register}
              rules={{ required: 'This field is required' }}
              errors={errors}
            />
          </div>
          <div className="col-2">
            <SelectField
              label='Civil Status'
              field='civil_status'
              errors={errors}
              control={control}
              options={[
                { value: 1, label: 'Casado' },
                { value: 2, label: 'Soltero' },
                { value: 3, label: 'Divorciado' },
                { value: 4, label: 'Viudo' }
              ]}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-4">
            <TextField
              label='Email'
              field='email'
              type='email'
              register={register}
              rules={{ required: 'This field is required' }}
              errors={errors}
            />
          </div>
          <div className="col-2">
            <TextField
              label='Password'
              field='password'
              type='password'
              register={register}
              rules={{ required: 'This field is required' }}
              errors={errors}
            />
          </div>
          <div className="col-2">
            <TextField
              label='Confirm Password'
              field='confirm_password'
              type='password'
              register={register}
              rules={{required: 'This field is required', validate: (val:any) => { return val === watch('password') || 'Passwords do not match'}}}
              errors={errors}
            />
            <p className="text-danger">{errors.confirm_password?.message}</p>
          </div>
        </div>
        <div className="row">
          <div className="col-4">
            <label htmlFor="">Photo</label>
            <input type="file" className="form-control" />
          </div>
          <div className="col-4">
            <p>Photo Preview</p>
            ...
          </div>
        </div>
        <div className="row">
          <div className="col-3">
            <label htmlFor="">Roles</label>
            <CheckboxList
              items={[
                { field: 'is_teacher', label: 'Teacher' },
                { field: 'is_tutor', label: 'Tutor' },
                { field: 'is_admin', label: 'Admin' }
              ]}
              register={register}
              getValues={getValues}
              errors={errors}
              rules={{ required: 'This field is required' }}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-8">
            <button className="btn btn-primary xl" onClick={handleSubmit((data) => handleNewUser(data))} >Registrar</button>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default RegisterUser;
