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
	const [studentId, setStudentId] = useState<Student>({} as Student);


	const [usaer, setUsaer] = useState<string>();

	const loadStudentNeeds = async (dataId: number) => {
		setLoading(true);
		let resp = await StudentSpecialNeedsService.get(dataId);
		console.log(resp);
		let usaer = studentsData.booleanType.find(obj => obj.value === Number(resp.students_special_needs.usaer_status));

		if (resp.status === 200) {
			setStudentNeeds(resp.students_special_needs);
			setUsaer(usaer?.label);

			await findStudentId(resp.students_special_needs.id);
		} else {
			console.log(resp.status);
		}
		setLoading(false);
	}

	const findStudentId = async (specialNeedsId: number) => {
		let studentsResp = await StudentService.getAll();
		console.log(studentsResp);
		if (studentsResp.status === 200) {
			let student = studentsResp.students.find((student: Student) => student.student_special_needs_id === specialNeedsId);
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
			loadStudentNeeds(dataId);
		}
	}, [id]);

	return (
		<div className="view-needs">
			<h1>Necesidades Especiales</h1>
			<div className="form">
				<div className="row mb-2">
					<div className="col-2">
						<button className='btn btn-secondary' onClick={() => navigate(`/student/overview/${studentId.id}`)}>Volver</button>
					</div>
					<div className="col-4 btn-edit">
						<button className='btn btn-primary' onClick={() => navigate(`/student/need/edit/${studentNeeds.id}`)}>Editar Datos</button>
					</div>
				</div>
				<div className="row mb-2 mt-3">
					<hr className="border border-secondary border-1 opacity-75" />
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