import { useNavigate, useParams } from 'react-router-dom';
import { useLoader } from '../../../../Global/Context/globalContext';
import './ViewStudentPlanningSkills.scss';
import { useEffect, useState } from 'react';
import { StudentPlanningSkills } from '../../../../interfaces/student/StudentPlanningSkills';
import { StudentPlanningSkillsService } from '../../../../services/students/StudentPlanningSkillsService';
import { studentsData } from '../../../../common/studentEnums';
import { Student } from '../../../../interfaces/student/Student';
import { StudentService } from '../../../../services/students/StudentsService';

const ViewStudentPlanningSkills = () => {

  const { setLoading } = useLoader();
  const { id } = useParams();
  const navigate = useNavigate();

  const [studentPlanning, setStudentPlanning] = useState<StudentPlanningSkills>({} as StudentPlanningSkills);

  const [studentFocus, setStudentFocus] = useState<string>();
  const [studentDetect, setStudentDetect] = useState<string>();
  const [studentCorrelation, setStudentCorrelation] = useState<string>();

  const [student, setStudent] = useState<Student>();

  const getStudent = async (dataId: number) => {
    setLoading(true);
    let resp = await StudentService.getAll();
    let returnStudent = resp.students.find((student: Student) => student.student_planning_skills_id === dataId);
    console.log(returnStudent.id);
    if (resp.status === 200) {
      setStudent(returnStudent.id);
    }
    setLoading(false);
  }

  const loadStudentPlanning = async (dataId: number) => {
    setLoading(true);
    let resp = await StudentPlanningSkillsService.get(dataId);
    console.log(resp);
    let studentFocus = studentsData.booleanType.find(obj => obj.value === Number(resp.students_planning_skills.focus));
    let studentDetect = studentsData.booleanType.find(obj => obj.value === Number(resp.students_planning_skills.detect));
    let studentCorrelation = studentsData.booleanType.find(obj => obj.value === Number(resp.students_planning_skills.correlation));

    if (resp.status === 200) {
      setStudentPlanning(resp.students_planning_skills);
      setStudentFocus(studentFocus?.label);
      setStudentDetect(studentDetect?.label);
      setStudentCorrelation(studentCorrelation?.label);
    } else {
      console.log(resp.status);
    }
    setLoading(false);
  }

  useEffect(() => {
    if (id) {
      let dataId = parseInt(id);
      loadStudentPlanning(dataId);
      getStudent(dataId);
    }
  }, [id]);

  return (
    <div className='student-skills'>
      <h1>Habilidades de Planificación</h1>
      <div className="form">
        <div className="row mb-2">
          <div className="col-2">
            <button className='btn btn-secondary' onClick={() => navigate(`/student/overview/${student}`)}>Volver</button>
          </div>
          <div className="col-4 btn-edit">
            <button className='btn' onClick={() => navigate(`/student/plnning/skills/edit/${studentPlanning.id}`)}>Editar Datos</button>
          </div>
        </div>
        <div className="row mb-2 mt-3">
          <hr />
        </div>
        <div className="container-fluid-mb-3 form-group">
          <div className="row">
            <div className="col-4">
              <label>¿Sabe enfocar correctamente su atención a los puntos importantes de un problema?</label>
              <p>{studentFocus}</p>
            </div>
            <div className="col-4">
              <label>¿Detecta o no los posibles errores?</label>
              <p>{studentDetect}</p>
            </div>
            <div className="col-4">
              <label>¿Correlaciona entre lo planeado y lo ejecutado?</label>
              <p>{studentCorrelation}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewStudentPlanningSkills;