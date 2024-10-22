import { useParams } from 'react-router-dom';
import { useLoader } from '../../../Global/Context/globalContext';
import './ViewStudentAcademicData.scss'
import { useEffect, useState } from 'react';
import { Student } from '../../../interfaces/student/Student';
import { StudentService } from '../../../services/students/StudentsService';
import AcademicForm from '../../../components/shared/StudentsForms/academicData/AcademicForm';

const ViewStudentAcademicData = () => {

  const { setLoading } = useLoader();
  const { id } = useParams();
  const [studentData, setStudentData] = useState<Student>();

  const getStudent = async (dataId: number) => {
    setLoading(true);
    let resp = await StudentService.getStudent(dataId);
    if (resp.status === 200) {
      setStudentData(resp.student);
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
      {!studentData?.student_academic_data_id ? (
        <AcademicForm mode="register" academicId={studentData?.id} studentId={studentData?.id} />
      ) : (
        <AcademicForm mode="edit" academicId={studentData.student_academic_data_id} studentId={studentData.id} />
      )}
    </div>
  );
}

export default ViewStudentAcademicData;