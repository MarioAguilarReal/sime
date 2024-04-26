import { useForm } from 'react-hook-form';
import './EditStudent.scss';
import { Student } from '../../../interfaces/student/Student';
import { useNavigate, useParams } from 'react-router-dom';
import { useLoader } from '../../../Global/Context/globalContext';
import { StudentService } from '../../../services/students/StudentsService';
import TextField from '../../../components/shared/FormInputs/TextField';
import SelectField from '../../../components/shared/FormInputs/SelectFIeld';
import { generalData } from '../../../common/generalEnums';
import { studentsData } from '../../../common/studentEnums';
import { PATTERNS } from '../../../components/shared/FormInputs/patterns';
import { useEffect, useState } from 'react';

const EditStudent = () => {

  const [student, setStudent] = useState<Student>({} as Student)

  const { id } = useParams();

  const { register, handleSubmit, formState: { errors }, control, setValue } = useForm<Student>();
  const navigate = useNavigate();
  const { setLoading } = useLoader();

  const loadStudent = async (studentId: number) => {
    setLoading(true);
    const resp = await StudentService.getStudent(studentId);

    if (resp.status === 200) {
      setValue('first_name', resp.student.first_name);
      setValue('last_name', resp.student.last_name);
      setValue('birth_date', resp.student.birth_date);
      setValue('age', resp.student.age);
      setValue('gender', resp.student.gender);
      setValue('address', resp.student.address);
      setValue('trans_type', resp.student.trans_type);
      setValue('civil_status', resp.student.civil_status);
      setValue('tutor_name', resp.student.tutor_name);
      setValue('tutor_phone', resp.student.tutor_phone);
      setValue('tutor_age', resp.student.tutor_age);
      setValue('tutor_address', resp.student.tutor_address);
      setValue('tutor_email', resp.student.tutor_email);
      setStudent(resp.student);
    } else {
      console.log(resp.status);
    }
    setLoading(false);
  }

  const handleEdit = async (student: Student) => {
    console.log(student.id);

    setLoading(true);
    let resp = await StudentService.update(student);
    if (resp.status === 200) {
      navigate('/students/');
    } else {
      console.log(resp.status);
    }
    setLoading(false);
  }


  useEffect(() => {
    if (id) {
      let studentId = parseInt(id);
      loadStudent(studentId);
    }
  }, [id]);

  return (
    <div className="edit-student">
      <div className='container-fluid-mb-3 form-group'>
        <h1>Editar Estudiante</h1>
        <h2>Student Personal Data</h2>
        <div className="row">
          <div className="col-4">
            <TextField
              label="First Name"
              field="first_name"
              register={register}
              type='text'
              errors={errors}
            />
          </div>
          <div className="col-4">
            <TextField
              label="Last Name"
              field="last_name"
              register={register}
              type='text'
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
              errors={errors}
            />
          </div>
          <div className="col-2">
            <TextField
              label='Age'
              field='age'
              type='number'
              register={register}
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
              errors={errors}
            />
          </div>
          <div className="col-4">
            <TextField
              label="Tutor Phone"
              field="tutor_phone"
              register={register}
              type='text'
              errors={errors}
            />
          </div>
          <div className="col-4">
            <TextField
              label="Tutor Age"
              field="tutor_age"
              register={register}
              type='number'
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
              errors={errors}
            />
          </div>
          <div className="col-4">
            <TextField
              label="Tutor Email"
              field="tutor_email"
              register={register}
              type='email'
              value={student.tutor_email}
              rules={{ value: PATTERNS.emailRegEx, message: 'Invalid email address' }}
              errors={errors}
            />
          </div>
          <div className="row">
            <div className="col-8">
              <button className="btn btn-primary xl" onClick={handleSubmit((data) => handleEdit(data))}>Editar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditStudent;