import './StudentAcademicDataRegister.scss'
import { StudentAcademicData } from '../../../../interfaces/student/StudentAcademicData';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { useLoader } from '../../../../Global/Context/globalContext';
import { ToastContainer, toast } from 'react-toastify';
import TextField from '../../../../components/shared/FormInputs/TextField';
import SelectField from '../../../../components/shared/FormInputs/SelectFIeld';
import { studentsData } from '../../../../common/studentEnums';
import { StudentAcademicDataService } from '../../../../services/students/StudentAcademicDataService';
import { StudentService } from '../../../../services/students/StudentsService';
import { useEffect, useState } from 'react';
import { Student } from '../../../../interfaces/student/Student';

const StudentAcademicDataRegister = () => {

  const { id } = useParams<{ id: string }>();
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<StudentAcademicData>();
  const navigate = useNavigate();
  const { setLoading } = useLoader();

  const [studentData, setStudentData] = useState<Student>();

  const [back, setBack] = useState(Number);

  const loadStudent = async (studentId: number) => {
    setLoading(true);
    let resp = await StudentService.getStudent(studentId);
    console.log(resp);
    if (resp.status === 200) {
      setStudentData(resp.student);
      setBack(studentId);
    } else {
      console.log(resp.status);
    }
    setLoading(false);
  };

  const handleCreate = async (data: StudentAcademicData) => {
    setLoading(true);
    console.log(data);
    const formData = new FormData();
    formData.append('student_id', data.student_id);
    formData.append('grade_level', data.grade_level.toString());
    formData.append('group_id', data.group_id.toString());
    formData.append('last_grade_average', data.last_grade_average.toString());
    formData.append('actual_grade_average', data.actual_grade_average.toString());
    formData.append('behavior', data.behavior.toString());

    const resp = await StudentAcademicDataService.register(formData, studentData?.id || 0);
    console.log(studentData);
    console.log(resp);
    if (resp.status === 200) {
      toast.success(resp.message);
      if (resp.students_academic_data)
        navigate("/student/data/overview/" + resp.students_academic_data.id);
    } else {
      console.log(resp.status);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (!id) return;
    let studentId = parseInt(id);
    loadStudent(studentId);
  }, [id]);

  return (
    <div className="student-data">
      <h1>Registro de Datos Academicos</h1>
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
          <div className="row mb-4">
            <div className="col-4">
              <TextField
                label="Matricula"
                field='student_id'
                register={register}
                type='text'
                rules={{ required: 'This field is required' }}
                errors={errors}
              />
            </div>
            <div className="col-4">
              <SelectField
                label={'Grado'}
                field={'grade_level'}
                errors={errors}
                control={control}
                options={studentsData.grade}
              />
            </div>
            <div className="col-4">
              <SelectField
                label={'Grupo'}
                field={'group_id'}
                errors={errors}
                control={control}
                options={studentsData.group}
              />
            </div>
          </div>
          <div className="row mb-4">
            <div className="col-4">
              <TextField
                label="Promedio del Grado Anterior"
                field='last_grade_average'
                register={register}
                type='number'
                rules={{ required: 'This field is required' }}
                errors={errors}
              />
            </div>
            <div className="col-4">
              <TextField
                label={'Promedio Actual'}
                field={'actual_grade_average'}
                register={register}
                type='number'
                rules={{ required: 'This field is required' }}
                errors={errors}
              />
            </div>
            <div className="col-4">
              <SelectField
                label={'Conducta'}
                field={'behavior'}
                errors={errors}
                control={control}
                options={studentsData.conduct}
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

export default StudentAcademicDataRegister;