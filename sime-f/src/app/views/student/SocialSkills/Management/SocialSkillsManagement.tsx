import { useParams } from 'react-router-dom';
import { useLoader } from '../../../../Global/Context/globalContext';
import './SocialSkillsManagement.scss';
import { useEffect, useState } from 'react';
import { Student } from '../../../../interfaces/student/Student';
import { StudentService } from '../../../../services/students/StudentsService';
import SocialSkillsForm from '../../../../components/shared/StudentsForms/socialSkills/SocialSkillsForm';

const SocialSkillsManagement = () => {
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
      {!student?.student_social_skills_id ? (
        <SocialSkillsForm mode='register' socialId={student?.id} studentId={student?.id} />
      ) : (
        <SocialSkillsForm mode='edit' socialId={student.student_social_skills_id} studentId={student.id} />
      )}
    </div>
  );
};

export default SocialSkillsManagement;