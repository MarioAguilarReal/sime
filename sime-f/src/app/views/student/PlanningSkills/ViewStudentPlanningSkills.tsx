import { useParams } from 'react-router-dom';
import { useLoader } from '../../../Global/Context/globalContext';
import './ViewStudentPlanningSkills.scss';
import { useEffect, useState } from 'react';
import { Student } from '../../../interfaces/student/Student';
import { StudentService } from '../../../services/students/StudentsService';
import PlanningSkillsForm from './planningSkills/PlanningSkillsForm';

const ViewStudentPlanningSkills = () => {

  const { setLoading } = useLoader();
  const { id } = useParams();
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
    }
  }, [id]);

  return (
    <div>
      {!student?.planning_skills ? (
        <PlanningSkillsForm mode="register" student={student as Student} />
      ) : (
        <PlanningSkillsForm mode="edit" planning={student.planning_skills} student={student} />
      )}
    </div>
  );
}

export default ViewStudentPlanningSkills;
