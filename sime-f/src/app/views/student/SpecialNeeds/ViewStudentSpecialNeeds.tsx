import { useParams } from "react-router-dom";
import { useLoader } from "../../../Global/Context/globalContext";
import { useEffect, useState } from "react";
import './ViewStudentSpecialNeeds.scss'
import { Student } from "../../../interfaces/student/Student";
import { StudentService } from "../../../services/students/StudentsService";
import SpecialNeedsForm from "../../../components/shared/StudentsForms/specialNeeds/SpecialNeedsForm";

const ViewStudentSpecialNeeds = () => {

	const { setLoading } = useLoader();
	const { id } = useParams();
	const [student, setStudent] = useState<Student>();

	const getStudent = async (dataId: number) => {
		setLoading(true);
		let resp = await StudentService.getStudent(dataId);
		if (resp.status === 200) {
			setStudent(resp.student);
		}
		setLoading(false);
	};

	useEffect(() => {
		if (id) {
			let dataId = parseInt(id);
			getStudent(dataId);
		}
	}, [id]);

	return (
		<div>
			{!student?.student_special_needs_id ? (
				<SpecialNeedsForm mode="register" needsId={student?.id} studentId={student?.id} />
			) : (
				<SpecialNeedsForm mode="edit" needsId={student.student_special_needs_id} studentId={student.id} />
			)}
		</div>
	);
}

export default ViewStudentSpecialNeeds;