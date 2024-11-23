import "./StudentForm.scss";
import { useEffect, useState } from 'react';
import { Student } from '../../../../interfaces/student/Student';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import { StudentService } from '../../../../services/students/StudentsService';
import { useLoader } from '../../../../Global/Context/globalContext';
import { toast, ToastContainer } from 'react-toastify';
import TextField from "../../../../components/shared/FormInputs/TextField";
import SelectField from "../../../../components/shared/FormInputs/SelectFIeld";
import { studentsData } from '../../../../common/studentEnums';
import { PATTERNS } from "../../../../components/shared/FormInputs/patterns";
import { generalData } from '../../../../common/generalEnums';

interface FormStudenProps {
  mode: 'register' | 'edit';
  studentId?: any;
}
const StudentForm = (props: FormStudenProps) => {
  const { mode, studentId } = props;
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    getValues,
    setValue,
    watch,
    reset,
  } = useForm<Student>();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { setLoading } = useLoader();
  const [student, setStudent] = useState<Student>();
  const [photo, setPhoto] = useState<File | null>();

  const handlePhotoChange = (e: any) => {
    const selectedPhoto = e.target.files[0];
    setPhoto(selectedPhoto);
  }

  const handleOnSubmit = async (data: Student) => {
    if (mode === 'register') {
      await handleCreate(data);
    } else {
      await handleUpdate(data);
    }
  };

  const handleCreate = async (data: Student) => {
    setLoading(true);
    const formData = createFormData(data);
    const resp = await StudentService.register(formData);
    handleResponse(resp);
    setLoading(false);
  };

  const handleUpdate = async (data: Student) => {
    const formData = createFormData(data);
    const resp = await StudentService.update(formData, studentId);
    handleResponse(resp);
  };

  const isValidDate = (date: string) => {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    return dateRegex.test(date);
  };

  const createFormData = (data: Student) => {
    const formData = new FormData();
    const appendField = (key: string, value: any) => {
      if (value !== null && value !== undefined && value !== '') {
        formData.append(key, value.toString());
      } else {
        formData.append(key, '');
      }
    };

    const tutorBirthDate = data.tutor_birth_date && isValidDate(data.tutor_birth_date.toString()) ? data.tutor_birth_date : '';

    appendField('first_name', data.first_name);
    appendField('maternal_surname', data.maternal_surname);
    appendField('paternal_surname', data.paternal_surname);
    appendField('birth_date', data.birth_date);
    appendField('age', data.age);
    appendField('gender', data.gender);
    appendField('address', data.address);
    appendField('trans_type', data.trans_type);
    appendField('civil_status', data.civil_status);
    appendField('birth_place', data.birth_place);
    appendField('nationality', data.nationality);
    appendField('curp', data.curp);
    appendField('transport_time', data.transport_time);

    appendField('tutor_name', data.tutor_name);
    appendField('tutor_phone', data.tutor_phone);
    appendField('tutor_age', data.tutor_age === 0 ? null : data.tutor_age);
    appendField('tutor_address', data.tutor_address);
    appendField('tutor_email', data.tutor_email);
    appendField('tutor_birth_date', tutorBirthDate);
    appendField('tutor_occupation', data.tutor_occupation);
    appendField('tutor_schooling', data.tutor_schooling);
    appendField('tutor_live_student', data.tutor_live_student);
    appendField('tutor_curp', data.tutor_curp);

    appendField('emergency_contact_name_1', data.emergency_contact_name_1);
    appendField('emergency_contact_phone_1', data.emergency_contact_phone_1);
    appendField('emergency_contact_relationship_1', data.emergency_contact_relationship_1);
    appendField('emergency_contact_name_2', data.emergency_contact_name_2);
    appendField('emergency_contact_phone_2', data.emergency_contact_phone_2);
    appendField('emergency_contact_relationship_2', data.emergency_contact_relationship_2);

    if (photo) {
      formData.append('photo', photo);
    }

    return formData;
  };

  const handleResponse = (resp: any) => {
    if (resp.status === 200) {
      toast.success(resp.message);
      navigate("/student/overview/" + resp.data.id);
    } else {
      toast.error(resp.message);
    }
  };

  useEffect(() => {
    if (mode === 'edit' && studentId) {
      loadStudent(studentId);
    }
  }, [mode, studentId]);

  const loadStudent = async (studentId: number) => {
    setLoading(true);
    const resp = await StudentService.getStudent(studentId);
    if (resp.status === 200) {
      setStudent(resp.data);
      fillForm(resp.data);
    } else {
      toast.error(resp.message);
    }
    setLoading(false);
  };

  const fillForm = (student: Student) => {
    setValue('first_name', student.first_name);
    setValue('maternal_surname', student.maternal_surname);
    setValue('paternal_surname', student.paternal_surname);
    setValue('birth_date', student.birth_date);
    setValue('age', student.age);
    setValue('gender', student.gender);
    setValue('address', student.address);
    setValue('trans_type', student.trans_type);
    setValue('civil_status', student.civil_status);
    setValue('birth_place', student.birth_place);
    setValue('nationality', student.nationality);
    setValue('curp', student.curp);
    setValue('transport_time', student.transport_time);

    setValue('tutor_name', student.tutor_name);
    setValue('tutor_phone', student.tutor_phone);
    setValue('tutor_age', student.tutor_age);
    setValue('tutor_address', student.tutor_address);
    setValue('tutor_email', student.tutor_email);
    setValue('tutor_birth_date', student.tutor_birth_date);
    setValue('tutor_occupation', student.tutor_occupation);
    setValue('tutor_schooling', student.tutor_schooling);
    setValue('tutor_live_student', student.tutor_live_student);
    setValue('tutor_curp', student.tutor_curp);

    setValue('emergency_contact_name_1', student.emergency_contact_name_1);
    setValue('emergency_contact_phone_1', student.emergency_contact_phone_1);
    setValue('emergency_contact_relationship_1', student.emergency_contact_relationship_1);
    setValue('emergency_contact_name_2', student.emergency_contact_name_2);
    setValue('emergency_contact_phone_2', student.emergency_contact_phone_2);
    setValue('emergency_contact_relationship_2', student.emergency_contact_relationship_2);
  };

  useEffect(() => {
    if (pathname === '/manage/student') {
      reset({
        'first_name': '',
        'maternal_surname': '',
        'paternal_surname': '',
        'birth_date': new Date(),
        'curp': '',
        'birth_place': '',
        'address': '',
        'transport_time': '',
        'photo': '',
        'tutor_name': '',
        'tutor_phone': '',
        'tutor_curp': '',
        'tutor_address': '',
        'tutor_email': '',
        'tutor_birth_date': new Date(),
        'tutor_occupation': '',
        'tutor_schooling': '',
        'emergency_contact_name_1': '',
        'emergency_contact_phone_1': '',
        'emergency_contact_name_2': '',
        'emergency_contact_phone_2': '',
      });
    }
  }, [pathname, reset]);

  useEffect(() => {
    if (mode === 'register') {
      let birthDate = getValues('birth_date');
      let age = new Date().getFullYear() - new Date(birthDate).getFullYear();
      setValue('age', age);

      let tutorBirthDate = getValues('tutor_birth_date');
      let tutorAge = new Date().getFullYear() - new Date(tutorBirthDate).getFullYear();
      setValue('tutor_age', tutorAge);
    }

  }, [watch('birth_date'), watch('tutor_birth_date'), mode]);

  useEffect(() => {
    let addressData = getValues('address');
    let live_student = getValues('tutor_live_student');
    setValue('tutor_address', live_student === 1 ? addressData : '');
  }, [watch('address'), watch('tutor_live_student')]);

  return (
    <div className='student-register p-3'>
      <h1>{mode === 'register' ? 'Registro de Estudiantes' : 'Editar Estudiante'}</h1>
      <div className='form'>
        {mode === 'edit' ? <div>
          <div className="row mb-2">
            <div className="col-4 btn-edit">
              <button className='btn btn-secondary' onClick={() => navigate("/student/overview/" + student?.id)}><i className="bi bi-chevron-left" />Volver</button>
            </div>
          </div>
          <div className="row mb-2 mt-3">
            <hr />
          </div>
        </div> : null}
        <div className="container-fluid-mb-3 form-group">
          {/*  -----------------------      Student Information   ------------------------ */}
          <div className="row">
            <h2>Datos Personales del Estudiante</h2>
            <hr />
          </div>
          <div className="row mb-4">
            <div className="col-4">
              <TextField
                label="Nombre(s)"
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
                disabled
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
              {/* <TextField
                label='Nacionalidad'
                field='nationality'
                type='text'
                register={register}
                rules={{ required: 'This field is required' }}
                errors={errors}
              /> */}
              <SelectField
                label='Nacionalidad'
                field='nationality'
                errors={errors}
                control={control}
                options={
                  [
                    { value: 'Mexicana', label: 'Mexicana' },
                    { value: 'Estadounidense', label: 'Estadounidense' },
                    { value: 'Otra', label: 'Otra' },
                  ]
                }
              />
            </div>
            <div className="col-6">
              <TextField
                label='CURP'
                field='curp'
                type='text'
                maxLength='18'
                register={register}
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
                errors={errors}
              />
            </div>
            <div className="col-6">
              <TextField
                label='Dirección'
                field='address'
                type='text'
                register={register}
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
              <img src={photo ? URL.createObjectURL(photo) : student?.photo || 'https://via.placeholder.com/150'}
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
                errors={errors}
              />
            </div>
            <div className="col-4">
              <TextField
                label="Telefono"
                field="tutor_phone"
                register={register}
                type='text'
                maxLength='10'
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
                label="Dirección"
                field="tutor_address"
                register={register}
                type='text'
                errors={errors}
              />
            </div>
            <div className="col-6">
              <TextField
                label="Correo Electronico"
                field="tutor_email"
                register={register}
                type='email'
                rules={{ pattern: { value: PATTERNS.emailRegEx, message: 'Invalid email address' } }}
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
                errors={errors}
              />
            </div>
            <div className="col-4">
              <TextField
                label="Edad"
                disabled
                field="tutor_age"
                register={register}
                type='number'
                errors={errors}
              />
            </div>
            <div className="col-4">
              <TextField
                label="CURP"
                field="tutor_curp"
                register={register}
                type='text'
                maxLength='18'
                errors={errors}
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
                errors={errors}
              />
            </div>
            <div className="col-6">
              <TextField
                label="Grado cursado"
                field="tutor_schooling"
                register={register}
                type='text'
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
                errors={errors}
              />
            </div>
            <div className="col-4">
              <TextField
                label="Telefono"
                field="emergency_contact_phone_1"
                register={register}
                type='text'
                maxLength='10'
                errors={errors}
              />
            </div>
            <div className="col-4">
              <SelectField
                label='Parentesco'
                field='emergency_contact_relationship_1'
                errors={errors}
                control={control}
                options={
                  [
                    { value: 'Padre', label: 'Padre' },
                    { value: 'Madre', label: 'Madre' },
                    { value: 'Hermano', label: 'Hermano' },
                    { value: 'Hermana', label: 'Hermana' },
                    { value: 'Abuelo', label: 'Abuelo' },
                    { value: 'Abuela', label: 'Abuela' },
                    { value: 'Tio', label: 'Tio' },
                    { value: 'Tia', label: 'Tia' },
                    { value: 'Otro', label: 'Otro' },
                  ]
                }
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
                errors={errors}
              />
            </div>
            <div className="col-4">
              <TextField
                label="Telefono"
                field="emergency_contact_phone_2"
                register={register}
                type='text'
                maxLength='10'
                errors={errors}
              />
            </div>
            <div className="col-4">
              <SelectField
                label='Parentesco'
                field='emergency_contact_relationship_2'
                errors={errors}
                control={control}
                options={
                  [
                    { value: 'Padre', label: 'Padre' },
                    { value: 'Madre', label: 'Madre' },
                    { value: 'Hermano', label: 'Hermano' },
                    { value: 'Hermana', label: 'Hermana' },
                    { value: 'Abuelo', label: 'Abuelo' },
                    { value: 'Abuela', label: 'Abuela' },
                    { value: 'Tio', label: 'Tio' },
                    { value: 'Tia', label: 'Tia' },
                    { value: 'Otro', label: 'Otro' },
                  ]
                }
              />
            </div>
          </div>

          <div className="row mb-2 mt-3">
            <hr />
          </div>
          <div className="row mb-4">
            <div className="button-container col-12">
              <button className="btn" onClick={handleSubmit((data) => handleOnSubmit(data))}>{mode === 'register' ? 'Registrar' : 'Actualizar'}</button>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default StudentForm;
