import { useNavigate, useParams } from 'react-router-dom';
import './EditStudentCognitiveSkills.scss';
import { ToastContainer, toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { useLoader } from '../../../../Global/Context/globalContext';
import { useEffect, useState } from 'react';
import { studentsData } from '../../../../common/studentEnums';
import { StudentCognitiveSkills } from '../../../../interfaces/student/StudentCognitiveSkills';
import { StudentCognitiveSkillsService } from '../../../../services/students/StudentCognitiveSkillsService';
import { CheckboxList } from '../../../../components/shared/FormInputs/CheckBox';

const EditStudentCognitiveSkills = () => {

  const { id } = useParams<{ id: string }>();
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
    getValues,
  } = useForm<StudentCognitiveSkills & { [key: string]: any }>();
  const navigate = useNavigate();
  const { setLoading } = useLoader();

  const [studentSkills, setStudentSkills] = useState<StudentCognitiveSkills>();

  const loadStudent = async (studentId: number) => {
    setLoading(true);
    let resp = await StudentCognitiveSkillsService.get(studentId);
    if (resp.status === 200) {
      setStudentSkills(resp.students_cognitive_skills);
    } else {
      toast.error(resp.status);
    }
    setLoading(false);
  };

  const handleUpdateStudent = async (data: any) => {
    setLoading(true);

    const selectedCognitiveSkills = studentsData.cognitiveSkills
      .filter(skill => getValues(`cognitiveSkills_${skill.value}`))
      .map(skill => skill.value);

    console.log(selectedCognitiveSkills);

    const resp = await StudentCognitiveSkillsService.update({ cognitive_list: selectedCognitiveSkills }, studentSkills?.id || 0);
    console.log(resp);
    if (resp.status === 200) {
      navigate('/student/cognitive/skills/overview/' + resp.students_cognitive_skills.id);
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
    if (studentSkills && studentSkills.cognitive_list) {
      studentSkills.cognitive_list.forEach((skillId: number) => {
        setValue(`cognitiveSkills_${skillId}`, true);
      });
    }
  }, [studentSkills, setValue]);

  return (
    <div className="edit-skills">
      <h1>Editar Habilidades Cognitivas del Estudiante</h1>
      <div className="form">
        <div className="row mb-2">
          <div className="col-2">
            <div className="col-4 btn-edit">
              <button className='btn btn-secondary' onClick={() => navigate(`/student/cognitive/skills/overview/${studentSkills?.id}`)}>Volver</button>
            </div>
          </div>
        </div>
        <div className="row mb-2 mt-3">
          <hr className="border border-secondary border-1 opacity-75" />
        </div>
        <div className='container-fluid-mb-3 form-group'>
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
    </div >
  );
}

export default EditStudentCognitiveSkills;