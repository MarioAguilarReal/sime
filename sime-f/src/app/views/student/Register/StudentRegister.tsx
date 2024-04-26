import { Student } from '../../../interfaces/student/Student';
import { useForm } from 'react-hook-form';
import TextField from '../../../components/shared/FormInputs/TextField';
import SelectField from '../../../components/shared/FormInputs/SelectFIeld';
import { useNavigate } from 'react-router-dom';
import './StudentRegister.scss';
import { PATTERNS } from '../../../components/shared/FormInputs/patterns';
import { StudentService } from '../../../services/students/StudentsService';
import { useLoader } from '../../../Global/Context/globalContext';
import { generalData } from '../../../common/generalEnums';
import { studentsData } from '../../../common/studentEnums';

const StudentRegister = () => {

  const {register, handleSubmit, formState: {errors}, control} = useForm<Student>();
  const navigate = useNavigate();
  const {setLoading} = useLoader();

  const handleCreate = async (student: Student) => {
    setLoading(true);
    const resp = await StudentService.register(student);
    console.log(resp);
    if (resp.status === 200) {
      navigate('/students/all')
    } else {
      console.log(resp.status);
    }
    setLoading(false);
    return 0;
  }

  return (
    <div className='student-register'>
      <div className='container-fluid-mb-3 form-group'>
        <h1>Student Register</h1>
        <h2>Student Personal Data</h2>
        <div className="row">
          <div className="col-4">
            <TextField
              label="First Name"
              field="first_name"
              register={register}
              type='text'
              rules={{ required: 'This field is required' }}
              errors={errors}
            />
          </div>
          <div className="col-4">
            <TextField
              label="Last Name"
              field="last_name"
              register={register}
              type='text'
              rules={{ required: 'This field is required' }}
              errors={errors}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-4">
            <label htmlFor="">Photo</label>
            <input type="file" className='form-control' />
          </div>
          <div className="col-4">
            <p>Photo Prewiew</p>
            ...
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
              options={generalData.gender}
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
          <div className="col-3">
            <SelectField
              label='Transport_type'
              field='trans_type'
              errors={errors}
              control={control}
              options={studentsData.transType}
            />
          </div>
          <div className="col-2">
            <SelectField
              label='Civil Status'
              field='civil_status'
              errors={errors}
              control={control}
              options={generalData.civilStatus}
            />
          </div>
        </div>
        <h2>Tutor Information</h2>
        <div className="row">
          <div className="col-4">
            <TextField
              label="Tutor Name"
              field="tutor_name"
              register={register}
              type='text'
              rules={{ required: 'This field is required' }}
              errors={errors}
            />
          </div>
          <div className="col-4">
            <TextField
              label="Tutor Phone"
              field="tutor_phone"
              register={register}
              type='text'
              rules={{ required: 'This field is required' }}
              errors={errors}
            />
          </div>
          <div className="col-4">
            <TextField
              label="Tutor Age"
              field="tutor_age"
              register={register}
              type='number'
              rules={{ required: 'This field is required' }}
              errors={errors}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-4">
            <TextField
              label="Tutor Address"
              field="tutor_address"
              register={register}
              type='text'
              rules={{ required: 'This field is required' }}
              errors={errors}
            />
          </div>
          <div className="col-4">
            <TextField
              label="Tutor Email"
              field="tutor_email"
              register={register}
              type='email'
              rules={{ required: 'This field is required', pattern: { value: PATTERNS.emailRegEx, message: 'Invalid email address'} }}
              errors={errors}
            />
          </div>
          <div className="row">
            <div className="col-8">
              <button className="btn btn-primary xl" onClick={handleSubmit((data) => handleCreate(data))}>Registrar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentRegister;
