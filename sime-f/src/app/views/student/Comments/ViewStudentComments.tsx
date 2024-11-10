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
        student ? (
        <CommentForm mode="register" student={student} />
        ) : (
          <div>Student not found</div>
        )
      ) : (
        <CommentForm mode="edit" comment={student.comments} student={student} />
      )}
    </div>
  );
}

export default ViewStudentComments;
