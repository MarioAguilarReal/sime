import { useNavigate, useParams } from "react-router-dom";
import { useLoader } from "../../../../Global/Context/globalContext";
import { useEffect, useState } from "react";
import { StudentSpecialNeeds } from "../../../../interfaces/student/StudentSpecialNeeds";
import { StudentSpecialNeedsService } from "../../../../services/students/StudentSpecialNeedsService";
import { studentsData } from "../../../../common/studentEnums";
import './ViewStudentSpecialNeeds.scss'
import { Student } from "../../../../interfaces/student/Student";
import { StudentService } from "../../../../services/students/StudentsService";

const ViewStudentSpecialNeeds = () => {

	const { setLoading } = useLoader();
	const { id } = useParams();
	const navigate = useNavigate();

	const [studentNeeds, setStudentNeeds] = useState<StudentSpecialNeeds>({} as StudentSpecialNeeds);

	const [usaer, setUsaer] = useState<string>();

	const [student, setStudent] = useState<Student>();

	const getStudent = async (dataId: number) => {
		setLoading(true);
		let resp = await StudentService.getAll();
		let returnStudent = resp.students.find((student: Student) => student.student_special_needs_id === dataId);
		if (resp.status === 200) {
			setStudent(returnStudent.id);
		}
		setLoading(false);
	}

	const loadStudentNeeds = async (dataId: number) => {
		setLoading(true);
		let resp = await StudentSpecialNeedsService.get(dataId);
		console.log(resp);
		let usaer = studentsData.booleanType.find(obj => obj.value === Number(resp.students_special_needs.usaer_status));

		if (resp.status === 200) {
			setStudentNeeds(resp.students_special_needs);
			setUsaer(usaer?.label);
		} else {
			console.log(resp.status);
		}
		setLoading(false);
	}

	useEffect(() => {
		if (id) {
			let dataId = parseInt(id);
			loadStudentNeeds(dataId);
			getStudent(dataId);
		}
	}, [id]);

	return (
		<div className="view-needs">
			<h1>Necesidades Especiales</h1>
			<div className="form">
				<div className="row mb-2">
					<div className="col-2">
						<button className='btn btn-secondary' onClick={() => navigate(`/student/overview/${student}`)}>Volver</button>
					</div>
					<div className="col-4 btn-edit">
						<button className='btn btn-primary' onClick={() => navigate(`/student/need/edit/${studentNeeds.id}`)}>Editar Datos</button>
					</div>
				</div>
				<div className="row mb-2 mt-3">
					<hr />
				</div>
				<div className="container-fluid-mb-3 form-group">
					<div className="row">
						<div className="col-4">
							<label>¿El alumno asiste a USAER?</label>
							<p>{usaer}</p>
						</div>
						<div className="col-4">
							<label>Problemas de aprendizaje:</label>
							<p>{studentNeeds.learning_problems}</p>
						</div>
						<div className="col-4">
							<label>Enfermedades:</label>
							<p>{studentNeeds.diseases}</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default ViewStudentSpecialNeeds;