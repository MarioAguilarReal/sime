import { useParams } from 'react-router-dom';
import { useLoader } from '../../../Global/Context/globalContext';
import './ViewStudentAcademicData.scss'
import { useEffect, useState } from 'react';
import { Student } from '../../../interfaces/student/Student';
import { StudentService } from '../../../services/students/StudentsService';
import AcademicForm from './academicData/AcademicForm';

const ViewStudentAcademicData = () => {

  const { setLoading } = useLoader();
  const { id } = useParams();
  const [studentData, setStudentData] = useState<Student>();

  const getStudent = async (dataId: number) => {
    setLoading(true);
    let resp = await StudentService.getStudent(dataId);
    if (resp.status === 200) {
      setStudentData(resp.data);
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
      {!studentData?.academicData ? (
        !studentData ? null :
          <AcademicForm mode="register" student={studentData} />
      ) : (
        <AcademicForm mode="edit" academicData={studentData.academicData} student={studentData} />
      )}
    </div>
  );
}

export default ViewStudentAcademicData;
