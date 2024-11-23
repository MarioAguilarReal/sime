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
import { Student } from '../../../../interfaces/student/Student';

interface FormPlaningProps {
  mode: 'register' | 'edit';
  planning?: StudentPlanningSkills;
  student: Student;
}
const PlanningSkillsForm = (props: FormPlaningProps) => {
  const { mode, planning, student } = props;
  const { id } = useParams();
  const {
    handleSubmit,
    formState: { errors },
    control,
    setValue,
    reset,
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
    const resp = await StudentPlanningSkillsService.register(data, student.id as number);
    handleResponse(resp);
  };

  const handleUpdate = async (data: StudentPlanningSkills) => {
    const resp = await StudentPlanningSkillsService.update(data, planning?.id as number);
    handleResponse(resp);
  };

  const handleResponse = (resp: any) => {
    if (resp.status === 200) {
      toast.success(resp.message);
    } else {
      if (mode === 'edit') {
        fillForm(planning as StudentPlanningSkills);
      } else {
        reset();
      }
      toast.error(resp.message);
    }
  };

  const fillForm = (data: StudentPlanningSkills) => {
    setValue('focus', data.focus);
    setValue('detect', data.detect);
    setValue('correlation', data.correlation);
  };

  useEffect(() => {
    if (mode === 'edit') {
      fillForm(planning as StudentPlanningSkills);
    }
  }, [mode]);

  return (
    <div className="edit-skills">
      <h1>{mode === 'register' ? 'Registrar Habilidades de Planificación' : 'Habilidades de Planificación'}</h1>
      <div className="form">
        <div className="row mb-2">
          <div className="col-2">
            <button className='btn btn-secondary' onClick={() => navigate(`/student/overview/${student.id}`)} disabled={!student}>Volver</button>
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
                rules={{ required: 'Este campo' }}
                control={control}
                options={studentsData.booleanType}
              />
            </div>
            <div className="row  mb-4 col-6">
              <SelectField
                label={"¿Detecta o no los posibles errores?"}
                field={"detect"}
                errors={errors}
                rules={{ required: 'Este campo' }}
                control={control}
                options={studentsData.booleanType}
              />
            </div>
            <div className="row  mb-4 col-6">
              <SelectField
                label={"¿Correlaciona entre lo planeado y lo ejecutado?"}
                field={"correlation"}
                errors={errors}
                rules={{ required: 'Este campo' }}
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
