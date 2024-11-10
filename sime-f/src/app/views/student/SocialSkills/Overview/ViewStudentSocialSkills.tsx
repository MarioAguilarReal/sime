import { useNavigate, useParams } from 'react-router-dom';
import { useLoader } from '../../../../Global/Context/globalContext';
import './ViewStudentSocialSkills.scss';
import { useEffect, useState } from 'react';
import { studentsData } from '../../../../common/studentEnums';
import { Student } from '../../../../interfaces/student/Student';
import { StudentService } from '../../../../services/students/StudentsService';

const ViewStudentSocialSkills = () => {

  const { setLoading } = useLoader();
  const { id } = useParams();
  const navigate = useNavigate();

  const [studentId, setStudentId] = useState(Number);

  const [selectedSkills, setSelectedSkills] = useState({
    basic: [] as any[],
    advanced: [] as any[],
    feelings: [] as any[],
    assault: [] as any[],
    stress: [] as any[],
    planning: [] as any[],
  });

  const [student, setStudent] = useState<Student>();

  // Creo que este metodo se va a tener que modificar
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
    const studentsSocial = student?.social_skills;
    if (!studentsSocial) return;
    if (studentsSocial.basic.length > 0 ||
      studentsSocial.advanced.length > 0 ||
      studentsSocial.feelings.length > 0 ||
      studentsSocial.assault.length > 0 ||
      studentsSocial.stress.length > 0 ||
      studentsSocial.planning.length > 0) {

      setSelectedSkills({
        basic: studentsData.socialBasic.filter(skill => studentsSocial.basic.includes(skill.value)),
        advanced: studentsData.socialAdvanced.filter(skill => studentsSocial.advanced.includes(skill.value)),
        feelings: studentsData.socialFeelings.filter(skill => studentsSocial.feelings.includes(skill.value)),
        assault: studentsData.socialAssault.filter(skill => studentsSocial.assault.includes(skill.value)),
        stress: studentsData.socialStress.filter(skill => studentsSocial.stress.includes(skill.value)),
        planning: studentsData.socialPlanning.filter(skill => studentsSocial.planning.includes(skill.value))
      });
    }
  }, [student]);

  return (
    <div className='student-skills'>
      <h1>Habilidades Sociales del Estudiante</h1>
      <div className="form">
        <div className="row mb-2">
          <div className="col-2">
            <button className='btn btn-secondary' onClick={() => navigate(`/student/overview/${studentId}`)} disabled={!studentId}>Volver</button>
          </div>
          <div className="col-4 btn-edit">
            <button className='btn' onClick={() => navigate(`/student/social/skills/management/${studentId}`)} disabled={!studentId}>Editar Datos</button>
          </div>
        </div>
        <div className="row mb-2 mt-3">
          <hr />
        </div>
        <div className='container-fluid-mb-3 form-group'>
          <div className="row">
            <div className="col-12">
              <div className="skills">
                <h4>Sociales básicas</h4>
                <h6>El alumno puede:</h6>
                <ul>
                  {selectedSkills.basic.map(skill => (
                    <li key={skill.value}>{skill.label}</li>
                  ))}
                </ul>
              </div>
              <div className="skills">
                <h4>Sociales avanzadas</h4>
                <h6>El alumno puede:</h6>
                <ul>
                  {selectedSkills.advanced.map(skill => (
                    <li key={skill.value}>{skill.label}</li>
                  ))}
                </ul>
              </div>
              <div className="skills">
                <h4>Relacionadas con los sentimientos</h4>
                <h6>El alumno puede:</h6>
                <ul>
                  {selectedSkills.feelings.map(skill => (
                    <li key={skill.value}>{skill.label}</li>
                  ))}
                </ul>
              </div>
              <div className="skills">
                <h4>Alternativas a la agresión</h4>
                <h6>El alumno puede:</h6>
                <ul>
                  {selectedSkills.assault.map(skill => (
                    <li key={skill.value}>{skill.label}</li>
                  ))}
                </ul>
              </div>
              <div className="skills">
                <h4>Para enfrentar el estrés</h4>
                <h6>El alumno puede:</h6>
                <ul>
                  {selectedSkills.stress.map(skill => (
                    <li key={skill.value}>{skill.label}</li>
                  ))}
                </ul>
              </div>
              <div className="skills">
                <h4>De planificación</h4>
                <h6>El alumno puede:</h6>
                <ul>
                  {selectedSkills.planning.map(skill => (
                    <li key={skill.value}>{skill.label}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewStudentSocialSkills;
