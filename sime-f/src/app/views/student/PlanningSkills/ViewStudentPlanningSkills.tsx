import { useParams } from 'react-router-dom';
import { useLoader } from '../../../Global/Context/globalContext';
import './ViewStudentPlanningSkills.scss';
import { useEffect, useState } from 'react';
import { Student } from '../../../interfaces/student/Student';
import { StudentService } from '../../../services/students/StudentsService';
import PlanningSkillsForm from '../../../components/shared/StudentsForms/planningSkills/PlanningSkillsForm';

const ViewStudentPlanningSkills = () => {

  const { setLoading } = useLoader();
  const { id } = useParams();
  const [student, setStudent] = useState<Student>();

  const getStudent = async (dataId: number) => {
    setLoading(true);
    let resp = await StudentService.getStudent(dataId);
    if (resp.status === 200) {
      setStudent(resp.student);
    }
    setLoading(false);
  }

  useEffect(() => {
    if (id) {
      let dataId = parseInt(id);
      getStudent(dataId);
    }
  }, [id]);

  return (
    <div>
      {!student?.planningSkills ? (
        <PlanningSkillsForm mode="register" planningId={student?.id} studentId={student?.id} />
      ) : (
        <PlanningSkillsForm mode="edit" planningId={student.planningSkills.id} studentId={student.id} />
      )}
    </div>
  );
}

export default ViewStudentPlanningSkills;
