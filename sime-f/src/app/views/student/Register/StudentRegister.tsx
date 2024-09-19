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
    formData.append('maternal_surname', data.maternal_surname);
    formData.append('paternal_surname', data.paternal_surname);
    formData.append('birth_date', data.birth_date.toString());
    formData.append('age', data.age.toString());
    formData.append('gender', data.gender.toString());
    formData.append('address', data.address);
    formData.append('trans_type', data.trans_type.toString());
    formData.append('civil_status', data.civil_status.toString());
    formData.append('birth_place', data.birth_place);
    formData.append('nationality', data.nationality);
    formData.append('curp', data.curp);
    formData.append('transport_time', data.transport_time);

    formData.append('tutor_name', data.tutor_name);
    formData.append('tutor_phone', data.tutor_phone);
    formData.append('tutor_age', data.tutor_age.toString());
    formData.append('tutor_address', data.tutor_address);
    formData.append('tutor_email', data.tutor_email);
    formData.append('tutor_birth_date', data.tutor_birth_date.toString());
    formData.append('tutor_occupation', data.tutor_occupation);
    formData.append('tutor_schooling', data.tutor_schooling);
    formData.append('tutor_live_student', data.tutor_live_student.toString());
    formData.append('tutor_curp', data.tutor_curp);

    formData.append('emergency_contact_name_1', data.emergency_contact_name_1);
    formData.append('emergency_contact_phone_1', data.emergency_contact_phone_1);
    formData.append('emergency_contact_relationship_1', data.emergency_contact_relationship_1);
    formData.append('emergency_contact_name_2', data.emergency_contact_name_2);
    formData.append('emergency_contact_phone_2', data.emergency_contact_phone_2);
    formData.append('emergency_contact_relationship_2', data.emergency_contact_relationship_2);

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
    <div className='student-register p-3'>
      <h1>Registro de Estudiantes</h1>
      <div className='form'>
        <div className="container-fluid-mb-3 form-group">
          {/*  -----------------------      Student Information   ------------------------ */}
          <div className="row">
            <h2>Datos Personales del Estudiante</h2>
            <hr />
          </div>
          <div className="row mb-4">
            <div className="col-4">
              <TextField
                label="Nombre"
                field="first_name"
                register={register}
                type='text'
                rules={{ required: 'This field is required' }}
                errors={errors}
              />
            </div>
            <div className="col-4">
              <TextField
                label="Apellido Paterno"
                field="paternal_surname"
                register={register}
                type='text'
                rules={{ required: 'This field is required' }}
                errors={errors}
              />
            </div>
            <div className="col-4">
              <TextField
                label="Apellido Materno"
                field="maternal_surname"
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


          {/* ----------------------------   New   ------------------------- */}
          <div className="row mb-4">
            <div className="col-6">
              <TextField
                label='Nacionalidad'
                field='nationality'
                type='text'
                register={register}
                rules={{ required: 'This field is required' }}
                errors={errors}
              />
            </div>
            <div className="col-6">
              <TextField
                label='CURP'
                field='curp'
                type='text'
                register={register}
                rules={{ required: 'This field is required' }}
                errors={errors}
              />
            </div>
          </div>
          <div className="row mb-4">
            <div className="col-6">
              <TextField
                label='Lugar de nacimiento'
                field='birth_place'
                type='text'
                register={register}
                rules={{ required: 'This field is required' }}
                errors={errors}
              />
            </div>
            <div className="col-6">
              <TextField
                label='Dirección'
                field='address'
                type='text'
                register={register}
                rules={{ required: 'This field is required' }}
                errors={errors}
              />
            </div>
          </div>


          <div className="row mb-4">
            <div className="col-4">
              <TextField
                label='Tiempo estimado de la escuela a la casa'
                field='transport_time'
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

          <div className="row mb-4">
            <div className="col-6">
              <label htmlFor="">Foto</label>
              <input
                type="file"
                className='form-control'
                accept='image/*'
                onChange={handlePhotoChange}
              />
            </div>
            <div className="col-6">
              <p>Vista Previa de la Foto</p>
              <img src={photo ? URL.createObjectURL(photo) : 'https://via.placeholder.com/150'}
                alt="student"
                className='student-photo' />
            </div>
          </div>

          {/* ----------------------------   Tutor Information   -------------------------- */}
          <div className="row">
            <h2>Información del Tutor</h2>
            <hr />
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
                label="CURP"
                field="tutor_curp"
                register={register}
                type='text'
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
          </div>


          {/* ----------------------------  New Tutor Information   -------------------------- */}
          <div className="row mb-4">
            <div className="col-4">
              <TextField
                label='Fecha de Nacimiento'
                field='tutor_birth_date'
                type='date'
                register={register}
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
            <div className="col-4">
              <SelectField
                label='¿Vive con el alumno?'
                field='tutor_live_student'
                errors={errors}
                control={control}
                options={studentsData.booleanType}
              />
            </div>
          </div>
          <div className="row mb-4">
            <div className="col-6">
              <TextField
                label="Ocupación"
                field="tutor_occupation"
                register={register}
                type='text'
                rules={{ required: 'This field is required' }}
                errors={errors}
              />
            </div>
            <div className="col-6">
              <TextField
                label="Grado cursado"
                field="tutor_schooling"
                register={register}
                type='text'
                rules={{ required: 'This field is required' }}
                errors={errors}
              />
            </div>
          </div>


          {/* ----------------------------   Emergency Information   -------------------------- */}
          <div className="row">
            <h2>Información de Contactos de Emergencia</h2>
            <hr />
          </div>
          <div className="row mb-4">
            <div className="col-4">
              <TextField
                label="Nombre"
                field="emergency_contact_name_1"
                register={register}
                type='text'
                rules={{ required: 'This field is required' }}
                errors={errors}
              />
            </div>
            <div className="col-4">
              <TextField
                label="Telefono"
                field="emergency_contact_phone_1"
                register={register}
                type='text'
                rules={{ required: 'This field is required' }}
                errors={errors}
              />
            </div>
            <div className="col-4">
              <TextField
                label="Parentesco"
                field="emergency_contact_relationship_1"
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
                label="Nombre"
                field="emergency_contact_name_2"
                register={register}
                type='text'
                rules={{ required: 'This field is required' }}
                errors={errors}
              />
            </div>
            <div className="col-4">
              <TextField
                label="Telefono"
                field="emergency_contact_phone_2"
                register={register}
                type='text'
                rules={{ required: 'This field is required' }}
                errors={errors}
              />
            </div>
            <div className="col-4">
              <TextField
                label="Parentesco"
                field="emergency_contact_relationship_2"
                register={register}
                type='text'
                rules={{ required: 'This field is required' }}
                errors={errors}
              />
            </div>
          </div>

          <div className="row mb-2 mt-3">
            <hr />
          </div>
          <div className="row mb-4">
            <div className="button-container col-12">
              <button className="btn" onClick={handleSubmit((data) => handleCreate(data))}>Registrar</button>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default StudentRegister;
