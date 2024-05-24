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
import { ToastContainer, toast } from 'react-toastify';

const EditStudent = () => {

  const { id } = useParams<{ id: string }>();
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    getValues,
    setValue
  } = useForm<Student>();
  const navigate = useNavigate();
  const { setLoading } = useLoader();

  const [photo, setPhoto] = useState<File | null>(null);
  const [student, setStudent] = useState<Student>();

  const handlePhotoChange = (e: any) => {
    const selectedPhoto = e.target.files[0];
    setPhoto(selectedPhoto);
  }


  const loadStudent = async (studentId: number) => {
    setLoading(true);
    let resp = await StudentService.getStudent(studentId);
    if (resp.status === 200) {
      setStudent(resp.student)
    } else {
      toast.error(resp.message);
    }
    setLoading(false);
  };

  const handleUpdateStudent = async (data: Student) => {
    setLoading(true);
    const formData = new FormData();
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
    const resp = await StudentService.update(formData, student?.id || 0);
    if (resp.status === 200) {
      toast.success(resp.message);
      navigate("/student/overview/" + resp.student.id);
    } else {
      toast.error(resp.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (!id) return;
    let studentId = parseInt(id);
    loadStudent(studentId);
  }, [id]);

  useEffect(() => {
    if (student) {
      setValue('first_name', student.first_name);
      setValue('last_name', student.last_name);
      setValue('birth_date', student.birth_date);
      setValue('age', student.age);
      setValue('gender', student.gender);
      setValue('address', student.address);
      setValue('trans_type', student.trans_type);
      setValue('civil_status', student.civil_status);
      setValue('tutor_name', student.tutor_name);
      setValue('tutor_phone', student.tutor_phone);
      setValue('tutor_age', student.tutor_age);
      setValue('tutor_address', student.tutor_address);
      setValue('tutor_email', student.tutor_email);
    }
  }, [student]);

  // const handleEdit = async (student: Student) => {
  //   console.log(student.id);

  //   setLoading(true);
  //   let resp = await StudentService.update(student, Number(student.id));
  //   console.log(resp);
  //   if (resp.status === 200) {
  //     navigate('/students/');
  //   } else {
  //     console.log(resp.status);
  //   }
  //   setLoading(false);
  // }


  // useEffect(() => {
  //   if (id) {
  //     let studentId = parseInt(id);
  //     loadStudent(studentId);
  //   }
  // }, [id]);

  return (
    <div className="edit-student">
      <h1>Editar Estudiante</h1>
      <div className="form">
        <div className="row mb-2">
          <div className="col-4 btn-edit">
            <button className='btn btn-secondary' onClick={() => navigate("/student/overview/" + student?.id)}><i className="bi bi-chevron-left" />Volver</button>
          </div>
        </div>
        <div className="row mb-2 mt-3">
          <hr className="border border-secondary border-1 opacity-75" />
        </div>
        <div className='container-fluid-mb-3 form-group'>
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
                errors={errors}
              />
            </div>
            <div className="col-6">
              <TextField
                label="Apellido"
                field="last_name"
                register={register}
                type='text'
                errors={errors}
              />
            </div>
          </div>
          <div className="row mb-4">
            <div className="col-4">
              <TextField
                label='Fecha de Cumpleaños'
                field='birth_date'
                type='date'
                register={register}
                errors={errors}
              />
            </div>
            <div className="col-4">
              <TextField
                label='Edad'
                field='age'
                type='number'
                register={register}
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
                label='Direccion'
                field='address'
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
            <div className="row mb-4">
              <div className="col-4">
                <label htmlFor="">Photo</label>
                <input type="file"
                  className='form-control'
                  accept='image/*'
                  onChange={handlePhotoChange}
                />
              </div>
              <div className="col-4">
                <p>Photo Preview</p>
                <img
                  src={photo ? URL.createObjectURL(photo) : student?.photo || 'https://via.placeholder.com/150'}
                  alt="student"
                  className='student-photo'
                />
              </div>
            </div>
          </div>
          <div className="row">
            <h2>Datos del Tutor</h2>
            <hr className="border border-secondary border-1 opacity-75" />
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
                errors={errors}
              />
            </div>
            <div className="col-4">
              <TextField
                label="Edad"
                field="tutor_age"
                register={register}
                type='number'
                errors={errors}
              />
            </div>
          </div>
          <div className="row mb-4">
            <div className="col-6">
              <TextField
                label="Direccion"
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
                rules={{ value: PATTERNS.emailRegEx, message: 'Invalid email address' }}
                errors={errors}
              />
            </div>
            <div className="row mb-2 mt-3">
              <hr className="border border-secondary border-1 opacity-75" />
            </div>
            <div className="row">
              <div className="col-8">
                <button className="btn btn-primary xl" onClick={handleSubmit((data) => handleUpdateStudent(data))}>Editar</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default EditStudent;