import "./StudentSocialSkillsRegister.scss";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { StudentSocialSkills } from './../../../../interfaces/student/StudentSocialSkills';
import { useLoader } from "../../../../Global/Context/globalContext";
import { useEffect, useState } from "react";
import { Student } from '../../../../interfaces/student/Student';
import { StudentService } from "../../../../services/students/StudentsService";
import { studentsData } from "../../../../common/studentEnums";
import { StudentSocialSkillsService } from "../../../../services/students/StudentSocialSkillsService";
import { ToastContainer, toast } from "react-toastify";
import { CheckboxList } from "../../../../components/shared/FormInputs/CheckBox";

const StudentSocialSkillsRegister = () => {

  const { id } = useParams<{ id: string }>();
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    getValues,
  } = useForm<StudentSocialSkills & { [key: string]: any }>();
  const navigate = useNavigate();
  const { setLoading } = useLoader();

  const [studentSkills, setStudentSkills] = useState<Student>();

  const loadStudent = async (studentId: number) => {
    setLoading(true);
    let resp = await StudentService.getStudent(studentId);
    console.log(resp);
    if (resp.status === 200) {
      setStudentSkills(resp.student);
    } else {
      console.log(resp.status);
    }
    setLoading(false);
  };

  const handleCreate = async (data: any) => {
    setLoading(true);
    console.log(data);

    const selectedSocialSkillsBasic = studentsData.socialBasic
      .filter(skill => getValues(`socialSkillsBasic_${skill.value}`))
      .map(skill => skill.value);

    const selectedSocialSkillsAdvanced = studentsData.socialAdvanced
      .filter(skill => getValues(`socialSkillsAdvanced_${skill.value}`))
      .map(skill => skill.value);

    const selectedSocialSkillsFeelings = studentsData.socialFeelings
      .filter(skill => getValues(`socialSkillsFeelings_${skill.value}`))
      .map(skill => skill.value);

    const selectedSocialSkillsAssaults = studentsData.socialAssault
      .filter(skill => getValues(`socialSkillsAssault_${skill.value}`))
      .map(skill => skill.value);

    const selectedSocialSkillsStress = studentsData.socialStress
      .filter(skill => getValues(`socialSkillsStress_${skill.value}`))
      .map(skill => skill.value);

    const selectedSocialSkillsPlanning = studentsData.socialPlanning
      .filter(skill => getValues(`socialSkillsPlanning_${skill.value}`))
      .map(skill => skill.value);

    const resp = await StudentSocialSkillsService.register({
      basic: selectedSocialSkillsBasic,
      advanced: selectedSocialSkillsAdvanced,
      feelings: selectedSocialSkillsFeelings,
      assault: selectedSocialSkillsAssaults,
      stress: selectedSocialSkillsStress,
      planning: selectedSocialSkillsPlanning
    }, studentSkills?.id || 0);
    console.log(studentSkills);
    console.log(resp);
    if (resp.status === 200) {
      toast.success(resp.message);
      if (resp.students_social_skills) {
        navigate('/student/social/skills/overview/' + resp.students_social_skills.id);
      }
    } else {
      toast.error(resp.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (!id) return;
    let studentId = parseInt(id);
    loadStudent(studentId);
  }, [id]);

  return (
    <div className="student-social">
      <h1>Registro de Habilidades Sociales</h1>
      <div className="form">
        <div className="container-fluid-mb-3 form-group">
          <div className="row mb-4">
            <h4>Sociales básicas</h4>
            <h6>El alumno puede:</h6>
            <div className="col-12">
              <CheckboxList
                items={studentsData.socialBasic.map(skill => ({ field: `socialSkillsBasic_${skill.value}`, label: skill.label }))}
                register={register}
                getValues={getValues}
                errors={errors}
                rules={{ required: 'Este campo es requerido' }}
              />
            </div>
          </div>
          <div className="row mb-4">
            <h4>Sociales avanzadas</h4>
            <h6>El alumno puede:</h6>
            <div className="col-12">
              <CheckboxList
                items={studentsData.socialAdvanced.map(skill => ({ field: `socialSkillsAdvanced_${skill.value}`, label: skill.label }))}
                register={register}
                getValues={getValues}
                errors={errors}
                rules={{ required: 'Este campo es requerido' }}
              />
            </div>
          </div>
          <div className="row mb-4">
            <h4>Relacionadas con los sentimientos</h4>
            <h6>El alumno puede:</h6>
            <div className="col-12">
              <CheckboxList
                items={studentsData.socialFeelings.map(skill => ({ field: `socialSkillsFeelings_${skill.value}`, label: skill.label }))}
                register={register}
                getValues={getValues}
                errors={errors}
                rules={{ required: 'Este campo es requerido' }}
              />
            </div>
          </div>
          <div className="row mb-4">
            <h4>Alternativas a la agresión</h4>
            <h6>El alumno puede:</h6>
            <div className="col-12">
              <CheckboxList
                items={studentsData.socialAssault.map(skill => ({ field: `socialSkillsAssault_${skill.value}`, label: skill.label }))}
                register={register}
                getValues={getValues}
                errors={errors}
                rules={{ required: 'Este campo es requerido' }}
              />
            </div>
          </div>
          <div className="row mb-4">
            <h4>Para enfrentar el estrés</h4>
            <h6>El alumno puede:</h6>
            <div className="col-12">
              <CheckboxList
                items={studentsData.socialStress.map(skill => ({ field: `socialSkillsStress_${skill.value}`, label: skill.label }))}
                register={register}
                getValues={getValues}
                errors={errors}
                rules={{ required: 'Este campo es requerido' }}
              />
            </div>
          </div>
          <div className="row mb-4">
            <h4>De planificación</h4>
            <h6>El alumno puede:</h6>
            <div className="col-12">
              <CheckboxList
                items={studentsData.socialStress.map(skill => ({ field: `socialSkillsPlanning_${skill.value}`, label: skill.label }))}
                register={register}
                getValues={getValues}
                errors={errors}
                rules={{ required: 'Este campo es requerido' }}
              />
            </div>
          </div>
          <div className="row mb-2 mt-3">
            <hr className="border border-secondary border-1 opacity-75" />
          </div>
          <div className="row">
            <div className="col-8">
              <button className="btn btn-primary xl" onClick={handleSubmit((data) => handleCreate(data))}>Registrar</button>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default StudentSocialSkillsRegister;     