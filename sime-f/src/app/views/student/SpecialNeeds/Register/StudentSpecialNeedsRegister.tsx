import './StudentSpecialNeedsRegister.scss';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { StudentSpecialNeeds } from '../../../../interfaces/student/StudentSpecialNeeds';
import { useLoader } from '../../../../Global/Context/globalContext';
import { useEffect, useState } from 'react';
import { Student } from '../../../../interfaces/student/Student';
import { StudentService } from '../../../../services/students/StudentsService';
import { StudentSpecialNeedsService } from '../../../../services/students/StudentSpecialNeedsService';
import { ToastContainer, toast } from 'react-toastify';
import TextField from '../../../../components/shared/FormInputs/TextField';
import SelectField from '../../../../components/shared/FormInputs/SelectFIeld';
import { studentsData } from '../../../../common/studentEnums';

const StudentSpecialNeedsRegister = () => {

  const { id } = useParams<{ id: string }>();
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<StudentSpecialNeeds>();
  const navigate = useNavigate();
  const { setLoading } = useLoader();

  const [studentNeeds, setStudentNeeds] = useState<Student>();

  const [back, setBack] = useState(Number);

  const loadStudent = async (studentId: number) => {
    setLoading(true);
    let resp = await StudentService.getStudent(studentId);
    console.log(resp);
    if (resp.status === 200) {
      setStudentNeeds(resp.student);
      setBack(studentId);
    } else {
      console.log(resp.status);
    }
    setLoading(false);
  };

  const handleCreate = async (data: StudentSpecialNeeds) => {
    setLoading(true);
    console.log(data);
    const formData = new FormData();
    formData.append('usaer_status', data.usaer_status.toString());
    formData.append('learning_problems', data.learning_problems);
    formData.append('diseases', data.diseases);

    const resp = await StudentSpecialNeedsService.register(formData, studentNeeds?.id || 0);
    console.log(studentNeeds);
    console.log(resp);
    if (resp.status === 200) {
      toast.success(resp.message);
      if (resp.students_special_needs)
        navigate('/student/need/overview/' + resp.students_special_needs.id);
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

  return (
    <div className="student-needs">
      <h1>Registro de Necasidades Especiales</h1>
      <div className="form">
        <div className="row mb-2">
          <div className="col-2">
            <button className='btn btn-secondary' onClick={() => navigate(`/student/overview/${back}`)}>Volver</button>
          </div>
        </div>
        <div className="row mb-2 mt-3">
          <hr />
        </div>
        <div className='container-fluid-mb-3 form-group'>
          <div className="mb-4">
            <div className="row mb-4 col-4">
              <SelectField
                label={'¿El alumno asiste a USAER?'}
                field={'usaer_status'}
                errors={errors}
                control={control}
                options={studentsData.booleanType}
                rules={{ required: 'This field is required' }}
              />
            </div>
            <div className="row mb-4 col-4">
              <TextField
                label={"¿Presenta problemas de aprendizaje? (de que tipo)"}
                field={'learning_problems'}
                register={register}
                type='text'
                rules={{ required: 'This field is required' }}
                errors={errors}
              />
            </div>
            <div className="row mb-4 col-4">
              <TextField
                label={"¿Presenta alguna enfermedad? (neuronal, motriz, etc.)"}
                field={'diseases'}
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
          <div className="row">
            <div className="col-8">
              <button className="btn btn-add xl" onClick={handleSubmit((data) => handleCreate(data))}>Registrar</button>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}


export default StudentSpecialNeedsRegister;