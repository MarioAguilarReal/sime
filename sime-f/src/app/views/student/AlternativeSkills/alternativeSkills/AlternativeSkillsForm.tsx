import { useForm } from 'react-hook-form';
import './AlternativeSkillsForm.scss';
import { StudentAlternativeSkills } from '../../../../interfaces/student/StudentAlternativeSkills';
import { useNavigate } from 'react-router-dom';
import { useLoader } from '../../../../Global/Context/globalContext';
import { StudentAlternativeSkillsService } from '../../../../services/students/StudentAlternativeSkillsService';
import { studentsData } from '../../../../common/studentEnums';
import { toast, ToastContainer } from 'react-toastify';
import { useEffect } from 'react';
import { CheckboxList } from '../../../../components/shared/FormInputs/CheckBox';
import { Student } from '../../../../interfaces/student/Student';

interface FormAlternativeProps {
  mode: 'register' | 'edit';
  alternativeSkills?: StudentAlternativeSkills;
  student: Student;
}
const AlternativeSkillsForm = (props: FormAlternativeProps) => {
  const { mode, alternativeSkills, student } = props;
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
  } = useForm<StudentAlternativeSkills & { [key: string]: any }>();
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
    const selectedAlternativeSkills = createSendData();
    const resp = await StudentAlternativeSkillsService.register(selectedAlternativeSkills, student.id as number);
    handleResponse(resp);
  };

  const handleUpdate = async () => {
    const selectedAlternativeSkills = createSendData();
    const resp = await StudentAlternativeSkillsService.update(selectedAlternativeSkills, alternativeSkills?.id as number);
    handleResponse(resp);
  };

  const createSendData = () => {
    const selectedAlternativeSkills = studentsData.alternativeSkills
      .filter(skill => getValues(`alternativeSkills_${skill.value}`))
      .map(skill => skill.value);

    return { alternative_list: selectedAlternativeSkills };
  };

  const handleResponse = (resp: any) => {
    if (resp.status === 200) {
      navigate('/student/alternative/skills/overview/' + resp.data.id);
    } else {
      toast.error(resp.message);
    }
  };

  const fillSendData = (data: StudentAlternativeSkills) => {
    const alternativeList = typeof data.alternative_list === "string" ? JSON.parse(data.alternative_list) : data.alternative_list;
    alternativeList.forEach((skillId: number) => {
      setValue(`alternativeSkills_${skillId}`, true);
    });
  };

  useEffect(() => {
    if (mode === 'edit' && alternativeSkills) {
      fillSendData(alternativeSkills);
    }
  }, [mode]);

  return (
    <div className="edit-skills">
      <h1>{mode === 'edit' ? 'Editar Habilidades Alternativas del Estudiante' : 'Registro de Habilidades Alternativas'}</h1>
      <div className="form">
        <div className='container-fluid-mb-3 form-group'>
          <div className="row mb-2">
            <div className="col-2">
              <div className="col-4">
                <button className='btn btn-secondary' onClick={() => mode === 'edit' ? navigate(`/student/alternative/skills/overview/${student.id}`) : navigate(`/student/overview/${student.id}`)} disabled={mode === 'edit' ? !alternativeSkills?.id : !student}>Volver</button>
              </div>
            </div>
          </div>
          <div className="row mb-2 mt-3">
            <hr />
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

export default AlternativeSkillsForm;
