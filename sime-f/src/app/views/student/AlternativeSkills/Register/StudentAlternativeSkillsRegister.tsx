import { useNavigate, useParams } from "react-router-dom";
import "./StudentAlternativeSkillsRegister.scss";
import { useForm } from "react-hook-form";
import { StudentAlternativeSkills } from "../../../../interfaces/student/StudentAlternativeSkills";
import { useLoader } from "../../../../Global/Context/globalContext";
import { useEffect, useState } from "react";
import { Student } from "../../../../interfaces/student/Student";
import { StudentService } from "../../../../services/students/StudentsService";
import { studentsData } from "../../../../common/studentEnums";
import { StudentAlternativeSkillsService } from "../../../../services/students/StudentAlternativeSkillsService";
import { ToastContainer, toast } from "react-toastify";
import { CheckboxList } from "../../../../components/shared/FormInputs/CheckBox";

const StudentAlternativeSkillsRegister = () => {

  const { id } = useParams<{ id: string }>();
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<StudentAlternativeSkills & { [key: string]: any }>();
  const navigate = useNavigate();
  const { setLoading } = useLoader();

  const [studentAlternative, setStudentAlternative] = useState<Student>();

  const [back, setBack] = useState(Number);

  const loadStudent = async (studentId: number) => {
    setLoading(true);
    let resp = await StudentService.getStudent(studentId);
    console.log(resp);
    if (resp.status === 200) {
      setStudentAlternative(resp.student);
      setBack(studentId);
    } else {
      console.log(resp.status);
    }
    setLoading(false);
  };

  const handleCreate = async (data: any) => {
    setLoading(true);
    console.log(data);

    const selectedAlternativeSkills = studentsData.alternativeSkills
      .filter(skill => getValues(`alternativeSkills_${skill.value}`))
      .map(skill => skill.value);

    console.log(selectedAlternativeSkills);

    const resp = await StudentAlternativeSkillsService.register({ alternative_list: selectedAlternativeSkills }, studentAlternative?.id || 0);
    console.log(studentAlternative);
    console.log(resp);
    if (resp.status === 200) {
      navigate('/student/alternative/skills/overview/' + resp.students_alternative_skills.id);
    } else {
      toast.error(resp.status);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (!id) return;
    let studentId = parseInt(id);
    loadStudent(studentId);
  }, [id]);

  return (
    <div className="student-alternative">
      <h1>Registro de Habilidades Alternativas</h1>
      <div className="form">
        <div className="row mb-2">
          <div className="col-2">
            <button className='btn btn-secondary' onClick={() => navigate(`/student/overview/${back}`)}>Volver</button>
          </div>
        </div>
        <div className="row mb-2 mt-3">
          <hr />
        </div>
        <div className="container-fluid-mb-3 form-group">
          <div className="row mb-4">
            <div className="col-12">
              <CheckboxList
                items={studentsData.alternativeSkills.map(skill => ({ field: `alternativeSkills_${skill.value}`, label: skill.label }))}
                register={register}
                getValues={getValues}
                errors={errors}
                rules={{ required: 'Este campo es requerido' }}
              />
            </div>
          </div>
          <div className="row mb-2 mt-3">
            <hr />
          </div>
          <div className="row">
            <div className="col-8">
              <button className="btn btn-add xl" onClick={handleSubmit((data) => handleCreate(data))}>Registrar</button>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default StudentAlternativeSkillsRegister;
