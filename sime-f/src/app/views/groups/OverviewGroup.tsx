import { useEffect, useState } from "react";
import "./OverviewGroup.scss";
import { Group } from "../../interfaces/school/Group";
import { Student } from "../../interfaces/student/Student";
import { Classe } from "../../interfaces/school/Classe";
import { useNavigate, useParams } from "react-router-dom";
import { useLoader } from "../../Global/Context/globalContext";
import { GroupsService } from "../../services/school/GroupsService";
import { StudentService } from "../../services/students/StudentsService";
import { studentsData } from "../../common/studentEnums";
import { User } from "../../interfaces/user/User";
import { UsersService } from "../../services/users/UsersService";
import { toast } from "react-toastify";
import ModalAddStudentToGroup from "../../components/shared/modals/modalGroup/addStudent/modalAddStudent";

const OverviewGroup = () => {
  const { setLoading } = useLoader();
  const navigate = useNavigate();
  const { id } = useParams();
  const [group, setGroup] = useState<Group | null>(null);
  const [students, setStudent] = useState<Student[]>([]);
  const [subjects, setSubjects] = useState<Classe[]>([]);
  const [studentGroup, setStudentGroup] = useState<Student[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [filteredStudents, setFilteredStudents] = useState<Student[]>([]);

  const loadGroup = async (groupId: number) => {
    setLoading(true);
    let resp = await GroupsService.getGroup(groupId);
    if (resp.status === 200) {
      setGroup(resp.data);
      setSubjects(resp.data.subjects);
    } else {
      toast.error("Error al cargar el grupo");
    }
    setLoading(false);
  }

  const loadStudentsByGroup = async () => {
    setLoading(true);
    let resp = await StudentService.getAll();
    if (resp.status === 200) {
      setStudent(resp.data);
    } else {
      toast.error("Error al cargar estudiantes");
    }
    // let resp2 = await StudentAcademicDataService.getAll();
    // if (resp2.status === 200) {
    //   setAcademicData(resp2.students_academic_data);
    // } else {
    // }
    let resp3 = await UsersService.getUsers();
    if (resp3.status === 200) {
      setUsers(resp3.users);
    } else {
      toast.error("Error al cargar usuarios");
    }
    setLoading(false);
  }

  const studentsGroup = async () => {
    if (group && students) {
      let studentG = students.filter(student => student.student_academic_data?.group_id === group.group && student.student_academic_data.grade_level === group.grade);
      setStudentGroup(studentG);
    } else {
      toast.error("No se ha podido cargar los estudiantes del grupo");
    }
  }

  const addStudent = async () => {
    const ungroupedStudents = students.filter(
      student => !studentGroup.some(s => s.id === student.id)
    );
    setFilteredStudents(ungroupedStudents);
    setShowModal(true);
  }

  useEffect(() => {
    if (id) {
      loadGroup(+id);
      loadStudentsByGroup();
    }
  }, [id]);

  useEffect(() => {
    if (students) {
      studentsGroup();
    }
  }, [students]);


  return (
    <div className="view-group">
      <h1>Grupo {group?.grade !== undefined ? studentsData.grade[group.grade - 1].label : "No definido"} {group?.group !== undefined ? studentsData.group[group.group - 1].label : "No definido"}</h1>
      <h4>Tutor: {users.filter(user => user.id === group?.user_id).map(user => `${user.first_name} ${user.paternal_surname} ${user.maternal_surname}`).join(', ')}</h4>
      <div className="container">
        <div className="students-list">
          <div className="content-btn">
            <h2>Estudiantes</h2>
            <button className="btn btn-add" onClick={() => addStudent()}>
              <i className={`bi bi-plus`}></i>&nbsp;{'Agregar Alumno'}
            </button>
          </div>
          <div className="row mb-2 mt-3">
            <hr />
          </div>
          <div className="row">
            <div className="col-12">
              <table className="table table-striped">
                <thead>
                  <tr className="table-secondary">
                    <th>Nombre</th>
                    <th>Apellidos</th>
                    <th>Edad</th>
                    <th>Ver</th>
                  </tr>
                </thead>
                <tbody>
                  {studentGroup.map((student, index) => {
                    return (
                      <tr key={index}>
                        <td>{student.first_name}</td>
                        <td>{student.paternal_surname + " " + student.maternal_surname}</td>
                        <td>{student.age}</td>
                        <td>
                          <button
                            className="btn btn-outline-primary me-2"
                            onClick={() => navigate(`/student/overview/${student.id}`)}
                          >
                            <i className="bi bi-eye"></i>
                          </button>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="subjects-list">
          <h2>Materias</h2>
          <div className="row mb-2 mt-3">
            <hr />
          </div>
          <div className="row">
            <div className="col-12">
              <table className="table table-striped">
                <thead>
                  <tr className="table-secondary">
                    <th>Nombre</th>
                    <th>Docente</th>
                  </tr>
                </thead>
                <tbody>
                  {subjects?.length && users?.length ? (
                    subjects.map((subject, index) => {
                      const user = users.find(user => Number(user.id) === Number(subject.user_id));
                      return (
                        <tr key={index}>
                          <td>{subject.name}</td>
                          <td>
                            {user ? `${user.first_name} ${user.paternal_surname} ${user.maternal_surname}` : "No docente asignado"}
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="comments">
          <h2>Comentarios</h2>
          <div className="row mb-2 mt-3">
            <hr />
          </div>
          <div className="row">
            <div className="col-12">
              <p>{group?.comments}</p>
            </div>
          </div>
        </div>
      </div>
      <ModalAddStudentToGroup
        show={showModal}
        studentsList={filteredStudents}
        group={group?.group as number}
        grade={group?.grade as number}
        onClose={() => setShowModal(false)}
        updateStudents={(student) => setStudentGroup([...studentGroup, student])}
      />
    </div>
  );
};

export default OverviewGroup;
