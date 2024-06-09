import { useNavigate, useParams } from 'react-router-dom';
import { useLoader } from '../../../../Global/Context/globalContext';
import './ViewStudentSocialSkills.scss';
import { useEffect, useState } from 'react';
import { StudentSocialSkillsService } from '../../../../services/students/StudentSocialSkillsService';
import { studentsData } from '../../../../common/studentEnums';

const ViewStudentSocialSkills = () => {

  const { setLoading } = useLoader();
  const { id } = useParams();
  const navigate = useNavigate();

  const [studentSocial, setStudentSocial] = useState({
    basic: [] as any[],
    advanced: [] as any[],
    feelings: [] as any[],
    assault: [] as any[],
    stress: [] as any[],
    planning: [] as any[],
  });

  const [selectedSkills, setSelectedSkills] = useState({
    basic: [] as any[],
    advanced: [] as any[],
    feelings: [] as any[],
    assault: [] as any[],
    stress: [] as any[],
    planning: [] as any[],
  });


  const loadStudentSocial = async (dataId: number) => {
    setLoading(true);
    let resp = await StudentSocialSkillsService.get(dataId);
    console.log(resp);

    if (resp.status === 200) {
      const socialSkills = {
        basic: resp.students_social_skills.basic.map(Number),
        advanced: resp.students_social_skills.advanced.map(Number),
        feelings: resp.students_social_skills.feelings.map(Number),
        assault: resp.students_social_skills.assault.map(Number),
        stress: resp.students_social_skills.stress.map(Number),
        planning: resp.students_social_skills.planning.map(Number)
      };

      setStudentSocial(socialSkills);

    } else {
      console.log(resp.status);
    }
    setLoading(false);
  }

  useEffect(() => {
    if (id) {
      let dataId = parseInt(id);
      loadStudentSocial(dataId);
    }
  }, [id]);

  useEffect(() => {
    if (studentSocial.basic.length > 0 ||
      studentSocial.advanced.length > 0 ||
      studentSocial.feelings.length > 0 ||
      studentSocial.assault.length > 0 ||
      studentSocial.stress.length > 0 ||
      studentSocial.planning.length > 0) {

      setSelectedSkills({
        basic: studentsData.socialBasic.filter(skill => studentSocial.basic.includes(skill.value)),
        advanced: studentsData.socialAdvanced.filter(skill => studentSocial.advanced.includes(skill.value)),
        feelings: studentsData.socialFeelings.filter(skill => studentSocial.feelings.includes(skill.value)),
        assault: studentsData.socialAssault.filter(skill => studentSocial.assault.includes(skill.value)),
        stress: studentsData.socialStress.filter(skill => studentSocial.stress.includes(skill.value)),
        planning: studentsData.socialPlanning.filter(skill => studentSocial.planning.includes(skill.value))
      });
    }
  }, [studentSocial]);

  return (
    <div className='student-skills'>
      <h1>View Student Social Skills</h1>
      <div className="form">
        <div className="row mb-2">
          <div className="col-2">
            <button className='btn btn-secondary' onClick={() => navigate(``)}>Volver</button>
          </div>
          <div className="col-4 btn-edit">
            <button className='btn btn-primary' onClick={() => navigate(`/student/social/skills/edit/${id}`)}>Editar Datos</button>
          </div>
        </div>
        <div className="row mb-2 mt-3">
          <hr className="border border-secondary border-1 opacity-75" />
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