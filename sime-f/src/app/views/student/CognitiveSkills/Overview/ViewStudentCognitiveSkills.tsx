import { useNavigate, useParams } from 'react-router-dom';
import { useLoader } from '../../../../Global/Context/globalContext';
import './ViewStudentCognitiveSkills.scss';
import { useEffect, useState } from 'react';
import { StudentCognitiveSkillsService } from '../../../../services/students/StudentCognitiveSkillsService';
import { studentsData } from '../../../../common/studentEnums';
import { Student } from '../../../../interfaces/student/Student';
import { StudentService } from '../../../../services/students/StudentsService';

const ViewStudentCognitiveSkills = () => {

  const { setLoading } = useLoader();
  const { id } = useParams();
  const navigate = useNavigate();

  const [studentCognitive, setStudentCognitive] = useState<any>([]);
  const [selectedSkills, setSelectedSkills] = useState<any[]>([]);
  const [studentId, setStudentId] = useState<Student>({} as Student);

  const loadStudentCognitive = async (dataId: number) => {
    setLoading(true);
    let resp = await StudentCognitiveSkillsService.get(dataId);
    console.log(resp);

    console.log(resp.students_cognitive_skills.cognitive_list);
    console.log(selectedSkills);

    if (resp.status === 200) {
      const cognitiveList = resp.students_cognitive_skills.cognitive_list.map(Number);
      setStudentCognitive(cognitiveList);

      await findStudentId(resp.students_cognitive_skills.id);
    } else {
      console.log(resp.status);
    }
    setLoading(false);
  }

  const findStudentId = async (cognitiveSkillsId: number) => {
    let studentsResp = await StudentService.getAll();
    console.log(studentsResp);
    if (studentsResp.status === 200) {
      let student = studentsResp.students.find((student: Student) => student.student_cognitive_skills_id === cognitiveSkillsId);
      console.log(student);
      if (student) {
        setStudentId(student);
        console.log(studentId.id);
      }
    }
  }

  useEffect(() => {
    if (id) {
      let dataId = parseInt(id);
      loadStudentCognitive(dataId);
    }
  }, [id]);

  useEffect(() => {
    if (studentCognitive.length > 0) {
      const filteredSkills = studentsData.cognitiveSkills.filter(skill => studentCognitive.includes(skill.value));
      setSelectedSkills(filteredSkills);
    }
  }, [studentCognitive]);

  return (
    <div className="student-skills">
      <h1>Habilidades Cognitivas del Estudiante</h1>
      <div className="form">
        <div className="row mb-2">
          <div className="col-2">
            <button className='btn btn-secondary' onClick={() => navigate(`/student/overview/${studentId.id}`)}>Volver</button>
          </div>
          <div className="col-4 btn-edit">
            <button className='btn btn-primary' onClick={() => navigate(`/student/cognitive/skills/edit/${id}`)}>Editar Datos</button>
          </div>
        </div>
        <div className="row mb-2 mt-3">
          <hr className="border border-secondary border-1 opacity-75" />
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