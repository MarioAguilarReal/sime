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
import { ToastContainer, toast } from 'react-toastify';
import TextField from '../../../../components/shared/FormInputs/TextField';

const StudentCommentsRegister = () => {

  const { id } = useParams<{ id: string }>();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<StudentComments>();
  const navigate = useNavigate();
  const { setLoading } = useLoader();

  const [studentComments, setStudentComments] = useState<Student>();
  const [userComments, setUserComments] = useState<User>();

  const loadUser = async () => {
    let user = sessionStorage.getItem('user');
    console.log(user);
    if (user) {
      let userObj = JSON.parse(user);
      console.log(userObj);
      setUserComments(userObj);
    } else {
      console.log('not user');
    }
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
    formData.append('by', userComments?.first_name + ' ' + userComments?.last_name);
    formData.append('userRoleCreator', userComments?.role.toString() || '');
    formData.append('idStudent', studentComments?.id?.toString() || '');

    console.log(formData);
    const resp = await StudentCommentsService.register(formData, studentComments?.id || 0);
    console.log(studentComments);
    console.log(resp);
    if (resp.status === 200) {
      toast.success(resp.message);
      if (resp.comments)
        navigate('/student/comments/overview/' + resp.comments.id);
    } else {
      toast.error(resp.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadUser();
  }, []);

  useEffect(() => {
    if (!id) return;
    let studentId = parseInt(id);
    loadStudent(studentId);
  }, [id]);

  return (
    <div className='student-comments'>
      <h1>Agregar Comentario</h1>
      <div className='form'>
        <div className="row mb-2">
          <div className="col-4 btn-edit">
            <button className='btn btn-secondary' onClick={() => navigate(`/student/overview/${studentComments?.id}`)}>Volver</button>
          </div>
        </div>
        <div className="row mb-2 mt-3">
          <hr className="border border-secondary border-1 opacity-75" />
        </div>
        <div className='container-fluid-mb-3 form-group'>
          <div className="mb-4">
            <TextField
              label={'Comentario'}
              field={'comment'}
              register={register}
              type='text'
              rules={{ required: 'Este campo es requerido' }}
              errors={errors}
              multiLine={true}
            />
          </div>
          <div className="row mb-2 mt-3">
            <hr className="border border-secondary border-1 opacity-75" />
          </div>
          <div className="row">
            <div className="col-8">
              <button className="btn btn-primary xl" onClick={handleSubmit((data) => handleCreate(data))}>Añadir Comentario</button>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default StudentCommentsRegister;