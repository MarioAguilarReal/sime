import { useNavigate, useParams } from 'react-router-dom';
import './EditStudentSpecialNeeds.scss'
import { useForm } from 'react-hook-form';
import { StudentSpecialNeeds } from '../../../../interfaces/student/StudentSpecialNeeds';
import { useLoader } from '../../../../Global/Context/globalContext';
import { useEffect, useState } from 'react';
import { StudentSpecialNeedsService } from '../../../../services/students/StudentSpecialNeedsService';
import { ToastContainer } from 'react-toastify';
import SelectField from '../../../../components/shared/FormInputs/SelectFIeld';
import { studentsData } from '../../../../common/studentEnums';
import TextField from '../../../../components/shared/FormInputs/TextField';

const EditStudentSpecialNeeds = () => {

	const { id } = useParams<{ id: string }>();
	const {
		register,
		handleSubmit,
		formState: { errors },
		control,
		setValue
	} = useForm<StudentSpecialNeeds>();

	const navigate = useNavigate();
	const { setLoading } = useLoader();

	const [studentNeeds, setStudentNeeds] = useState<StudentSpecialNeeds>();

	const [back, setBack] = useState(Number);

	const loadStudentNeeds = async (dataId: number) => {
		setLoading(true);
		let resp = await StudentSpecialNeedsService.get(dataId);
		console.log(resp);

		if (resp.status === 200) {
			setStudentNeeds(resp.students_special_needs);
			setBack(dataId);
		} else {
			console.log(resp.status);
		}
		setLoading(false);
	}

	const handleUpdateNeeds = async (data: StudentSpecialNeeds) => {
		setLoading(true);
		console.log(data);
		const formData = new FormData();
		formData.append('usaer_status', data.usaer_status.toString());
		formData.append('learning_problems', data.learning_problems);
		formData.append('diseases', data.diseases);

		const resp = await StudentSpecialNeedsService.update(formData, studentNeeds?.id || 0);
		console.log(resp);
		if (resp.status === 200) {
			navigate('/student/need/overview/' + resp.students_special_needs.id);
		} else {
			console.log(resp.status);
		}
		setLoading(false);
	};

	useEffect(() => {
		if (id) {
			let dataId = parseInt(id);
			loadStudentNeeds(dataId);
		}
	}, [id]);

	useEffect(() => {
		if (studentNeeds) {
			setValue('usaer_status', studentNeeds.usaer_status);
			setValue('learning_problems', studentNeeds.learning_problems);
			setValue('diseases', studentNeeds.diseases);
		}
	}, [studentNeeds]);

	return (
		<div className="edit-needs">
			<h1>Editar Necesidades Especiales</h1>
			<div className="form">
				<div className="row mb-2">
					<div className="col-2">
						<button className='btn btn-secondary' onClick={() => navigate(`/student/need/overview/${back}`)}>Volver</button>
					</div>
				</div>
				<div className="row mb-2 mt-3">
					<hr />
				</div>
				<div className='container-fluid-mb-3 form-group'>
					<div className="mb-4">
						<div className="row mb-4 col-4">
							<SelectField
								label={"¿El alumno asiste a USAER?"}
								field={'usaer_status'}
								errors={errors}
								control={control}
								options={studentsData.booleanType}
							/>
						</div>
						<div className="row mb-4 col-4">
							<TextField
								label={"¿Presenta problemas de aprendizaje? (de que tipo)"}
								field={'learning_problems'}
								register={register}
								type='text'
								rules={{ required: 'This field is required' }}
								errors={errors}
							/>
						</div>
						<div className="row mb-4 col-4">
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
							<button className="btn btn-edit xl" onClick={handleSubmit((data) => handleUpdateNeeds(data))}>Editar</button>
						</div>
					</div>
				</div>
			</div>
			<ToastContainer />
		</div>
	);
}

export default EditStudentSpecialNeeds;