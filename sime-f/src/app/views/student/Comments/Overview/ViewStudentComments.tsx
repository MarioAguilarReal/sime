import { useNavigate, useParams } from 'react-router-dom';
import { useLoader } from '../../../../Global/Context/globalContext';
import './ViewStudentComments.scss';
import { useEffect, useState } from 'react';
import { StudentComments } from '../../../../interfaces/student/StudentComments';
import { StudentCommentsService } from '../../../../services/students/StudentCommentsService';
import { Student } from '../../../../interfaces/student/Student';
import { StudentService } from '../../../../services/students/StudentsService';

const ViewStudentComments = () => {

  const { setLoading } = useLoader();
  const { id } = useParams();
  const navigate = useNavigate();

  const [studentComments, setStudentNeeds] = useState<StudentComments>({} as StudentComments);
  const [studentId, setStudentId] = useState<Student>({} as Student);


  const loadStudentComments = async (studentId: number) => {
    setLoading(true);
    let resp = await StudentCommentsService.get(studentId);
    console.log(resp);
    if (resp.status === 200) {
      setStudentNeeds(resp.comments);

      await findStudentId(resp.comments.id);
    } else {
      console.log(resp.status);
    }
    setLoading(false);
  };

  const findStudentId = async (commentId: number) => {
    let studentsResp = await StudentService.getAll();
    console.log(studentsResp);
    if (studentsResp.status === 200) {
      let student = studentsResp.students.find((student: Student) => student.comments_id === commentId);
      console.log(student);
      if (student) {
        setStudentId(student);
        console.log(studentId.id);
      }
    }
  }

  useEffect(() => {
    if (id) {
      let dataId = parseInt(id);
      loadStudentComments(dataId);
    }
  }, [id]);

  return (
    <div className='view-comments'>
      <h1>Comentarios al Estudiante</h1>
      <div className="form">
        <div className="row mb-2">
          <div className="col-2">
            <button className='btn btn-secondary' onClick={() => navigate(`/student/overview/${studentId.id}`)}>Volver</button>
          </div>
          <div className="col-4 btn-edit">
            <button className='btn btn-primary' onClick={() => navigate(`/student/comments/edit/${studentComments.id}`)}>Editar Datos</button>
          </div>
        </div>
        <div className="row mb-2 mt-3">
          <hr className="border border-secondary border-1 opacity-75" />
        </div>
        <div className="container-fluid-mb-3 form-group">
          <div className="row">
            <div className="mr-3 text-end">
              <p>Por: {studentComments.by}</p>
            </div>
          </div>
          <div className="row">
            <div className="col-4">
              <label>Comentarios</label>
              <p>{studentComments.comment}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewStudentComments;