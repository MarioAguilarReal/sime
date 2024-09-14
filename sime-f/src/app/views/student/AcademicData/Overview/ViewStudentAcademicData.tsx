import { useNavigate, useParams } from 'react-router-dom';
import { useLoader } from '../../../../Global/Context/globalContext';
import './ViewStudentAcademicData.scss'
import { useEffect, useState } from 'react';
import { StudentAcademicData } from '../../../../interfaces/student/StudentAcademicData';
import { StudentAcademicDataService } from '../../../../services/students/StudentAcademicDataService';
import { studentsData } from '../../../../common/studentEnums';
import { Student } from '../../../../interfaces/student/Student';
import { StudentService } from '../../../../services/students/StudentsService';

const ViewStudentAcademicData = () => {

  const { setLoading } = useLoader();
  const { id } = useParams();
  const navigate = useNavigate();

  const [studentData, setStudentData] = useState<StudentAcademicData>({} as StudentAcademicData);

  const [grade, setGrade] = useState<string>();
  const [group, setGroup] = useState<string>();
  const [behavior, setBehavior] = useState<string>();

  const [students, setStudents] = useState<Student>();

  const getStudent = async (dataId: number) => {
    setLoading(true);
    let resp = await StudentService.getAll();
    let returnStudent = resp.students.find((student: Student) => student.student_academic_data_id === dataId);
    console.log(returnStudent.id);
    if (resp.status === 200) {
      setStudents(returnStudent.id);
    }
    setLoading(false);
  }

  const loadStudentData = async (dataId: number) => {
    setLoading(true);
    let resp = await StudentAcademicDataService.get(dataId);
    console.log(resp);
    let grade = studentsData.grade.find(obj => obj.value === Number(resp.students_academic_data.grade_level));
    let group = studentsData.group.find(obj => obj.value === Number(resp.students_academic_data.group_id));
    let behavior = studentsData.conduct.find(obj => obj.value === Number(resp.students_academic_data.behavior));

    if (resp.status === 200) {
      setStudentData(resp.students_academic_data);
      setGrade(grade?.label);
      setGroup(group?.label);
      setBehavior(behavior?.label);
    } else {
      console.log(resp.status);
    }
    setLoading(false);
  }

  useEffect(() => {
    if (id) {
      let dataId = parseInt(id);
      loadStudentData(dataId);
      getStudent(dataId);
    }
  }, [id]);

  return (
    <div className="view-data">
      <h1>Información Academica</h1>
      <div className="form">
        <div className="row mb-2">
          <div className="col-2">
            <button className='btn btn-secondary' onClick={() => navigate(`/student/overview/${students}`)}>Volver</button>
          </div>
          <div className="col-4 btn-edit">
            <button className='btn' onClick={() => navigate(`/student/data/edit/${studentData.id}`)}>Editar Datos</button>
          </div>
        </div>
        <div className="row mb-2 mt-3">
          <hr />
        </div>
        <div className='container-fluid-mb-3 form-group'>
          <div className="row">
            <div className="col-4">
              <p><b>Matricula:</b> {studentData.student_id}</p>
            </div>
            <div className="col-4">
              <p><b>Grado:</b> {grade}</p>
            </div>
            <div className="col-4">
              <p><b>Grupo:</b> {group}</p>
            </div>
          </div>
          <div className="row">
            <div className="col-4">
              <p><b>Promedio Grado Anterior:</b> {studentData.last_grade_average}</p>
            </div>
            <div className="col-4">
              <p><b>Promedio Actual:</b> {studentData.actual_grade_average}</p>
            </div>
            <div className="col-4">
              <p><b>Comportamiento:</b> {behavior}</p>
            </div>
          </div>
          <div className="row">
            <div className="col-4">
              <p><b>Asistencia:</b> {studentData.attendance}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ViewStudentAcademicData;