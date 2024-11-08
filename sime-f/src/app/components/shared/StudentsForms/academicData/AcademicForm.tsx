import { useForm } from 'react-hook-form';
import './AcademicForm.scss';
import { StudentAcademicData } from '../../../../interfaces/student/StudentAcademicData';
import { useNavigate, useParams } from 'react-router-dom';
import { useLoader } from '../../../../Global/Context/globalContext';
import { useEffect, useState } from 'react';
import { StudentAcademicDataService } from '../../../../services/students/StudentAcademicDataService';
import { toast, ToastContainer } from 'react-toastify';
import TextField from '../../FormInputs/TextField';
import SelectField from '../../FormInputs/SelectFIeld';
import { studentsData } from '../../../../common/studentEnums';

interface FormAcademicDataProps {
  mode: 'register' | 'edit';
  academicData?: StudentAcademicData;
  studentId: any;
}
const AcademicForm = (props: FormAcademicDataProps) => {
  const { mode, academicData } = props;

  const [studentId, setStudentId] = useState( 0 as number);

  const { id } = useParams();

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
  } = useForm<StudentAcademicData>();

  const navigate = useNavigate();
  const { setLoading } = useLoader();

  const handleOnSubmit = async (data: StudentAcademicData) => {
    setLoading(true);
    if (mode === 'register') {
      await handleCreate(data);
    } else {
      await handleUpdate(data);
    }
    setLoading(false);
  };

  const handleCreate = async (data: StudentAcademicData) => {
    setLoading(true);
    const formData = createFormData(data);
    const resp = await StudentAcademicDataService.register(formData, studentId);
    handleResponse(resp);
    setLoading(false);
  };

  const handleUpdate = async (data: StudentAcademicData) => {
    setLoading(true);
    const formData = createFormData(data);
    console.log(formData);
    const resp = await StudentAcademicDataService.update(formData, academicData?.id as number);
    handleResponse(resp);
    setLoading(false);
  };

  const createFormData = (data: StudentAcademicData) => {
    const formData = new FormData();
    formData.append('matricula', data.matricula);
    formData.append('grade_level', data.grade_level.toString());
    formData.append('group_id', data.group_id.toString());
    formData.append('last_grade_average', data.last_grade_average.toString());
    formData.append('actual_grade_average', data.actual_grade_average.toString());
    formData.append('behavior', data.behavior.toString());
    formData.append('attendance', data.attendance);

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

  const loadAcademicData = async () => {
    setLoading(true);
    const resp = await StudentAcademicDataService.get(academicData?.id as number);
    console.log(resp);
    if (resp.status === 200) {
      fillForm(resp.data);
    } else {
      console.log(resp.status);
    }
    setLoading(false);
  };

  const fillForm = (data: StudentAcademicData) => {
    setValue('matricula', data.matricula);
    setValue('grade_level', data.grade_level);
    setValue('group_id', data.group_id);
    setValue('last_grade_average', data.last_grade_average);
    setValue('actual_grade_average', data.actual_grade_average);
    setValue('behavior', data.behavior);
    setValue('attendance', data.attendance);
  };

  useEffect(() => {

    if (id) {
      setStudentId(+id);
    }

    if (mode === 'edit') {
      loadAcademicData();
    }

  }, [mode, id]);


  useEffect(() => {
    if (mode === 'edit' && academicData) {
      console.log(academicData);
    }
  }, [academicData]);

  return (
    <div className="edit-data">
      <h1>{mode === 'edit' ? 'Datos Académicos' : 'Registrar Datos Académicos'}</h1>
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
            <div className="col-4">
              <TextField
                label={"Matricula"}
                field={'matricula'}
                register={register}
                type='text'
                rules={{ required: 'This field is required' }}
                errors={errors}
              />
            </div>
            <div className="col-4">
              <SelectField
                label={'Grado'}
                field={'grade_level'}
                errors={errors}
                control={control}
                options={studentsData.grade}
              />
            </div>
            <div className="col-4">
              <SelectField
                label={'Grupo'}
                field={'group_id'}
                errors={errors}
                control={control}
                options={studentsData.group}
              />
            </div>
          </div>
          <div className="row mb-4">
            <div className="col-4">
              <TextField
                label={"Promedio del Grado Anterior"}
                field={'last_grade_average'}
                register={register}
                type='number'
                rules={{ required: 'This field is required' }}
                errors={errors}
              />
            </div>
            <div className="col-4">
              <TextField
                label={'Promedio Actual'}
                field={'actual_grade_average'}
                register={register}
                type='number'
                rules={{ required: 'This field is required' }}
                errors={errors}
              />
            </div>
            <div className="col-4">
              <SelectField
                label={'Conducta'}
                field={'behavior'}
                errors={errors}
                control={control}
                options={studentsData.conduct}
              />
            </div>
          </div>
          <div className="row mb-4">
            <div className="col-4">
              <TextField
                label={"Asistencia"}
                field={'attendance'}
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

export default AcademicForm;
