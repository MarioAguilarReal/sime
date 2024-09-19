import { useNavigate, useParams } from 'react-router-dom';
import './ViewStudentComments.scss';
import { useForm } from 'react-hook-form';
import { StudentComments } from '../../../interfaces/student/StudentComments';
import { useLoader } from '../../../Global/Context/globalContext';
import { useEffect, useState } from 'react';
import { Student } from '../../../interfaces/student/Student';
import { User } from '../../../interfaces/user/User';
import { StudentService } from '../../../services/students/StudentsService';
import { StudentCommentsService } from '../../../services/students/StudentCommentsService';

const ViewStudentComments = () => {

  const { id } = useParams<{ id: string }>();
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
    watch
  } = useForm<StudentComments>();
  const navigate = useNavigate();
  const { setLoading } = useLoader();

  const [student, setStudent] = useState<Student>();
  const [studentComment, setStudentComment] = useState<StudentComments>();
  const [user, setUser] = useState<User>();

  const [back, setBack] = useState(Number);

  const loadUser = async () => {
    let user = sessionStorage.getItem('user');
    setUser(user ? JSON.parse(user) : null);
  };

  const loadStudent = async (studentId: number) => {
    setLoading(true);
    let resp = await StudentService.getStudent(studentId);
    if (resp.status === 200) {
      setStudent(resp.student);
      setBack(studentId);
    } else {
      console.log(resp.status);
    }
    setLoading(false);
  };

  const handleCreate = async (data: StudentComments) => {
    setLoading(false);
    const formData = new FormData();
    formData.append('comment', data.comment);
    formData.append('idStudent', student?.id?.toString() || '');
    formData.append('by', user?.first_name + ' ' + user?.paternal_surname + ' ' + user?.paternal_surname || '');
    formData.append('userRoleCreator', user?.role?.toString() || '');

    console.log(formData);
    const resp = await StudentCommentsService.register(formData, student?.id || 0);
    if (resp.status === 200) {
      setLoading(false);
      window.location.reload();
    } else {
      setLoading(false);
    }
  };

  const loadComment = async (commentsId: number) => {
    setLoading(true);
    console.log(commentsId);
    let resp = await StudentCommentsService.get(commentsId);
    if (resp.status === 200) {
      console.log(resp.comments);
      setStudentComment(resp.comments);
    } else {
      console.log(resp.status);
    }
    setLoading(false);
  };

  const handleUpdateComment = async (data: StudentComments) => {
    setLoading(true);
    console.log(data);
    const formData = new FormData();
    formData.append('comment', data.comment);
    formData.append('by', data.by);
    formData.append('userRoleCreator', user?.role?.toString() || '');
    formData.append('idStudent', student?.id?.toString() || '');

    console.log(formData);
    console.log(studentComment?.id);
    const resp = await StudentCommentsService.update(formData, studentComment?.id || 0);
    if (resp.status === 200) {
      setLoading(false);
      window.location.reload();
    } else {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!id) return;
    let studentId = parseInt(id);
    loadStudent(studentId);
    loadUser();
  }, [id]);

  useEffect(() => {
    if (student && typeof student.comments_id === 'number' && student.comments_id >= 0) {
      loadComment(student.comments_id);
    }
  }, [student]);

  useEffect(() => {
    if (studentComment) {
      console.log(studentComment);
      setValue('comment', studentComment.comment);
      setValue('by', studentComment.by);
    }
  }, [studentComment]);

  return (
    <div className='student-comments'>
      <h1>Comentarios</h1>
      <h5><b>Alumno: </b>{student?.first_name + ' ' + student?.paternal_surname + ' ' + student?.maternal_surname}</h5>
      <div className="form">
        <div className="row mb-2">
          <div className="col-2">
            <button className='btn btn-secondary' onClick={() => navigate(`/student/overview/${back}`)}>Volver</button>
          </div>
        </div>
        <div className="row mb-2 mt-3">
          <hr />
        </div>
        <div className='container-fluid-mb-3 form-group'>
          {!student?.comments_id ?
            <div>
              <h6>¡Aún no hay comatarios, agrega uno!</h6>
              <form onSubmit={handleSubmit(handleCreate)}>
                <div className="form-floating">
                  <textarea className="form-control comment" placeholder="Comentario" {...register('comment', { required: true })} />
                  <label>Comentario</label>
                  {errors.comment && <span className="text-danger">Este campo es requerido</span>}
                </div>
                <div className="row mb-2 mt-3">
                  <hr />
                </div>
                <div className="row">
                  <div className="col-8">
                    <button type="submit" className="btn btn-comment xl">Agregar</button>
                  </div>
                </div>
              </form>
            </div>
            :
            <div>
              <div className="form-floating">
                <textarea className="form-control comment" placeholder="Comentario" {...register('comment')}></textarea>
                <label>Comentario</label>
              </div>
              <div className="row mb-2 mt-3">
                <hr />
              </div>
              <div className="row">
                <div className="col-8">
                  <button className="btn btn-comment xl" onClick={handleSubmit((data) => handleUpdateComment(data))}>Actualizar</button>
                </div>
              </div>
            </div>
          }
        </div>
      </div>
    </div>
  );
}

export default ViewStudentComments;