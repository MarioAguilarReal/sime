import { useNavigate, useParams } from 'react-router-dom';
import './StudentCommentRegister.scss';
import { useForm } from 'react-hook-form';
import { StudentComments } from '../../../../interfaces/student/StudentComments';
import { useLoader } from '../../../../Global/Context/globalContext';
import { Student } from '../../../../interfaces/student/Student';
import { useEffect, useState } from 'react';
import { StudentService } from '../../../../services/students/StudentsService';
import { StudentCommentsService } from '../../../../services/students/StudentCommentsService';
import { User } from '../../../../interfaces/user/User';
import { UsersService } from '../../../../services/users/UsersService';

const StudentCommentsRegister = () => {

  const { id } = useParams<{ id: string }>();
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    getValues,
    watch
  } = useForm<StudentComments>();
  const navigate = useNavigate();
  const { setLoading } = useLoader();

  const [studentComments, setStudentComments] = useState<Student>();
  const [userComments, setUserComments] = useState<User>();

  // load user
  const loadUser = async () => {
    setLoading(true);
    let resp = await UsersService.getUsers();
    console.log(resp);
    if (resp.status === 200) {
      setUserComments(resp.data);
    } else {
      console.log(resp.status);
    }
    setLoading(false);
  };

  const loadStudent = async (studentId: number) => {
    setLoading(true);
    let resp = await StudentService.getStudent(studentId);
    console.log(resp);
    if (resp.status === 200) {
      setStudentComments(resp.student);
    } else {
      console.log(resp.status);
    }
    setLoading(false);
  };

  const handleCreate = async (data: StudentComments) => {
    setLoading(true);
    console.log(data);
    const formData = new FormData();
    formData.append('comment', data.comment);
    formData.append('student_id', studentComments?.id?.toString() || '');

    const resp = await StudentCommentsService.register(formData, studentComments?.id || 0);
    console.log(studentComments);
    console.log(resp);
    if (resp.status === 200) {
      setLoading(false);
      navigate('/student/comments/overview/' + resp.student_comments.id);
    } else {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!id) return;
    let studentId = parseInt(id);
    loadStudent(studentId);
  }, [id]);

  return (
    <div className='student-comments'>
      <h1>Agregar Comentario</h1>
    </div>
  );
}

export default StudentCommentsRegister;