import { useParams } from "react-router-dom";
import StudentForm from "../../../components/shared/StudentsForms/formManagement/StudentForm";

const StudentManagement = () => {
  const { id } = useParams();

  return (
    <div>
      {id ? (<StudentForm mode="edit" studentId={id} />)
        :
        (<StudentForm mode="register" studentId={null} />)}
    </div>
  );
};

export default StudentManagement;