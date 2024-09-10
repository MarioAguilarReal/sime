import { useNavigate, useParams } from 'react-router-dom';
import './StudentPlanningSkillsRegister.scss';
import { useForm } from 'react-hook-form';
import { StudentPlanningSkills } from '../../../../interfaces/student/StudentPlanningSkills';
import { useLoader } from '../../../../Global/Context/globalContext';
import { useEffect, useState } from 'react';
import { Student } from '../../../../interfaces/student/Student';
import { StudentService } from '../../../../services/students/StudentsService';
import { StudentPlanningSkillsService } from '../../../../services/students/StudentPlanningSkillsService';
import { ToastContainer, toast } from 'react-toastify';
import SelectField from '../../../../components/shared/FormInputs/SelectFIeld';
import { studentsData } from '../../../../common/studentEnums';

const StudentPlanningSkillsRegister = () => {

  const { id } = useParams<{ id: string }>();
  const {
    handleSubmit,
    formState: { errors },
    control
  } = useForm<StudentPlanningSkills>();
  const navigate = useNavigate();
  const { setLoading } = useLoader();

  const [studentPlanning, setStudentPlanning] = useState<Student>();

  const [back, setBack] = useState(Number);

  const loadStudent = async (studentId: number) => {
    setLoading(true);
    let resp = await StudentService.getStudent(studentId);
    console.log(resp);
    if (resp.status === 200) {
      setStudentPlanning(resp.student);
      setBack(studentId);
    } else {
      console.log(resp.status);
    }
    setLoading(false);
  };

  const handleCreate = async (data: StudentPlanningSkills) => {
    setLoading(true);
    console.log(data);
    const formData = new FormData();
    formData.append('focus', data.focus.toString());
    formData.append('detect', data.detect.toString());
    formData.append('correlation', data.correlation.toString());

    const resp = await StudentPlanningSkillsService.register(formData, studentPlanning?.id || 0);
    console.log(studentPlanning);
    console.log(resp);
    if (resp.status === 200) {
      toast.success(resp.message);
      if (resp.students_planning_skills)
        navigate('/student/planning/skills/overview/' + resp.students_planning_skills.id);
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
    <div className="student-planning">
      <h1>Registro de Habilidades de Planificación</h1>
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
            <div className="row mb-4 col-4">
              <SelectField
                label={"¿Sabe enfocar correctamente su atención a los puntos importantes de un problema?"}
                field={'focus'}
                errors={errors}
                control={control}
                options={studentsData.booleanType}
                rules={{ required: 'Este campo es requerido' }}
              />
            </div>
          </div>
          <div className="row mb-4">
            <div className="row mb-4 col-4">
              <SelectField
                label={"¿Detecta o no los posibles errores?"}
                field={'detect'}
                errors={errors}
                control={control}
                options={studentsData.booleanType}
                rules={{ required: 'Este campo es requerido' }}
              />
            </div>
          </div>
          <div className="row mb-4">
            <div className="row mb-4 col-4">
              <SelectField
                label={"¿Correlaciona entre lo planeado y lo ejecutado?"}
                field={'correlation'}
                errors={errors}
                control={control}
                options={studentsData.booleanType}
                rules={{ required: 'Este campo es requerido' }}
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

export default StudentPlanningSkillsRegister;