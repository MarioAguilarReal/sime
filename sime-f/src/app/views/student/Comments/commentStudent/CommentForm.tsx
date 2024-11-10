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
  student: Student;
}
const CommentForm = (props: FormCommentProps) => {
  const { mode, comment, student } = props;
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<StudentComments>();
  const navigate = useNavigate();
  const { setLoading } = useLoader();

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
    setLoading(true);
    if (mode === 'register') {
      await handleCreate(data);
    } else {
      await handleUpdate(data);
    }
    setLoading(false);
  };

  const handleCreate = async (data: StudentComments) => {
    let dataToCreate = {
      comment: data.comment,
      idStudent: student?.id,
      by: user?.id,
      userRoleCreator: user?.role,
    };
    const resp = await StudentCommentsService.register(dataToCreate, student?.id || 0);
    handleResponse(resp);
  };
  const handleUpdate = async (data: StudentComments) => {
    let dataToUpdate = {
      comment: data.comment,
      idStudent: student?.id,
      by: data.by,
      userRoleCreator: user?.role,
    };
    const resp = await StudentCommentsService.update(dataToUpdate, comment?.id || 0);
    handleResponse(resp);
  };

  const handleResponse = (resp: any) => {
    if (resp.status === 200) {
      toast.success(resp.message);
      //window.location.reload();
    } else {
      toast.error(resp.message);
    }
  };

  const fillForm = (comment: StudentComments) => {
    setValue('comment', comment.comment);
    setValue('by', comment.by);
  };

  const loadUserComment = async (id: number) => {
    setLoading(true);
    const resp = await UsersService.getUser(id);
    if (resp.status === 200) {
      setUserComment(resp.user);//this is the unique case where the response is an object with a user property
    }
    setLoading(false);
  };

  useEffect(() => {
    if (comment) {
      loadUserComment(comment.by);
    }
  }, [comment]);

  useEffect(() => {
    loadUser();
  }, []);

  useEffect(() => {
    if (mode === 'edit') {
      fillForm(comment || {} as StudentComments);
    }
  }, [mode]);

  return (
    <div className='student-comments'>
      <h1>Comentarios</h1>
      <h5><b>Alumno: </b>{student?.first_name + ' ' + student?.paternal_surname + ' ' + student?.maternal_surname}</h5>
      <div className="form">
        <div className="row mb-2">
          <div className="col-2">
            <button className='btn btn-secondary' onClick={() => navigate(`/student/overview/${student.id}`)} disabled={!student}>Volver</button>
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
