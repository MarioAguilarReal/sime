import { useForm } from 'react-hook-form';
import './SpecialNeedsForm.scss';
import { StudentSpecialNeeds } from '../../../../interfaces/student/StudentSpecialNeeds';
import { useNavigate } from 'react-router-dom';
import { useLoader } from '../../../../Global/Context/globalContext';
import { StudentSpecialNeedsService } from '../../../../services/students/StudentSpecialNeedsService';
import { toast, ToastContainer } from 'react-toastify';
import { useEffect } from 'react';
import TextField from '../../FormInputs/TextField';
import { studentsData } from '../../../../common/studentEnums';
import SelectField from '../../FormInputs/SelectFIeld';

interface FormNeedsProps {
  mode: 'register' | 'edit';
  needsId: any;
  studentId: any;
};
const SpecialNeedsForm = (props: FormNeedsProps) => {
  const { mode, needsId, studentId } = props;
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
  } = useForm<StudentSpecialNeeds>();
  const navigate = useNavigate();
  const { setLoading } = useLoader();

  const handleOnSubmit = async (data: StudentSpecialNeeds) => {
    setLoading(true);
    if (mode === 'register') {
      await handleCreate(data);
    } else {
      await handleUpdate(data);
    }
    setLoading(false);
  };
  const handleCreate = async (data: StudentSpecialNeeds) => {
    setLoading(true);
    const formData = createFormData(data);
    const resp = await StudentSpecialNeedsService.register(formData, studentId);
    handleResponse(resp);
    setLoading(false);
  };
  const handleUpdate = async (data: StudentSpecialNeeds) => {
    setLoading(true);
    const formData = createFormData(data);
    const resp = await StudentSpecialNeedsService.update(formData, needsId);
    handleResponse(resp);
    setLoading(false);
  };

  const createFormData = (data: StudentSpecialNeeds) => {
    const formData = new FormData();
    formData.append('usaer_status', data.usaer_status.toString());
    formData.append('learning_problems', data.learning_problems);
    formData.append('diseases', data.diseases);
    formData.append('treatment_place', data.treatment_place);
    formData.append('special_treatment', data.special_treatment);

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

  const loadSpecialNeeds = async () => {
    setLoading(true);
    let resp = await StudentSpecialNeedsService.get(needsId);
    if (resp.status === 200) {
      fillForm(resp.students_special_needs);
    } else {
      console.log(resp.status);
    }
    setLoading(false);
  };
  const fillForm = (data: StudentSpecialNeeds) => {
    setValue('usaer_status', data.usaer_status);
    setValue('learning_problems', data.learning_problems);
    setValue('diseases', data.diseases);
    setValue('treatment_place', data.treatment_place);
    setValue('special_treatment', data.special_treatment);
  };

  useEffect(() => {
    if (mode === 'edit') {
      loadSpecialNeeds();
    }
  }, [mode]);

  return (
    <div className="edit-needs">
      <h1>{mode === 'register' ? 'Registrar Necesidades Especiales' : 'Necesidades Especiales'}</h1>
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
          <div className="row mb-4">
            <div className="row mb-4 col-6">
              <SelectField
                label={"¿El alumno asiste a USAER?"}
                field={'usaer_status'}
                errors={errors}
                control={control}
                options={studentsData.booleanType}
              />
            </div>
            <div className="row mb-4 col-6">
              <TextField
                label={"¿Presenta problemas de aprendizaje? (de que tipo)"}
                field={'learning_problems'}
                register={register}
                type='text'
                rules={{ required: 'This field is required' }}
                errors={errors}
              />
            </div>
          </div>
          <div className="row mb-4">
            <div className="row mb-4 col-6">
              <TextField
                label={"¿Necesita algún tratamiento especial? (En caso de así ser, ¿Cuáles? De no necesitarlo, escriba 'Ninguno')"}
                field={'special_treatment'}
                register={register}
                type='text'
                rules={{ required: 'This field is required' }}
                errors={errors}
              />
            </div>
            <div className="row mb-4 col-6">
              <TextField
                label={"¿En que lugar ha sido atendido? (Escriba 'Ninguno' en caso de no haber sido atendido)"}
                field={'treatment_place'}
                register={register}
                type='text'
                rules={{ required: 'This field is required' }}
                errors={errors}
              />
            </div>
          </div>
          <div className="row mb-4">
            <div className="row mb-4 col-6">
              <TextField
                label={"¿Presenta alguna enfermedad? (neuronal, motriz, etc.)"}
                field={'diseases'}
                register={register}
                type='text'
                rules={{ required: 'This field is required' }}
                errors={errors}
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

export default SpecialNeedsForm;