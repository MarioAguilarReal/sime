import { useParams } from 'react-router-dom';
import './ViewStudentComments.scss';
import { useLoader } from '../../../Global/Context/globalContext';
import { useEffect, useState } from 'react';
import { Student } from '../../../interfaces/student/Student';
import { StudentService } from '../../../services/students/StudentsService';

import CommentForm from '../../../components/shared/StudentsForms/commentStudent/CommentForm';

const ViewStudentComments = () => {

  const { id } = useParams<{ id: string }>();

  const { setLoading } = useLoader();

  const [student, setStudent] = useState<Student>();

  const loadStudent = async (studentId: number) => {
    setLoading(true);
    let resp = await StudentService.getStudent(studentId);
    console.log(resp);
    if (resp.status === 200) {
      setStudent(resp.data);
    } else {
      console.log(resp.status);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (!id) return;
    let studentId = parseInt(id);
    loadStudent(studentId);

  }, [id]);


  return (
    <div>
      {!student?.comments_id ? (
        <CommentForm mode="register" commentId={student?.id} studentId={student?.id} />
      ) : (
        <CommentForm mode="edit" commentId={student.comments_id} studentId={student.id} />
      )}
    </div>
  );
}

export default ViewStudentComments;
