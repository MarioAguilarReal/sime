import { useParams } from "react-router-dom";
import { useLoader } from "../../../Global/Context/globalContext";
import { useEffect, useState } from "react";
import './ViewStudentSpecialNeeds.scss'
import { Student } from "../../../interfaces/student/Student";
import { StudentService } from "../../../services/students/StudentsService";
import SpecialNeedsForm from "./specialNeeds/SpecialNeedsForm";

const ViewStudentSpecialNeeds = () => {

	const { setLoading } = useLoader();
	const { id } = useParams();
	const [student, setStudent] = useState<Student>();

	const getStudent = async (dataId: number) => {
		setLoading(true);
		let resp = await StudentService.getStudent(dataId);
		if (resp.status === 200) {
			setStudent(resp.data);
		}
		setLoading(false);
	};

	useEffect(() => {
		if (id) {
			getStudent(+id);
		}
	}, [id]);

	return (
		<div>
			{!student?.special_needs ? (
				<SpecialNeedsForm mode="register" studentId={student?.id} />
			) : (
				<SpecialNeedsForm mode="edit" needsId={student.special_needs} studentId={student.id} />
			)}
		</div>
	);
}

export default ViewStudentSpecialNeeds;
