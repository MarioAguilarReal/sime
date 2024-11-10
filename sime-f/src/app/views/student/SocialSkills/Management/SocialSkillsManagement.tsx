import { useParams } from 'react-router-dom';
import { useLoader } from '../../../../Global/Context/globalContext';
import './SocialSkillsManagement.scss';
import { useEffect, useState } from 'react';
import { Student } from '../../../../interfaces/student/Student';
import { StudentService } from '../../../../services/students/StudentsService';
import SocialSkillsForm from '../socialSkills/SocialSkillsForm';

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
      getStudent(+id);
    }
  }, [id]);

  return (
    <div>
      {!student?.socialSkills ? (
        <SocialSkillsForm mode='register' studentId={student?.id} />
      ) : (
        <SocialSkillsForm mode='edit' socialSkills={student.socialSkills} studentId={student.id} />
      )}
    </div>
  );
};

export default SocialSkillsManagement;
