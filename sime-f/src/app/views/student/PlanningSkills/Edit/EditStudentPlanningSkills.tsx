import { useNavigate, useParams } from 'react-router-dom';
import './EditStudentPlanningSkills.scss';
import { useForm } from 'react-hook-form';
import { StudentPlanningSkills } from '../../../../interfaces/student/StudentPlanningSkills';
import { useLoader } from '../../../../Global/Context/globalContext';
import { useEffect, useState } from 'react';
import { StudentPlanningSkillsService } from '../../../../services/students/StudentPlanningSkillsService';
import { studentsData } from '../../../../common/studentEnums';
import { ToastContainer } from 'react-toastify';
import SelectField from '../../../../components/shared/FormInputs/SelectFIeld';

const EditStudentPlanningSkills = () => {

  const { id } = useParams<{ id: string }>();
  const {
    handleSubmit,
    formState: { errors },
    control,
    setValue
  } = useForm<StudentPlanningSkills>();

  const navigate = useNavigate();
  const { setLoading } = useLoader();

  const [studentPlanning, setStudentPlanning] = useState<StudentPlanningSkills>();

  const [back, setBack] = useState(Number);

  const loadStudentPlanning = async (dataId: number) => {
    setLoading(true);
    let resp = await StudentPlanningSkillsService.get(dataId);
    console.log(resp);

    if (resp.status === 200) {
      setStudentPlanning(resp.students_planning_skills);
      setBack(dataId);
    } else {
      console.log(resp.status);
    }
    setLoading(false);
  };

  const handleUpdate = async (data: StudentPlanningSkills) => {
    setLoading(true);
    console.log(data);
    const formData = new FormData();
    formData.append('focus', data.focus.toString());
    formData.append('detect', data.detect.toString());
    formData.append('correlation', data.correlation.toString());

    const resp = await StudentPlanningSkillsService.update(formData, studentPlanning?.id || 0);
    console.log(resp);
    if (resp.status === 200) {
      navigate('/student/planning/skills/overview/' + resp.students_planning_skills.id);
    } else {
      console.log(resp.status);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (id) {
      let dataId = parseInt(id);
      loadStudentPlanning(dataId);
    }
  }, [id]);

  useEffect(() => {
    if (studentPlanning) {
      setValue('focus', studentPlanning.focus);
      setValue('detect', studentPlanning.detect);
      setValue('correlation', studentPlanning.correlation);
    }
  }, [studentPlanning]);

  return (
    <div className="edit-skills">
      <h1>Editar Habilidades de Planificación</h1>
      <div className="form">
        <div className="row mb-2">
          <div className="col-2">
            <button className='btn btn-secondary' onClick={() => navigate(`/student/planning/skills/overview/${back}`)}>Volver</button>
          </div>
        </div>
        <div className="row mb-2 mt-3">
          <hr />
        </div>
        <div className='container-fluid-mb-3 form-group'>
          <div className="mb-4">
            <div className="row  mb-4 col-6">
              <SelectField
                label={"¿Sabe enfocar correctamente su atención a los puntos importantes de un problema?"}
                field={"focus"}
                errors={errors}
                control={control}
                options={studentsData.booleanType}
              />
            </div>
            <div className="row  mb-4 col-6">
              <SelectField
                label={"¿Detecta o no los posibles errores?"}
                field={"detect"}
                errors={errors}
                control={control}
                options={studentsData.booleanType}
              />
            </div>
            <div className="row  mb-4 col-6">
              <SelectField
                label={"¿Correlaciona entre lo planeado y lo ejecutado?"}
                field={"correlation"}
                errors={errors}
                control={control}
                options={studentsData.booleanType}
              />
            </div>
          </div>

          <div className="row mb-2 mt-3">
            <hr />
          </div>
          <div className="row">
            <div className="col-8">
              <button className="btn btn-edit xl" onClick={handleSubmit((data) => handleUpdate(data))}>Editar</button>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default EditStudentPlanningSkills;