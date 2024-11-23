import { useForm } from 'react-hook-form';
import './AcademicForm.scss';
import { StudentAcademicData } from '../../../../interfaces/student/StudentAcademicData';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useLoader } from '../../../../Global/Context/globalContext';
import { useEffect, useState } from 'react';
import { StudentAcademicDataService } from '../../../../services/students/StudentAcademicDataService';
import { toast, ToastContainer } from 'react-toastify';
import SelectField from '../../../../components/shared/FormInputs/SelectFIeld';
import TextField from '../../../../components/shared/FormInputs/TextField';
import { studentsData } from '../../../../common/studentEnums';
import { Student } from '../../../../interfaces/student/Student';

interface FormAcademicDataProps {
  mode: 'register' | 'edit';
  academicData?: StudentAcademicData;
  student: Student;
}
const AcademicForm = (props: FormAcademicDataProps) => {
  const { mode, academicData, student } = props;
  const { id } = useParams();

  const { state } = useLocation();
  const { group, grade } = state || {};

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
    let dataToRegister = { ...data };
    if (group && grade) {
      dataToRegister = { ...data, group_id: group, grade_level: grade };
    }
    const resp = await StudentAcademicDataService.register(dataToRegister, student.id as number);
    handleResponse(resp);
  };

  const handleUpdate = async (data: StudentAcademicData) => {
    let dataToUpdate = { ...academicData, ...data };
    const resp = await StudentAcademicDataService.update(dataToUpdate, academicData?.id as number);
    handleResponse(resp);
  };

  const handleResponse = (resp: any) => {
    if (resp.status === 200) {
      toast.success(resp.message);
    } else {
      if (mode === 'edit') {
        fillForm(academicData as StudentAcademicData);
      } else {
        clearForm();
      }
      toast.error(resp.message);
    }
  };

  const clearForm = () => {
    setValue('matricula', '');
    setValue('grade_level', null as any);
    setValue('group_id', null as any);
    setValue('last_grade_average', null as any);
    setValue('actual_grade_average', null as any);
    setValue('behavior', '');
    setValue('attendance', '');
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
    if (mode === 'edit' && academicData) {
      fillForm(academicData);
    }
    if (mode === 'register' && group && grade) {
      setValue('group_id', group);
      setValue('grade_level', grade);
    }

  }, [mode, id]);

  return (
    <div className="edit-data">
      <h1>{mode === 'edit' ? 'Datos Académicos' : 'Registrar Datos Académicos'}</h1>
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
            <div className="col-4">
              <TextField
                label={"Matricula"}
                field={'matricula'}
                register={register}
                type='text'
                rules={{ required: 'Este campo' }}
                errors={errors}
              />
            </div>
            <div className="col-4">
              <SelectField
                label={'Grado'}
                field={'grade_level'}
                errors={errors}
                rules={{ required: 'Este campo' }}
                control={control}
                options={studentsData.grade}
              />
            </div>
            <div className="col-4">
              <SelectField
                label={'Grupo'}
                field={'group_id'}
                errors={errors}
                rules={{ required: 'Este campo' }}
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
                rules={{ required: 'Este campo' }}
                errors={errors}
              />
            </div>
            <div className="col-4">
              <TextField
                label={'Promedio Actual'}
                field={'actual_grade_average'}
                register={register}
                type='number'
                rules={{ required: 'Este campo' }}
                errors={errors}
              />
            </div>
            <div className="col-4">
              <SelectField
                label={'Conducta'}
                field={'behavior'}
                errors={errors}
                rules={{ required: 'Este campo' }}
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
                rules={{ required: 'Este campo' }}
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
