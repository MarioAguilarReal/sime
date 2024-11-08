import { useParams } from 'react-router-dom';
import { useLoader } from '../../../../Global/Context/globalContext';
import './AlternativeSkillsManagement.scss';
import { useEffect, useState } from 'react';
import { Student } from '../../../../interfaces/student/Student';
import { StudentService } from '../../../../services/students/StudentsService';
import AlternativeSkillsForm from '../../../../components/shared/StudentsForms/alternativeSkills/AlternativeSkillsForm';

const AlternativeSkillsManagement = () => {
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
  };

  useEffect(() => {
    if (id) {
      let dataId = parseInt(id);
      getStudent(dataId);
    }
  }, [id]);

  return (
    <div>
      {!student?.alternativeSkills ? (
        <AlternativeSkillsForm mode='register' studentId={student?.id} />
      ) : (
        <AlternativeSkillsForm mode='edit' alternativeSkills={student.alternativeSkills} studentId={student.id} />
      )}
    </div>
  );
};

export default AlternativeSkillsManagement;
