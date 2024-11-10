import { useNavigate, useParams } from 'react-router-dom';
import { useLoader } from '../../../../Global/Context/globalContext';
import './ViewStudentCognitiveSkills.scss';
import { useEffect, useState } from 'react';
import { studentsData } from '../../../../common/studentEnums';
import { Student } from '../../../../interfaces/student/Student';
import { StudentService } from '../../../../services/students/StudentsService';

const ViewStudentCognitiveSkills = () => {

  const { setLoading } = useLoader();
  const { id } = useParams();
  const navigate = useNavigate();

  const [studentId, setStudentId] = useState(Number);
  const [selectedSkills, setSelectedSkills] = useState<any[]>([]);

  const [student, setStudent] = useState<Student>();

  const getStudent = async (dataId: number) => {
    setLoading(true);
    let resp = await StudentService.getStudent(dataId);
    if (resp.status === 200) {
      setStudent(resp.data);
    }
    setLoading(false);
  }

  useEffect(() => {
    if (id) {
      getStudent(+id);
      setStudentId(+id);
    }
  }, [id]);

  useEffect(() => {
    const studentCognitive = student?.cognitive_skills?.cognitive_list;
    if (!studentCognitive) return;
    if (studentCognitive.length > 0) {
      const filteredSkills = studentsData.cognitiveSkills.filter(skill => studentCognitive.includes(skill.value));
      setSelectedSkills(filteredSkills);
    }
  }, [student]);

  return (
    <div className="student-skills">
      <h1>Habilidades Cognitivas del Estudiante</h1>
      <div className="form">
        <div className="row mb-2">
          <div className="col-2">
            <button className='btn btn-secondary' onClick={() => navigate(`/student/overview/${studentId}`)} disabled={!studentId}>Volver</button>
          </div>
          <div className="col-4 btn-edit">
            <button className='btn' onClick={() => navigate(`/student/cognitive/skills/management/${studentId}`)} disabled={!studentId}>Editar Datos</button>
          </div>
        </div>
        <div className="row mb-2 mt-3">
          <hr />
        </div>
        <div className='container-fluid-mb-3 form-group'>
          <div className="row">
            <ul>
              {selectedSkills.map(skill => (
                <li key={Number(skill.value)}>{skill.label}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewStudentCognitiveSkills;
