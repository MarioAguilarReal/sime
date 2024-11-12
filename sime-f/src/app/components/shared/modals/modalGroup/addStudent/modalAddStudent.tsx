import { Student } from '../../../../../interfaces/student/Student';
import './modalAddStudent.scss';
import { useNavigate } from 'react-router-dom';
import { StudentAcademicDataService } from '../../../../../services/students/StudentAcademicDataService';

interface AddStudentToGroupProps {
  show: boolean;
  studentsList: Student[];
  group: number;
  grade: number;
  onClose: () => void;
  updateStudents: (student: Student) => void;
}

const ModalAddStudentToGroup = (props: AddStudentToGroupProps) => {
  const { show, studentsList, group, grade, onClose, updateStudents } = props;
  const navigate = useNavigate();

  const changeGroup = async (student: Student) => {
    const data = student.student_academic_data;
    if (data) {
      const updateData = {
        ...data,
        grade_level: grade,
        group_id: group
      };

      try {
        console.log(updateData);
        const resp = await StudentAcademicDataService.update(updateData, data.id as number);
        if (resp.status === 200) {
          updateStudents(student);
          onClose();
        } else {
          console.log(resp.message);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  if (!show) return null;
  return (
    <div className='modal-add-student'>
      <div className="modal-content">
        <div className="modal-header">
          <div className="modal-title">
            <h2>Agregar Alumno al Grupo</h2>
          </div>
          <button className="btn-close-modal" onClick={onClose}>
            <i className="bi bi-x"></i> Cerrar
          </button>
        </div>
        <div className="select-students">
          {studentsList.map((students, index) => (
            students.student_academic_data?.grade_level === grade && students.student_academic_data.group_id === group ? null :
              <div key={index} className="student">
                <div className="student-info">
                  <h5>{students.first_name} {students.paternal_surname} {students.maternal_surname}</h5>
                </div>
                {!students.student_academic_data ?
                  <button className="btn btn-add-data" onClick={() => {
                    navigate(`/student/data/overview/${students.id}`);
                  }}>
                    <i className={`bi bi-plus`}></i>&nbsp;{'Agregar Datos'}
                  </button>
                  :
                  <button className="btn btn-add" onClick={() => changeGroup(students)}>
                    <i className={`bi bi-plus`}></i>&nbsp;{'Agregar'}
                  </button>
                }
              </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ModalAddStudentToGroup;