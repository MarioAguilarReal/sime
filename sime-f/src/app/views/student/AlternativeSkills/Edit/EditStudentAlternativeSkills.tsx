import { useNavigate, useParams } from "react-router-dom";
import "./EditStudentAlternativeSkills.scss";
import { useForm } from "react-hook-form";
import { StudentAlternativeSkills } from "../../../../interfaces/student/StudentAlternativeSkills";
import { useLoader } from "../../../../Global/Context/globalContext";
import { useEffect, useState } from "react";
import { StudentAlternativeSkillsService } from "../../../../services/students/StudentAlternativeSkillsService";
import { ToastContainer, toast } from "react-toastify";
import { studentsData } from './../../../../common/studentEnums';
import { CheckboxList } from "../../../../components/shared/FormInputs/CheckBox";

const EditStudentAlternativeSkills = () => {

  const { id } = useParams<{ id: string }>();
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
    getValues,
  } = useForm<StudentAlternativeSkills & { [key: string]: any }>();
  const navigate = useNavigate();
  const { setLoading } = useLoader();

  const [studentSkills, setStudentSkills] = useState<StudentAlternativeSkills>();

  const loadStudent = async (studentId: number) => {
    setLoading(true);
    let resp = await StudentAlternativeSkillsService.get(studentId);
    if (resp.status === 200) {
      setStudentSkills(resp.students_alternative_skills);
    } else {
      toast.error(resp.status);
    }
    setLoading(false);
  };

  const handleUpdateStudent = async (data: any) => {
    setLoading(true);

    const selectedAlternativeSkills = studentsData.alternativeSkills
      .filter(skill => getValues(`alternativeSkills_${skill.value}`))
      .map(skill => skill.value);

    console.log(selectedAlternativeSkills);

    const resp = await StudentAlternativeSkillsService.update({ alternative_list: selectedAlternativeSkills }, studentSkills?.id || 0);
    console.log(resp);
    if (resp.status === 200) {
      navigate("/student/alternative/skills/overview/" + resp.students_alternative_skills.id);
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

  useEffect(() => {
    if (studentSkills && studentSkills.alternative_list) {
      studentSkills.alternative_list.forEach((skillId: number) => {
        setValue(`alternativeSkills_${skillId}`, true);
      });
    }
  }, [studentSkills, setValue]);

  return (
    <div className="edit-skills">
      <h1>Editar Habilidades Alternativas del Estudiante</h1>
      <div className="form">
        <div className='container-fluid-mb-3 form-group'>
          <div className="row mb-2">
            <div className="col-2">
              <div className="col-4 btn-edit">
                <button className='btn btn-secondary' onClick={() => navigate(``)}>Volver</button>
              </div>
            </div>
          </div>
          <div className="row mb-2 mt-3">
            <hr className="border border-secondary border-1 opacity-75" />
          </div>
          <div className="row mb-4">
            <h6>El alumno:</h6>
            <div className="col-12">
              <CheckboxList
                items={studentsData.alternativeSkills.map(skill => ({ field: `alternativeSkills_${skill.value}`, label: skill.label }))}
                register={register}
                getValues={getValues}
                errors={errors}
                rules={{ required: "Por favor selecione por lo menos uno" }}
              />
            </div>
          </div>
          <div className="row mb-2 mt-3">
            <hr className="border border-secondary border-1 opacity-75" />
          </div>
          <div className="row">
            <div className="col-8">
              <button className="btn btn-primary xl" onClick={handleSubmit((data) => handleUpdateStudent(data))}>Editar</button>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default EditStudentAlternativeSkills;
