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
import { ToastContainer, toast } from 'react-toastify';
import { useState } from 'react';

const StudentRegister = () => {

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    getValues,
    watch
  } = useForm<Student>();
  const navigate = useNavigate();
  const { setLoading } = useLoader();

  const [photo, setPhoto] = useState<File | null>(null);

  const handlePhotoChange = (e: any) => {
    const selectedPhoto = e.target.files[0];
    setPhoto(selectedPhoto);
  }

  const handleCreate = async (data: Student) => {
    setLoading(true);
    const formData = new FormData();
    console.log(data);
    formData.append('first_name', data.first_name);
    formData.append('last_name', data.last_name);
    formData.append('birth_date', data.birth_date.toString());
    formData.append('age', data.age.toString());
    formData.append('gender', data.gender.toString());
    formData.append('address', data.address);
    formData.append('trans_type', data.trans_type.toString());
    formData.append('civil_status', data.civil_status.toString());
    formData.append('tutor_name', data.tutor_name);
    formData.append('tutor_phone', data.tutor_phone);
    formData.append('tutor_age', data.tutor_age.toString());
    formData.append('tutor_address', data.tutor_address);
    formData.append('tutor_email', data.tutor_email);

    if (photo) {
      formData.append('photo', photo);
    }
    const resp = await StudentService.register(formData);
    console.log(resp);
    if (resp.status === 200) {
      toast.success(resp.message);
      if (resp.student) {
        navigate("/stuent/overview/" + resp.student.id);
      } else {
        navigate("/list/students");
      }
    } else {
      toast.error(resp.message);
    }
    setLoading(false);
  };


  return (
    <div className='student-register'>
      <h1>Registro de Estudiantes</h1>
      <div className='form'>
        <div className="container-fluid-mb-3 form-group">
          <div className="row">
            <h2>Datos Personales del Estudiante</h2>
            <hr className="border border-secondary border-1 opacity-75" />
          </div>
          <div className="row mb-4">
            <div className="col-6">
              <TextField
                label="Nombre"
                field="first_name"
                register={register}
                type='text'
                rules={{ required: 'This field is required' }}
                errors={errors}
              />
            </div>
            <div className="col-6">
              <TextField
                label="Apellido"
                field="last_name"
                register={register}
                type='text'
                rules={{ required: 'This field is required' }}
                errors={errors}
              />
            </div>
          </div>
          <div className="row mb-4">
            <div className="col-4">
              <TextField
                label='Fecha de Nacimiento'
                field='birth_date'
                type='date'
                register={register}
                rules={{ required: 'This field is required' }}
                errors={errors}
              />
            </div>
            <div className="col-4">
              <TextField
                label='Edad'
                field='age'
                type='number'
                register={register}
                rules={{ required: 'This field is required' }}
                errors={errors}
              />
            </div>
            <div className="col-4">
              <SelectField
                label='Genero'
                field='gender'
                errors={errors}
                control={control}
                options={generalData.gender}
              />
            </div>
          </div>
          <div className="row mb-4">
            <div className="col-4">
              <TextField
                label='Dirección'
                field='address'
                type='text'
                register={register}
                rules={{ required: 'This field is required' }}
                errors={errors}
              />
            </div>
            <div className="col-4">
              <SelectField
                label='Tipo de Transporte'
                field='trans_type'
                errors={errors}
                control={control}
                options={studentsData.transType}
              />
            </div>
            <div className="col-4">
              <SelectField
                label='Estado Civil'
                field='civil_status'
                errors={errors}
                control={control}
                options={generalData.civilStatus}
              />
            </div>
          </div>
          <div className="row">
            <h2>Información del Tutor</h2>
            <hr className="border border-secondary border-1 opacity-75" />
          </div>
          <div className="row mb-4">
            <div className="col-4">
              <TextField
                label="Nombre Completo"
                field="tutor_name"
                register={register}
                type='text'
                rules={{ required: 'This field is required' }}
                errors={errors}
              />
            </div>
            <div className="col-4">
              <TextField
                label="Telefono"
                field="tutor_phone"
                register={register}
                type='text'
                rules={{ required: 'This field is required' }}
                errors={errors}
              />
            </div>
            <div className="col-4">
              <TextField
                label="Edad"
                field="tutor_age"
                register={register}
                type='number'
                rules={{ required: 'This field is required' }}
                errors={errors}
              />
            </div>
          </div>
          <div className="row mb-4">
            <div className="col-6">
              <TextField
                label="Dirección"
                field="tutor_address"
                register={register}
                type='text'
                rules={{ required: 'This field is required' }}
                errors={errors}
              />
            </div>
            <div className="col-6">
              <TextField
                label="Correo Electronico"
                field="tutor_email"
                register={register}
                type='email'
                rules={{ required: 'This field is required', pattern: { value: PATTERNS.emailRegEx, message: 'Invalid email address' } }}
                errors={errors}
              />
            </div>
            <div className="row mb-4">
              <div className="col-4">
                <label htmlFor="">Foto</label>
                <input
                  type="file"
                  className='form-control'
                  accept='image/*'
                  onChange={handlePhotoChange}
                />
              </div>
              <div className="col-4">
                <p>Vista Previa de la Foto</p>
                <img src={photo ? URL.createObjectURL(photo) : 'https://via.placeholder.com/150'}
                  alt="student"
                  className='student-photo' />
              </div>
            </div>
            <div className="row mb-2 mt-3">
              <hr className="border border-secondary border-1 opacity-75" />
            </div>
            <div className="row">
              <div className="col-8">
                <button className="btn btn-primary xl" onClick={handleSubmit((data) => handleCreate(data))}>Registrar</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default StudentRegister;
