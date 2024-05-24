import { useEffect, useState } from 'react';
import './ViewStudent.scss';
import { Student } from '../../../interfaces/student/Student';
import { useLoader } from '../../../Global/Context/globalContext';
import { StudentService } from '../../../services/students/StudentsService';
import { useNavigate, useParams } from 'react-router-dom';
import { generalData } from '../../../common/generalEnums';
import { studentsData } from '../../../common/studentEnums';
import { Link } from 'react-router-dom';
import DeleteModal from '../../../components/shared/modals/modalDelete/DeleteModal';

const ViewStudent = () => {

  const { setLoading } = useLoader();
  const { id } = useParams();
  const navigate = useNavigate();

  const [student, setStudent] = useState<Student>({} as Student);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);

  const [genderIndex, setGenderIndex] = useState<string>();
  const [civilIndex, setCivilIndex] = useState<string>();
  const [transportIndex, setTransportIndex] = useState<string>();

  const formatDate = (date: Date) => {
    let d = new Date(date);
    return d.getDate() + '-' + ((d.getMonth() + 1) < 10 ? `0${d.getMonth() + 1}` : d.getMonth() + 1) + '-' + d.getFullYear();
  }


  const loadStudent = async (studentId: number) => {
    setLoading(true);
    let resp = await StudentService.getStudent(studentId);
    let gender = generalData.gender.find(obj => obj.value === Number(resp.student.gender))
    let civil = generalData.civilStatus.find(obj => obj.value === Number(resp.student.civil_status))
    let trans = studentsData.transType.find(obj => obj.value === Number(resp.student.trans_type))

    if (resp.status === 200) {
      setStudent(resp.student);
      setGenderIndex(gender?.label);
      setCivilIndex(civil?.label);
      setTransportIndex(trans?.label);
    } else {
      console.log(resp.status);
    }
    setLoading(false);
  }

  const handleDelete = async (student: Student) => {
    setLoading(true);
    let resp = await StudentService.delete(Number(student.id));
    if (resp.status === 200) {
      navigate('/list/students');
    } else {
      console.log(resp.status);
    }
    setLoading(false);
    setShowDeleteModal(false);
  }


  useEffect(() => {
    if (id) {
      let studentId = parseInt(id);
      loadStudent(studentId);
    }
  }, [id]);

  return (
    <div className="view-student">
      <h1>Informacion del Estudiante</h1>
      <div className="form">
        <div className="row mb-2">
          <div className="col-2">
            <Link to="/list/students" className="btn btn-secondary">
              <i className="bi bi-chevron-left" />
              Volver
            </Link>
          </div>
          <div className="col-4 btn-edit">
            <button className='btn btn-primary' onClick={() => navigate(`/edit/student/${student.id}`)}>Editar Estudiante</button>
          </div>
          <div className="col-4">
            <button className='btn btn-danger' onClick={() => setShowDeleteModal(true)}>Eliminar Estudiante</button>
          </div>
        </div>
        <div className="row mb-2 mt-3">
          <hr className="border border-secondary border-1 opacity-75" />
        </div>
        <div className="container-fluid-mb-3 form-group">
          <div className="row g-5">
            <div className="col-6 personal-data">
              <div className="row">
                <h3>Datos Personales</h3>
                <hr className="border border-secondary border- opacity-75" />
              </div>
              <div className="image">
                <img src={student.photo} alt="student" className="student-photo" />
              </div>
              <hr className="border border-secondary border-1 opacity-75" />
              <p>
                <b>Nombre:</b> {student.first_name + " " + student.last_name}
              </p>
              <p>
                <b>Fecha de Nacimiento:</b> {formatDate(student.birth_date)}
              </p>
              <p>
                <b>Edad:</b> {new Date().getFullYear() - new Date(student.birth_date).getFullYear()}
              </p>
              <p>
                <b>Genero:</b> {genderIndex}
              </p>
              <p>
                <b>Direccion:</b> {student.address}
              </p>
              <p>
                <b>Estado Civil:</b> {civilIndex}
              </p>
              <p>
                <b>Tipo de Transporte:</b> {transportIndex}
              </p>
            </div>
            <div className="col-6 mb-4 tutor-data">
              <div className="row">
                <h3>Datos del Tutor</h3>
                <hr className="border border-secondary border- opacity-75" />
              </div>
              <p>
                <b>Nombre:</b> {student.tutor_name}
              </p>
              <p>
                <b>Edad:</b> {student.tutor_age}
              </p>
              <p>
                <b>Telefono:</b> {student.tutor_phone}
              </p>
              <p>
                <b>Email:</b> {student.tutor_email}
              </p>
              <p>
                <b>Dirección:</b> {student.tutor_address}
              </p>
            </div>
          </div>
          <div className="row mb-2 mt-3">
            <hr className="border border-secondary border-1 opacity-75" />
          </div>
          <div className="more-data row">
            <div className="academic-data col-4">
              <p className='btn btn-primary'>Datos Academicos</p>
            </div>
            <div className="learning-type col-4">
              <p className='btn btn-primary'>Tipo de Aprendizaje (SEP)</p>
            </div>
            <div className="special-needs col-4">
              <p className='btn btn-primary'>Necesidades Especiales</p>
            </div>
            <div className="cognitive-skills col-4">
              <p className='btn btn-primary'>Habilidades Cognitivas</p>
            </div>
            <div className="social-skills col-4">
              <p className='btn btn-primary'>Habilidades Sociales</p>
            </div>
            <div className="alternative-skills col-4">
              <p className='btn btn-primary'>Habilidades Alternativas</p>
            </div>
            <div className="planning-skills col-4">
              <p className='btn btn-primary'>Habilidades de Planificacion</p>
            </div>
          </div>
        </div>
      </div>
      {showDeleteModal && <DeleteModal obj="Estudiante" show={showDeleteModal} onClose={() => setShowDeleteModal(false)} onDelete={() => handleDelete(student)} />}
    </div>
  )
}

export default ViewStudent;