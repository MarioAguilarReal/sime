import { useNavigate, useParams } from 'react-router-dom';
import './StudentCognitiveSkillsRegister.scss';
import { useForm } from 'react-hook-form';
import { StudentCognitiveSkills } from '../../../../interfaces/student/StudentCognitiveSkills';
import { useLoader } from '../../../../Global/Context/globalContext';
import { useEffect, useState } from 'react';
import { Student } from '../../../../interfaces/student/Student';
import { StudentService } from '../../../../services/students/StudentsService';
import { StudentCognitiveSkillsService } from './../../../../services/students/StudentCognitiveSkillsService';
import { ToastContainer, toast } from 'react-toastify';
import { CheckboxList } from '../../../../components/shared/FormInputs/CheckBox';
import { studentsData } from '../../../../common/studentEnums';

const StudentCognitiveSkillsRegister = () => {

  const { id } = useParams<{ id: string }>();
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    getValues,
  } = useForm<StudentCognitiveSkills & { [key: string]: any }>();
  const navigate = useNavigate();
  const { setLoading } = useLoader();

  const [studentCognitive, setStudentCognitive] = useState<Student>();

  const loadStudent = async (studentId: number) => {
    setLoading(true);
    let resp = await StudentService.getStudent(studentId);
    console.log(resp);
    if (resp.status === 200) {
      setStudentCognitive(resp.student);
    } else {
      console.log(resp.status);
    }
    setLoading(false);
  };

  const handleCreate = async (data: any) => {
    setLoading(true);
    console.log(data);

    const selectedCognitiveSkills = studentsData.cognitiveSkills
      .filter(skill => getValues(`cognitiveSkills_${skill.value}`))
      .map(skill => skill.value);

    console.log(selectedCognitiveSkills);

    // const formData = new FormData();
    // formData.append('cognitive_list', JSON.stringify(selectedCognitiveSkills));

    // console.log(formData.get('cognitive_list'));
    // console.log(formData);

    const resp = await StudentCognitiveSkillsService.register({ cognitive_list: selectedCognitiveSkills }, studentCognitive?.id || 0);
    console.log(studentCognitive);
    console.log(resp);
    if (resp.status === 200) {
      toast.success(resp.message);
      if (resp.students_cognitive_skills)
        navigate('/student/cognitive/skills/overview/' + resp.students_cognitive_skills.id);
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
    <div className="student-cognitive">
      <h1>Registro de Habilidades Cognitivas</h1>
      <div className="form">
        <div className="row mb-2">
          <div className="col-4 btn-edit">
            <button className='btn btn-secondary' onClick={() => navigate(`/student/overview/${studentCognitive?.id}`)}>Volver</button>
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
              <button className="btn btn-primary xl" onClick={handleSubmit((data) => handleCreate(data))}>Registrar</button>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default StudentCognitiveSkillsRegister;