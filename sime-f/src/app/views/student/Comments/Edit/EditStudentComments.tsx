import { useNavigate, useParams } from 'react-router-dom';
import './EditStudentComments.scss';
import { useForm } from 'react-hook-form';
import { StudentComments } from '../../../../interfaces/student/StudentComments';
import { useLoader } from '../../../../Global/Context/globalContext';
import { useEffect, useState } from 'react';
import { StudentCommentsService } from '../../../../services/students/StudentCommentsService';
import { ToastContainer } from 'react-toastify';
import TextField from '../../../../components/shared/FormInputs/TextField';
import { User } from '../../../../interfaces/user/User';

const EditStudentComments = () => {

  const { id } = useParams<{ id: string }>();
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    getValues,
    setValue
  } = useForm<StudentComments>();

  const navigate = useNavigate();
  const { setLoading } = useLoader();

  const [studentComment, setStudentComment] = useState<StudentComments>();
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

  const loadStudentComment = async (dataId: number) => {
    setLoading(true);
    let resp = await StudentCommentsService.get(dataId);
    console.log(resp);

    if (resp.status === 200) {
      setStudentComment(resp.comments);
    } else {
      console.log(resp.status);
    }
    setLoading(false);
  }

  const handleUpdateComment = async (data: StudentComments) => {
    setLoading(true);
    console.log(data);
    const formData = new FormData();
    formData.append('comment', data.comment);
    formData.append('by', userComments?.first_name + ' ' + userComments?.last_name);
    formData.append('userRoleCreator', userComments?.role.toString() || '');
    formData.append('idStudent', studentComment?.id?.toString() || '');

    const resp = await StudentCommentsService.update(formData, studentComment?.id || 0);
    console.log(resp);
    if (resp.status === 200) {
      navigate("/student/comments/overview/" + resp.comments.id);
    } else {
      console.log(resp.status);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadUser();
  }, []);

  useEffect(() => {
    if (id) {
      let dataId = parseInt(id);
      loadStudentComment(dataId);
    }

  }, [id]);

  useEffect(() => {
    if (studentComment) {
      setValue('comment', studentComment.comment);
    }
  }, [studentComment]);

  return (
    <div className='edit-comments'>
      <h1>Editar Comentario</h1>
      <div className="form">
        <div className="row mb-2">
          <div className="col-4 btn-edit">
            <button className='btn btn-secondary' onClick={() => navigate(`/student/comments/overview/${studentComment?.id}`)}>Volver</button>
          </div>
        </div>
        <div className="row mb-2 mt-3">
          <hr className="border border-secondary border-1 opacity-75" />
        </div>
        <div className="container-fluid-mb-3 form-group">
          <div className="row mb-4">
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
              <button className="btn btn-primary xl" onClick={handleSubmit((data) => handleUpdateComment(data))}>Editar</button>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default EditStudentComments;