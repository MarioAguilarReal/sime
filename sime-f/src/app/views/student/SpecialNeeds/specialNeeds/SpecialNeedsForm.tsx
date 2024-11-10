import { useForm } from 'react-hook-form';
import './SpecialNeedsForm.scss';
import { StudentSpecialNeeds } from '../../../../interfaces/student/StudentSpecialNeeds';
import { useNavigate } from 'react-router-dom';
import { useLoader } from '../../../../Global/Context/globalContext';
import { StudentSpecialNeedsService } from '../../../../services/students/StudentSpecialNeedsService';
import { toast, ToastContainer } from 'react-toastify';
import { useEffect } from 'react';
import TextField from '../../../../components/shared/FormInputs/TextField';
import { studentsData } from '../../../../common/studentEnums';
import SelectField from '../../../../components/shared/FormInputs/SelectFIeld';
import { Student } from '../../../../interfaces/student/Student';

interface FormNeedsProps {
  mode: 'register' | 'edit';
  needs?: StudentSpecialNeeds;
  student: Student;
};
const SpecialNeedsForm = (props: FormNeedsProps) => {
  const { mode, needs, student } = props;
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
    let resp;
    if (mode === 'register') {
      resp = await StudentSpecialNeedsService.register(data, student.id as number);
    } else {
      resp = await StudentSpecialNeedsService.update(data, needs?.id as number);
    }

    if (resp.status === 200) {
      toast.success(resp.message);
    } else {
      toast.error(resp.message);
      if (mode === 'register') {
        clearForm();
      } else {
        fillForm(needs as StudentSpecialNeeds);
      }
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

  const clearForm = () => {
    setValue('usaer_status', null as any);
    setValue('learning_problems', '');
    setValue('diseases', '');
    setValue('treatment_place', '');
    setValue('special_treatment', '');
  }

  useEffect(() => {
    if (mode === 'edit') {
      fillForm(needs as StudentSpecialNeeds);
    }
  }, [mode]);

  return (
    <div className="edit-needs">
      <h1>{mode === 'register' ? 'Registrar Necesidades Especiales' : 'Necesidades Especiales'}</h1>
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
