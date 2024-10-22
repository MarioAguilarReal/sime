import { useNavigate, useParams } from "react-router-dom";
import { useLoader } from "../../../../Global/Context/globalContext";
import "./ViewStudentAlternativeSkills.scss";
import { useEffect, useState } from "react";
import { StudentAlternativeSkillsService } from "../../../../services/students/StudentAlternativeSkillsService";
import { studentsData } from "../../../../common/studentEnums";
import { Student } from "../../../../interfaces/student/Student";
import { StudentService } from "../../../../services/students/StudentsService";

const ViewStudentAlternativeSkills = () => {

  const { setLoading } = useLoader();
  const { id } = useParams();
  const navigate = useNavigate();

  const [studentAlternative, setStudentAlternative] = useState<any>([]);
  const [selectedSkills, setSelectedSkills] = useState<any[]>([]);

  const [student, setStudent] = useState<Student>();

  const getStudent = async (dataId: number) => {
    setLoading(true);
    let resp = await StudentService.getAll();
    let returnStudent = resp.students.find((student: Student) => student.student_alternative_skills_id === dataId);
    console.log(returnStudent.id);
    if (resp.status === 200) {
      setStudent(returnStudent.id);
    }
    setLoading(false);
  }

  const loadStudentAlternative = async (dataId: number) => {
    setLoading(true);
    let resp = await StudentAlternativeSkillsService.get(dataId);
    console.log(resp);

    console.log(resp.students_alternative_skills.alternative_list);
    console.log(selectedSkills);

    if (resp.status === 200) {
      const alternativeList = resp.students_alternative_skills.alternative_list.map(Number);
      setStudentAlternative(alternativeList);
      console.log(studentAlternative);
    } else {
      console.log(resp.status);
    }
    setLoading(false);
  }

  useEffect(() => {
    if (id) {
      let dataId = parseInt(id);
      loadStudentAlternative(dataId);
      getStudent(dataId);
    }
  }, [id]);

  useEffect(() => {
    if (studentAlternative.length > 0) {
      const filteredSkills = studentsData.alternativeSkills.filter(skill => studentAlternative.includes(skill.value));
      setSelectedSkills(filteredSkills);
    }
  }, [studentAlternative]);

  return (
    <div className="view-skills">
      <h1>Habilidades Alternativas del Estudiante</h1>
      <div className="form">
        <div className="row mb-2">
          <div className="col-2">
            <button className='btn btn-secondary' onClick={() => navigate(`/student/overview/${student}`)} disabled={!student}>Volver</button>
          </div>
          <div className="col-4 btn-edit">
            <button className='btn' onClick={() => navigate(`/student/alternative/skills/management/${student}`)} disabled={!student}>Editar Datos</button>
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
};

export default ViewStudentAlternativeSkills;
