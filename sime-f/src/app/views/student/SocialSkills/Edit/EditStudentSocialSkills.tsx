import { useNavigate, useParams } from 'react-router-dom';
import './EditStudentSocialSkills.scss';
import { useForm } from 'react-hook-form';
import { useLoader } from '../../../../Global/Context/globalContext';
import { StudentSocialSkills } from '../../../../interfaces/student/StudentSocialSkills';
import { useEffect, useState } from 'react';
import { StudentSocialSkillsService } from '../../../../services/students/StudentSocialSkillsService';
import { ToastContainer, toast } from 'react-toastify';
import { studentsData } from '../../../../common/studentEnums';
import { CheckboxList } from '../../../../components/shared/FormInputs/CheckBox';

const EditStudentSocialSkills = () => {

  const { id } = useParams<{ id: string }>();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
  } = useForm<StudentSocialSkills & { [key: string]: any }>();
  const navigate = useNavigate();
  const { setLoading } = useLoader();

  const [studentSkills, setStudentSkills] = useState<StudentSocialSkills>();

  const [back, setBack] = useState(Number);

  const loadStudent = async (studentId: number) => {
    setLoading(true);
    let resp = await StudentSocialSkillsService.get(studentId);
    if (resp.status === 200) {
      setStudentSkills(resp.students_social_skills);
      setBack(studentId);
    } else {
      toast.error(resp.status);
    }
    setLoading(false);
  };

  const handleUpdateStudent = async (data: any) => {
    setLoading(true);

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

    const resp = await StudentSocialSkillsService.update({
      basic: selectedSocialSkillsBasic,
      advanced: selectedSocialSkillsAdvanced,
      feelings: selectedSocialSkillsFeelings,
      assault: selectedSocialSkillsAssaults,
      stress: selectedSocialSkillsStress,
      planning: selectedSocialSkillsPlanning
    }, studentSkills?.id || 0);
    if (resp.status === 200) {
      navigate('/student/social/skills/overview/' + resp.students_social_skills.id);
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
    if (studentSkills && studentSkills.basic) {
      studentSkills.basic.forEach((skillId: number) => {
        setValue(`socialSkillsBasic_${skillId}`, true);
      });
    }
    if (studentSkills && studentSkills.advanced) {
      studentSkills.advanced.forEach((skillId: number) => {
        setValue(`socialSkillsAdvanced_${skillId}`, true);
      });
    }
    if (studentSkills && studentSkills.feelings) {
      studentSkills.feelings.forEach((skillId: number) => {
        setValue(`socialSkillsFeelings_${skillId}`, true);
      });
    }
    if (studentSkills && studentSkills.assault) {
      studentSkills.assault.forEach((skillId: number) => {
        setValue(`socialSkillsAssault_${skillId}`, true);
      });
    }
    if (studentSkills && studentSkills.stress) {
      studentSkills.stress.forEach((skillId: number) => {
        setValue(`socialSkillsStress_${skillId}`, true);
      });
    }
    if (studentSkills && studentSkills.planning) {
      studentSkills.planning.forEach((skillId: number) => {
        setValue(`socialSkillsPlanning_${skillId}`, true);
      });
    }
  }, [studentSkills, setValue]);

  return (
    <div className="edit-skills">
      <h1>Editar Habilidades Sociales del Estudiante</h1>
      <div className="form">
        <div className='container-fluid-mb-3 form-group'>
          <div className="row mb-2">
            <div className="col-2">
              <div className="col-4 btn-edit">
                <button className='btn btn-secondary' onClick={() => navigate(`/student/social/skills/overview/${back}`)}>Volver</button>
              </div>
            </div>
          </div>
          <div className="row mb-2 mt-3">
            <hr />
          </div>
          <div className="row mb-2">
            <h4>Habilidades Básicas</h4>
            <h6>El alumno puede:</h6>
            <div className="col-12">
              <CheckboxList
                items={studentsData.socialBasic.map(skill => ({ field: `socialSkillsBasic_${skill.value}`, label: skill.label }))}
                register={register}
                getValues={getValues}
                errors={errors}
                rules={{ required: "Por favor selecione por lo menos uno" }}
              />
            </div>
          </div>
          <div className="row mb-2">
            <h4>Habilidades Avanzadas</h4>
            <h6>El alumno puede:</h6>
            <div className="col-12">
              <CheckboxList
                items={studentsData.socialAdvanced.map(skill => ({ field: `socialSkillsAdvanced_${skill.value}`, label: skill.label }))}
                register={register}
                getValues={getValues}
                errors={errors}
                rules={{ required: "Por favor selecione por lo menos uno" }}
              />
            </div>
          </div>
          <div className="row mb-2">
            <h4>Manejo de Sentimientos</h4>
            <h6>El alumno puede:</h6>
            <div className="col-12">
              <CheckboxList
                items={studentsData.socialFeelings.map(skill => ({ field: `socialSkillsFeelings_${skill.value}`, label: skill.label }))}
                register={register}
                getValues={getValues}
                errors={errors}
                rules={{ required: "Por favor selecione por lo menos uno" }}
              />
            </div>
          </div>
          <div className="row mb-2">
            <h4>Alternativas a la Agresión</h4>
            <h6>El alumno puede:</h6>
            <div className="col-12">
              <CheckboxList
                items={studentsData.socialAssault.map(skill => ({ field: `socialSkillsAssault_${skill.value}`, label: skill.label }))}
                register={register}
                getValues={getValues}
                errors={errors}
                rules={{ required: "Por favor selecione por lo menos uno" }}
              />
            </div>
          </div>
          <div className="row mb-2">
            <h4>Manejo del Estrés</h4>
            <h6>El alumno puede:</h6>
            <div className="col-12">
              <CheckboxList
                items={studentsData.socialStress.map(skill => ({ field: `socialSkillsStress_${skill.value}`, label: skill.label }))}
                register={register}
                getValues={getValues}
                errors={errors}
                rules={{ required: "Por favor selecione por lo menos uno" }}
              />
            </div>
          </div>
          <div className="row mb-4">
            <h4>Planificación</h4>
            <h6>El alumno puede:</h6>
            <div className="col-12">
              <CheckboxList
                items={studentsData.socialPlanning.map(skill => ({ field: `socialSkillsPlanning_${skill.value}`, label: skill.label }))}
                register={register}
                getValues={getValues}
                errors={errors}
                rules={{ required: "Por favor selecione por lo menos uno" }}
              />
            </div>
          </div>
          <div className="row mb-2 mt-3">
            <hr />
          </div>
          <div className="row">
            <div className="col-8">
              <button className="btn btn-edit xl" onClick={handleSubmit((data) => handleUpdateStudent(data))}>Editar</button>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default EditStudentSocialSkills;