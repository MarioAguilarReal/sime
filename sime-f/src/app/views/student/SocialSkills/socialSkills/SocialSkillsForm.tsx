import { useForm } from 'react-hook-form';
import './SocialSkillsForm.scss';
import { StudentSocialSkills } from '../../../../interfaces/student/StudentSocialSkills';
import { useNavigate } from 'react-router-dom';
import { useLoader } from '../../../../Global/Context/globalContext';
import { StudentSocialSkillsService } from '../../../../services/students/StudentSocialSkillsService';
import { studentsData } from '../../../../common/studentEnums';
import { toast, ToastContainer } from 'react-toastify';
import { useEffect } from 'react';
import { CheckboxList } from '../../../../components/shared/FormInputs/CheckBox';
import { Student } from '../../../../interfaces/student/Student';

interface FormSocialProps {
  mode: 'register' | 'edit';
  socialSkills?: StudentSocialSkills;
  student: Student;
}
const SocialSkillsForm = (props: FormSocialProps) => {
  const { mode, socialSkills, student } = props;
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
  } = useForm<StudentSocialSkills & { [key: string]: any }>();
  const navigate = useNavigate();
  const { setLoading } = useLoader();

  const handleOnSubmit = async () => {
    setLoading(true);
    if (mode === 'register') {
      await handleCreate();
    } else {
      await handleUpdate();
    }
    setLoading(false);
  };
  const handleCreate = async () => {
    const selectedSocialSkills = createSendData();
    const resp = await StudentSocialSkillsService.register(selectedSocialSkills, student.id as number);
    handleResponse(resp);
  };
  const handleUpdate = async () => {
    const selectedSocialSkills = createSendData();
    const resp = await StudentSocialSkillsService.update(selectedSocialSkills, socialSkills?.id as number);
    handleResponse(resp);
  };

  const createSendData = () => {
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

    const selectedSocialSkills = {
      basic: selectedSocialSkillsBasic,
      advanced: selectedSocialSkillsAdvanced,
      feelings: selectedSocialSkillsFeelings,
      assault: selectedSocialSkillsAssaults,
      stress: selectedSocialSkillsStress,
      planning: selectedSocialSkillsPlanning
    };

    return selectedSocialSkills;
  };
  const handleResponse = (resp: any) => {
    if (resp.status === 200) {
      navigate('/student/social/skills/overview/' + resp.data.id);
    } else {
      toast.error(resp.message);
    }
  };

  const fillSendData = (data: StudentSocialSkills) => {
    const parseList = (list: string | any[]) => {
      return typeof list === 'string' ? JSON.parse(list) : list;
    }
    const socialCategories = [
      { key: 'basic', prefix: 'socialSkillsBasic' },
      { key: 'advanced', prefix: 'socialSkillsAdvanced' },
      { key: 'feelings', prefix: 'socialSkillsFeelings' },
      { key: 'assault', prefix: 'socialSkillsAssault' },
      { key: 'stress', prefix: 'socialSkillsStress' },
      { key: 'planning', prefix: 'socialSkillsPlanning' }
    ];

    socialCategories.forEach(({ key, prefix }) => {
      const list = parseList((data as any)[key]);
      list.forEach((skillId: number) => {
        setValue(`${prefix}_${skillId}`, true);
      });
    });
  };

  useEffect(() => {
    if (mode === 'edit' && socialSkills) {
      fillSendData(socialSkills);
    }
  }, [mode]);

  return (
    <div className="edit-skills">
      <h1>{mode === 'edit' ? 'Editar Habilidades Sociales del Estudiante' : 'Agregar Habilidades Sociales del Estudiante'}</h1>
      <div className="form">
        <div className='container-fluid-mb-3 form-group'>
          <div className="row mb-2">
            <div className="col-2">
              <div className="col-4 btn-edit">
                <button className='btn btn-secondary' onClick={() => (mode === 'edit' && student) ? navigate(`/student/social/skills/overview/${student.id}`) : student && navigate(`/student/overview/${student.id}`)} disabled={mode === 'edit' ? !student : !student}>Volver</button>
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
              <button className="btn btn-edit xl" onClick={handleSubmit(() => handleOnSubmit())}>{mode === 'edit' ? 'Editar' : 'Registrar'}</button>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default SocialSkillsForm;
