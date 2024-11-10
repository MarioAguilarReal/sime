import { useParams } from 'react-router-dom';
import './ViewStudentComments.scss';
import { useLoader } from '../../../Global/Context/globalContext';
import { useEffect, useState } from 'react';
import { Student } from '../../../interfaces/student/Student';
import { StudentService } from '../../../services/students/StudentsService';

import CommentForm from './commentStudent/CommentForm';

const ViewStudentComments = () => {

  const { setLoading } = useLoader();
  const { id } = useParams();
  const [student, setStudent] = useState<Student>();

  const loadStudent = async (studentId: number) => {
    setLoading(true);
    let resp = await StudentService.getStudent(studentId);
    if (resp.status === 200) {
      console.log(resp.data);
      setStudent(resp.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (id) {
      loadStudent(+id);
    }
  }, [id]);


  return (
    <div>
      {!student?.comments ? (
        <CommentForm mode="register" studentId={student?.id} />
      ) : (
        <CommentForm mode="edit" comment={student.comments} studentId={student.id} />
      )}
    </div>
  );
}

export default ViewStudentComments;
