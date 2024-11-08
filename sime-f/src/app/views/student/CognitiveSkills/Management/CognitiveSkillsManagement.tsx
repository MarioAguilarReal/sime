import { useParams } from 'react-router-dom';
import { useLoader } from '../../../../Global/Context/globalContext';
import './CognitiveSkillsManagement.scss';
import { useEffect, useState } from 'react';
import { Student } from '../../../../interfaces/student/Student';
import { StudentService } from '../../../../services/students/StudentsService';
import CognitiveSkillsForm from '../../../../components/shared/StudentsForms/cognitiveSkills/CognitiveSkillsForm';

const CognitiveSkillsManagement = () => {
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
  };

  useEffect(() => {
    if (id) {
      let dataId = parseInt(id);
      getStudent(dataId);
    }
  }, [id]);

  return (
    <div>
      {!student?.student_cognitive_skills_id ? (
        <CognitiveSkillsForm mode='register' cognitiveId={student?.id} studentId={student?.id} />
      ) : (
        <CognitiveSkillsForm mode='edit' cognitiveId={student.student_cognitive_skills_id} studentId={student.id} />
      )}
    </div>
  );
};

export default CognitiveSkillsManagement;
