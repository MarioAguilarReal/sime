import { useParams } from 'react-router-dom';
import { useLoader } from '../../../../Global/Context/globalContext';
import './AlternativeSkillsManagement.scss';
import { useEffect, useState } from 'react';
import { Student } from '../../../../interfaces/student/Student';
import { StudentService } from '../../../../services/students/StudentsService';
import AlternativeSkillsForm from '../alternativeSkills/AlternativeSkillsForm';

const AlternativeSkillsManagement = () => {
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
      {!student?.alternative_skills ? (
        !student ? null : (
          <AlternativeSkillsForm mode='register' student={student} />
        )
      ) : (
        <AlternativeSkillsForm mode='edit' alternativeSkills={student.alternative_skills} student={student} />
      )}
    </div>
  );
};

export default AlternativeSkillsManagement;
