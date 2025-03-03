import { useForm } from 'react-hook-form';
import './CognitiveSkillsForm.scss';
import { StudentCognitiveSkills } from '../../../../interfaces/student/StudentCognitiveSkills';
import { useNavigate } from 'react-router-dom';
import { useLoader } from '../../../../Global/Context/globalContext';
import { StudentCognitiveSkillsService } from '../../../../services/students/StudentCognitiveSkillsService';
import { studentsData } from '../../../../common/studentEnums';
import { toast, ToastContainer } from 'react-toastify';
import { useEffect } from 'react';
import { CheckboxList } from '../../../../components/shared/FormInputs/CheckBox';
import { Student } from '../../../../interfaces/student/Student';

interface FormCognitiveProps {
  mode: 'register' | 'edit';
  cognitive?: StudentCognitiveSkills;
  student: Student;
}
const CognitiveSkillsForm = (props: FormCognitiveProps) => {
  const { mode, cognitive, student } = props;
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
  } = useForm<StudentCognitiveSkills & { [key: string]: any }>();
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
    const selectedCognitiveSkills = createSendData();
    const resp = await StudentCognitiveSkillsService.register(selectedCognitiveSkills, student.id as number);
    handleResponse(resp);
  };

  const handleUpdate = async () => {
    const selectedCognitiveSkills = createSendData();
    if (!cognitive?.id) return;
    const resp = await StudentCognitiveSkillsService.update(selectedCognitiveSkills, cognitive?.id);
    handleResponse(resp);
  };

  const createSendData = () => {
    const selectedCognitiveSkills = studentsData.cognitiveSkills.filter(skill => getValues(`cognitiveSkills_${skill.value}`)).map(skill => skill.value);

    return {
      cognitive_list: selectedCognitiveSkills
    };
  };

  const handleResponse = (resp: any) => {
    if (resp.status === 200) {
      navigate('/student/cognitive/skills/overview/' + resp.data.id);
    } else {
      toast.error(resp.message);
    }
  };

  const fillSendData = (data: StudentCognitiveSkills) => {
    const cognitiveList = typeof data.cognitive_list === 'string' ? JSON.parse(data.cognitive_list) : data.cognitive_list;
    cognitiveList.forEach((skillId: number) => {
      setValue(`cognitiveSkills_${skillId}`, true);
    });
  };

  useEffect(() => {
    if (mode === 'edit' && cognitive) {
      fillSendData(cognitive);
    }
  }, [mode]);

  return (
    <div className="edit-skills">
      <h1>{mode === 'edit' ? 'Editar Habilidades Cognitivas del Estudiante' : 'Agregar Habilidades Cognitivas del Estudiante'}</h1>
      <div className="form">
        <div className='container-fluid-mb-3 form-group'>
          <div className="row mb-2">
            <div className="col-2">
              <div className="col-4 btn-edit">
                <button className='btn btn-secondary' onClick={() => mode === 'edit' ? navigate(`/student/cognitive/skills/overview/${student.id}`) : navigate(`/student/overview/${student.id}`)} disabled={mode === 'edit' ? !cognitive : !student} >Volver</button>
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
                items={studentsData.cognitiveSkills.map(skill => ({ field: `cognitiveSkills_${skill.value}`, label: skill.label }))}
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
    </div >
  );
};

export default CognitiveSkillsForm;
