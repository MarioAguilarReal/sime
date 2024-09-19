import { useEffect, useState } from "react";
import "./ViewStudent.scss";
import { Student } from "../../../interfaces/student/Student";
import { useLoader } from "../../../Global/Context/globalContext";
import { StudentService } from "../../../services/students/StudentsService";
import { useNavigate, useParams } from "react-router-dom";
import { generalData } from "../../../common/generalEnums";
import { studentsData } from "../../../common/studentEnums";
import { Link } from "react-router-dom";
import DeleteModal from "../../../components/shared/modals/modalDelete/DeleteModal";

const ViewStudent = () => {
  const { setLoading } = useLoader();
  const { id } = useParams();
  const navigate = useNavigate();

  const [student, setStudent] = useState<Student>({} as Student);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);

  const [genderIndex, setGenderIndex] = useState<string>();
  const [civilIndex, setCivilIndex] = useState<string>();
  const [transportIndex, setTransportIndex] = useState<string>();
  const [liveStudent, setLiveStudent] = useState<string>();

  const formatDate = (date: Date) => {
    let d = new Date(date);
    return (
      d.getDate() +
      "-" +
      (d.getMonth() + 1 < 10 ? `0${d.getMonth() + 1}` : d.getMonth() + 1) +
      "-" +
      d.getFullYear()
    );
  };

  const loadStudent = async (studentId: number) => {
    setLoading(true);
    let resp = await StudentService.getStudent(studentId);
    let gender = generalData.gender.find(
      (obj) => obj.value === Number(resp.student.gender)
    );
    let civil = generalData.civilStatus.find(
      (obj) => obj.value === Number(resp.student.civil_status)
    );
    let trans = studentsData.transType.find(
      (obj) => obj.value === Number(resp.student.trans_type)
    );
    let live = studentsData.booleanType.find(
      (obj) => obj.value === Number(resp.student.tutor_live_student)
    );

    if (resp.status === 200) {
      setStudent(resp.student);
      setGenderIndex(gender?.label);
      setCivilIndex(civil?.label);
      setTransportIndex(trans?.label);
      setLiveStudent(live?.label);
    } else {
      console.log(resp.status);
    }
    setLoading(false);
  };

  const handleDelete = async (student: Student) => {
    setLoading(true);
    let resp = await StudentService.delete(Number(student.id));
    if (resp.status === 200) {
      navigate("/list/students");
    } else {
      console.log(resp.status);
    }
    setLoading(false);
    setShowDeleteModal(false);
  };

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
        <div className="header">
          <Link to="/list/students" className="btn-back">
            <i className="bi bi-chevron-left" />
            Volver
          </Link>
          <div className="buttons">
            <button
              className="btn-edit"
              onClick={() => navigate(`/edit/student/${student.id}`)}
            >
              <i className="bi bi-pencil" />
              Editar Estudiante
            </button>
            <button
              className="btn-delete"
              onClick={() => setShowDeleteModal(true)}
            >
              <i className="bi bi-trash" />
              Eliminar Estudiante
            </button>
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
                <img
                  src={student.photo ? student.photo : "/assets/images/default-user.jpg"}
                  alt="student"
                  className="student-photo"
                />
              </div>
              <hr className="border border-secondary border-1 opacity-75" />
              <p>
                <b>Nombre:</b> {student.first_name + " " + student.last_name}
              </p>
              <p>
                <b>Fecha de Nacimiento:</b> {formatDate(student.birth_date)}
              </p>
              <p>
                <b>Edad:</b>{" "}
                {new Date().getFullYear() -
                  new Date(student.birth_date).getFullYear()}
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
              <p>
                <b>Lugar de nacimiento:</b> {student.birth_place}
              </p>
              <p>
                <b>Nacionalidad:</b> {student.nationality}
              </p>
              <p>
                <b>CURP:</b> {student.curp}
              </p>
              <p>
                <b>Tiempo estimado de la escuela a la casa:</b>{" "}
                {student.transport_time}
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
              <p>
                <b>Fecha de nacimiento:</b>{" "}
                {new Date().getFullYear() -
                  new Date(student.tutor_birth_date).getFullYear()}
              </p>
              <p>
                <b>Ocupación:</b> {student.tutor_occupation}
              </p>
              <p>
                <b>Grado cursado:</b> {student.tutor_schooling}
              </p>
              <p>
                <b>¿Vive con el alumno?:</b> {liveStudent}
              </p>
              <p>
                <b>CURP:</b> {student.tutor_curp}
              </p>
              <div className="row">
                <h3>Contactos de Emergencia</h3>
                <hr className="border border-secondary border- opacity-75" />
              </div>
              <p>
                <b>Nombre 1:</b> {student.emergency_contact_name_1}
              </p>
              <p>
                <b>Teléfono 1:</b> {student.emergency_contact_phone_1}
              </p>
              <p>
                <b>Parentesco con el alumno:</b>{" "}
                {student.emergency_contact_relationship_1}
              </p>
              <p>
                <b>Nombre 2:</b> {student.emergency_contact_name_2}
              </p>
              <p>
                <b>Teléfono 2:</b> {student.emergency_contact_phone_2}
              </p>
              <p>
                <b>Parentesco con el alumno:</b>{" "}
                {student.emergency_contact_relationship_2}
              </p>
            </div>
          </div>
          <div className="row mb-2 mt-3">
            <hr className="border border-secondary border-1 opacity-75" />
          </div>
          <div className="more-data">
            <div className="row">
              <div className="add-comments col-4">
                <button
                  className="btn btn-more"
                  onClick={() => {
                    navigate(`/student/comments/${student.id}`);
                  }}
                >
                  Agregar Comentario
                </button>
              </div>
              <div className="academic-data col-4">
                <button
                  className="btn btn-more"
                  onClick={() => {
                    if (student.student_academic_data_id) {
                      navigate(
                        `/student/data/overview/${student.student_academic_data_id}`
                      );
                    } else {
                      navigate(`/student/data/register/${student.id}`);
                    }
                  }}
                >
                  Datos Academicos
                </button>
              </div>
              <div className="learning-type col-4">
                <p className="btn btn-more">Tipo de Aprendizaje (SEP)</p>
              </div>
            </div>
            <div className="row mb-2">
              <div className="special-needs col-4">
                <button
                  className="btn btn-more"
                  onClick={() => {
                    if (student.student_special_needs_id) {
                      console.log(student.student_special_needs_id);
                      navigate(
                        `/student/need/overview/${student.student_special_needs_id}`
                      );
                    } else {
                      console.log(student.student_special_needs_id);
                      navigate(`/student/need/register/${student.id}`);
                    }
                  }}
                >
                  Necesidades Especiales
                </button>
              </div>
              <div className="cognitive-skills col-4">
                <button
                  className="btn btn-more"
                  onClick={() => {
                    if (student.student_cognitive_skills_id) {
                      console.log(student.student_cognitive_skills_id);
                      navigate(
                        `/student/cognitive/skills/overview/${student.student_cognitive_skills_id}`
                      );
                    } else {
                      console.log(student.student_cognitive_skills_id);
                      navigate(
                        `/student/cognitive/skills/register/${student.id}`
                      );
                    }
                  }}
                >
                  Habilidades Cognitivas
                </button>
              </div>
              <div className="social-skills col-4">
                <button
                  className="btn btn-more"
                  onClick={() => {
                    if (student.student_social_skills_id) {
                      console.log(student.student_social_skills_id);
                      navigate(
                        `/student/social/skills/overview/${student.student_social_skills_id}`
                      );
                    } else {
                      console.log(student.student_cognitive_skills_id);
                      navigate(`/student/social/skills/register/${student.id}`);
                    }
                  }}
                >
                  Habilidades Sociales
                </button>
              </div>
            </div>
            <div className="row mb-2">
              <div className="alternative-skills col-4">
                <button
                  className="btn btn-more"
                  onClick={() => {
                    if (student.student_alternative_skills_id) {
                      console.log(student.student_alternative_skills_id);
                      navigate(
                        `/student/alternative/skills/overview/${student.student_alternative_skills_id}`
                      );
                    } else {
                      console.log(student.student_cognitive_skills_id);
                      navigate(
                        `/student/alternative/skills/register/${student.id}`
                      );
                    }
                  }}
                >
                  Habilidades Alternativas
                </button>
              </div>
              <div className="planning-skills col-4">
                <button
                  className="btn btn-more"
                  onClick={() => {
                    if (student.student_planning_skills_id) {
                      console.log(student.student_planning_skills_id);
                      navigate(
                        `/student/planning/skills/overview/${student.student_planning_skills_id}`
                      );
                    } else {
                      console.log(student.student_cognitive_skills_id);
                      navigate(
                        `/student/planning/skills/register/${student.id}`
                      );
                    }
                  }}
                >
                  Habilidades de Planificación
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showDeleteModal && (
        <DeleteModal
          obj="Estudiante"
          show={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          onDelete={() => handleDelete(student)}
        />
      )}
    </div>
  );
};

export default ViewStudent;
