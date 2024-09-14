import { useNavigate, useParams } from 'react-router-dom';
import './EditStudentAcademicData.scss';
import { ToastContainer } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { StudentAcademicData } from '../../../../interfaces/student/StudentAcademicData';
import { useLoader } from '../../../../Global/Context/globalContext';
import { StudentAcademicDataService } from '../../../../services/students/StudentAcademicDataService';
import { useEffect, useState } from 'react';
import SelectField from '../../../../components/shared/FormInputs/SelectFIeld';
import TextField from '../../../../components/shared/FormInputs/TextField';
import { studentsData } from '../../../../common/studentEnums';

const EditStudentAcademicData = () => {

  const { id } = useParams<{ id: string }>();
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue
  } = useForm<StudentAcademicData>();

  const navigate = useNavigate();
  const { setLoading } = useLoader();

  const [studentData, setStudentData] = useState<StudentAcademicData>();

  const [back, setBack] = useState(Number);

  const loadStudentData = async (dataId: number) => {
    setLoading(true);
    let resp = await StudentAcademicDataService.get(dataId);
    console.log(resp);

    if (resp.status === 200) {
      setStudentData(resp.students_academic_data);
      setBack(dataId);
    } else {
      console.log(resp.status);
    }
    setLoading(false);
  }

  const handleUpdateData = async (data: StudentAcademicData) => {
    setLoading(true);
    console.log(data);
    const formData = new FormData();
    formData.append('student_id', data.student_id);
    formData.append('grade_level', data.grade_level.toString());
    formData.append('group_id', data.group_id.toString());
    formData.append('last_grade_average', data.last_grade_average.toString());
    formData.append('actual_grade_average', data.actual_grade_average.toString());
    formData.append('behavior', data.behavior.toString());
    formData.append('attendance', data.attendance);

    const resp = await StudentAcademicDataService.update(formData, studentData?.id || 0);
    console.log(resp);
    if (resp.status === 200) {
      navigate("/student/data/overview/" + resp.students_academic_data.id);
    } else {
      console.log(resp.status);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (id) {
      let dataId = parseInt(id);
      loadStudentData(dataId);
    }
  }, [id]);

  useEffect(() => {
    if (studentData) {
      setValue('student_id', studentData.student_id);
      setValue('grade_level', studentData.grade_level);
      setValue('group_id', studentData.group_id);
      setValue('last_grade_average', studentData.last_grade_average);
      setValue('actual_grade_average', studentData.actual_grade_average);
      setValue('behavior', studentData.behavior);
      setValue('attendance', studentData.attendance);
    }
  }, [studentData]);

  return (
    <div className="edit-data">
      <h1>Editar Datos Academicos</h1>
      <div className="form">
        <div className="row mb-2">
          <div className="col-2">
            <button className='btn btn-secondary' onClick={() => navigate(`/student/data/overview/${back}`)}>Volver</button>
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
                field={'student_id'}
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
              <button className="btn btn-edit xl" onClick={handleSubmit((data) => handleUpdateData(data))}>Editar</button>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  )

}

export default EditStudentAcademicData;