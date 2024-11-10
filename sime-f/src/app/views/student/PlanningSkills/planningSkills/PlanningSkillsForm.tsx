import { useForm } from 'react-hook-form';
import './PlanningSkillsForm.scss';
import { useNavigate, useParams } from 'react-router-dom';
import { useLoader } from '../../../../Global/Context/globalContext';
import { StudentPlanningSkills } from '../../../../interfaces/student/StudentPlanningSkills';
import { StudentPlanningSkillsService } from '../../../../services/students/StudentPlanningSkillsService';
import { toast, ToastContainer } from 'react-toastify';
import { useEffect, useState } from 'react';
import { studentsData } from '../../../../common/studentEnums';
import SelectField from '../../../../components/shared/FormInputs/SelectFIeld';

interface FormPlaningProps {
  mode: 'register' | 'edit';
  planningId?: StudentPlanningSkills;
  studentId: any;
}
const PlanningSkillsForm = (props: FormPlaningProps) => {
  const { mode, planningId } = props;
  const [studentId, setStudentId] = useState(0 as number);
  const { id } = useParams();
  const {
    handleSubmit,
    formState: { errors },
    control,
    setValue,
  } = useForm<StudentPlanningSkills>();
  const navigate = useNavigate();
  const { setLoading } = useLoader();

  const handleOnSubmit = async (data: StudentPlanningSkills) => {
    setLoading(true);
    if (mode === 'register') {
      await handleCreate(data);
    } else {
      await handleUpdate(data);
    }
    setLoading(false);
  };
  const handleCreate = async (data: StudentPlanningSkills) => {
    setLoading(true);
    const formData = createFormData(data);
    console.log(formData);
    console.log(studentId);
    const resp = await StudentPlanningSkillsService.register(formData, studentId);
    console.log(resp);
    handleResponse(resp);
    setLoading(false);
  };
  const handleUpdate = async (data: StudentPlanningSkills) => {
    setLoading(true);
    const formData = createFormData(data);
    const resp = await StudentPlanningSkillsService.update(formData, planningId?.id as number);
    console.log(resp);
    handleResponse(resp);
    setLoading(false);
  };

  const createFormData = (data: StudentPlanningSkills) => {
    const formData = new FormData();
    console.log(data);
    formData.append('focus', data.focus.toString());
    formData.append('detect', data.detect.toString());
    formData.append('correlation', data.correlation.toString());

    console.log(formData);
    return formData;
  };
  const handleResponse = (resp: any) => {
    if (resp.status === 200) {
      if (mode === 'register') {
        window.location.reload();
      }
      toast.success(resp.message);
    } else {
      toast.error(resp.message);
      console.log(resp.status);
    }
  };

  const loadPlanningSkills = async () => {
    setLoading(true);
    let resp = await StudentPlanningSkillsService.get(planningId?.id as number);
    if (resp.status === 200) {
      fillForm(resp.data);
    } else {
      console.log(resp.status);
    }
    setLoading(false);
  };
  const fillForm = (data: StudentPlanningSkills) => {
    setValue('focus', data.focus);
    setValue('detect', data.detect);
    setValue('correlation', data.correlation);
  };

  useEffect(() => {
    if (id) {
      setStudentId(+id);
    }
    if (mode === 'edit') {
      loadPlanningSkills();
    }
  }, [mode, id]);

  return (
    <div className="edit-skills">
      <h1>{mode === 'register' ? 'Registrar Habilidades de Planificación' : 'Habilidades de Planificación'}</h1>
      <div className="form">
        <div className="row mb-2">
          <div className="col-2">
            <button className='btn btn-secondary' onClick={() => navigate(`/student/overview/${studentId}`)} disabled={!studentId}>Volver</button>
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
              <button className="btn btn-edit xl" onClick={handleSubmit((data) => handleOnSubmit(data))}>{mode === 'edit' ? 'Editar' : 'Registrar'}</button>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default PlanningSkillsForm;