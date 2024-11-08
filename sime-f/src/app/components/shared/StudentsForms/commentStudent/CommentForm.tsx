import { useForm } from 'react-hook-form';
import './CommentForm.scss';
import { StudentComments } from '../../../../interfaces/student/StudentComments';
import { useNavigate } from 'react-router-dom';
import { useLoader } from '../../../../Global/Context/globalContext';
import { useEffect, useState } from 'react';
import { Student } from '../../../../interfaces/student/Student';
import { User } from '../../../../interfaces/user/User';
import { UsersService } from '../../../../services/users/UsersService';
import { StudentService } from '../../../../services/students/StudentsService';
import { StudentCommentsService } from '../../../../services/students/StudentCommentsService';
import { toast } from 'react-toastify';

interface FormCommentProps {
  mode: 'register' | 'edit';
  comment?: StudentComments;
  studentId: any;
}
const CommentForm = (props: FormCommentProps) => {
  const { mode, comment, studentId } = props;
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<StudentComments>();
  const navigate = useNavigate();
  const { setLoading } = useLoader();

  const [student, setStudent] = useState<Student>();
  //const [studentComment, setStudentComment] = useState<StudentComments>();
  const [user, setUser] = useState<User>();
  const [userComment, setUserComment] = useState<User>();

  const loadUser = async () => {
    let user = sessionStorage.getItem('user');
    const parsedUser = user ? JSON.parse(user) : null;
    if (parsedUser !== user) {
      setUser(parsedUser);
    }
  };

  const handleOnSubmit = async (data: StudentComments) => {
    console.log(data);
    setLoading(true);
    if (mode === 'register') {
      await handleCreate(data);
    } else {
      await handleUpdate(data);
    }
    setLoading(false);
  };
  const handleCreate = async (data: StudentComments) => {
    setLoading(true);
    const formData = createFormData(data);
    const resp = await StudentCommentsService.register(formData, studentId);
    handleResponse(resp);
    setLoading(false);
  };
  const handleUpdate = async (data: StudentComments) => {
    setLoading(true);
    const formData = createFormData(data);
    const resp = await StudentCommentsService.update(formData, comment?.id || 0);
    handleResponse(resp);
    setLoading(false);
  };

  const createFormData = (data: StudentComments) => {
    const formData = new FormData();
    formData.append('comment', data.comment);
    formData.append('idStudent', studentId.toString() || '');
    formData.append('by', mode === 'edit' ? data.by.toString() : user?.id?.toString() || '');
    formData.append('userRoleCreator', user?.role.toString() || '');
    return formData;
  };

  const handleResponse = (resp: any) => {
    if (resp.status === 200) {
      toast.success(resp.message);
      //window.location.reload();
    } else {
      console.log(resp.status);
      toast.error(resp.message);
    }
  };

  const loadCommentAndUsers = async () => {
    setLoading(true);
    const [commentResp, usersResp] = await Promise.all([
      StudentCommentsService.get(comment?.id || 0),
      UsersService.getUsers(),
    ]);
    if (commentResp.status === 200 && usersResp.status === 200) {
      //setStudentComment(commentResp.comments);
      console.log('commentResp:', commentResp);
      console.log('usersResp:', usersResp);
      const uComment = usersResp.data.find((u: { id: number | undefined; }) => u.id === commentResp.comments.by);
      setUserComment(uComment);
      fillForm(commentResp.comments);
    } else {
      console.log('Error al cargar los datos:', commentResp.status, usersResp.status);
    }
    setLoading(false);
  };

  const fillForm = (comment: StudentComments) => {
    setValue('comment', comment.comment);
    setValue('by', comment.by);
  };

  const loadStudent = async (studentId: number) => {
    setLoading(true);
    let resp = await StudentService.getStudent(studentId);
    if (resp.status === 200) {
      setStudent(resp.student);
    } else {
      console.log(resp.status);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadUser();
  }, []);

  useEffect(() => {
    if (mode === 'edit') {
      loadCommentAndUsers();
    }
  }, [mode]);

  useEffect(() => {
    if (studentId) {
      console.log('studentId:', studentId);
      loadStudent(studentId);
    }
  }, [studentId]);

  return (
    <div className='student-comments'>
      <h1>Comentarios</h1>
      <h5><b>Alumno: </b>{student?.first_name + ' ' + student?.paternal_surname + ' ' + student?.maternal_surname}</h5>
      <div className="form">
        <div className="row mb-2">
          <div className="col-2">
            <button className='btn btn-secondary' onClick={() => navigate(`/student/overview/${studentId}`)} disabled={!studentId}>Volver</button>
          </div>
        </div>
        <div className="row mb-2 mt-3">
          <hr />
        </div>
        <div className='container-fluid-mb-3 form-group'>
          <div>
            {mode === 'register' ? <h6>¡Aún no hay comatarios, agrega uno!</h6> : <h6 style={{ textAlign: 'right' }}>Último comentario por: <b> {userComment?.first_name} {userComment?.paternal_surname} </b></h6>}

            <div className="form-floating">
              <textarea className="form-control comment" placeholder="Comentario" {...register('comment', { required: true })} name='comment' />
              <label>Comentario</label>
              {errors.comment && <span className="text-danger">Este campo es requerido</span>}
            </div>
            <div className="row mb-2 mt-3">
              <hr />
            </div>
            <div className="row">
              <div className="col-8">
                <button className="btn btn-comment xl" onClick={handleSubmit((data) => handleOnSubmit(data))}>{mode === 'edit' ? 'Actualizar' : 'Agregar'}</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentForm;
