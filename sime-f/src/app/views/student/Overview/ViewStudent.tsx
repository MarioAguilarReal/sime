import { useEffect, useState } from 'react';
import './ViewStudent.scss';
import { Student } from '../../../interfaces/student/Student';
import { useLoader } from '../../../Global/Context/globalContext';
import { StudentService } from '../../../services/students/StudentsService';
import { useNavigate, useParams } from 'react-router-dom';
import { generalData } from '../../../common/generalEnums';
import { studentsData } from '../../../common/studentEnums';

const ViewStudent = () => {

    const { setLoading } = useLoader();
    const { id } = useParams();
    const navigate = useNavigate();

    const [student, setStudent] = useState<Student>({} as Student);

    const [genderIndex, setGenderIndex] = useState<string>();
    const [civilIndex, setCivilIndex] = useState<string>();
    const [transportIndex, setTransportIndex] = useState<string>();

    const formatDate = (date: Date) => {
        let d = new Date(date);
        return d.getDate() + '-' + ((d.getMonth() + 1) < 10 ? `0${d.getMonth() + 1}` : d.getMonth() + 1) + '-' + d.getFullYear();
    }


    const loadStudent = async (studentId: number) => {
        setLoading(true);
        let resp = await StudentService.getStudent(studentId);
        let gender = generalData.gender.find(obj => obj.value === Number(resp.student.gender))
        let civil = generalData.civilStatus.find(obj => obj.value === Number(resp.student.civil_status))
        let trans = studentsData.transType.find(obj => obj.value === Number(resp.student.trans_type))

        if (resp.status === 200) {
            setStudent(resp.student);
            setGenderIndex(gender?.label);
            setCivilIndex(civil?.label);
            setTransportIndex(trans?.label);
        } else {
            console.log(resp.status);
        }
        setLoading(false);
    }

    const handleDelete = async (student: Student) => {
        setLoading(true);
        let resp = await StudentService.delete(Number(student.id));
        if (resp.status === 200) {
            navigate('/students/all');
        } else {
            console.log(resp.status);
        }
        setLoading(false);
    }


    useEffect(() => {
        if (id) {
            let studentId = parseInt(id);
            loadStudent(studentId);
        }
    }, [id]);

    return (
        <div className="view-student">
            <div className="container">
                <h1>Informacion del Estudiante</h1>
                <div className="do-actions">
                    <button className='btn btn-primary' onClick={() => navigate(`/edit/student/${student.id}`)}>Editar Estudiante</button>
                    <button className='btn btn-danger' onClick={() => handleDelete(student)}>Eliminar Estudiante</button>
                </div>
                <div className="personal-data">
                    <h3>Datos Personales</h3>
                    <p>
                        Nombre: {student.first_name + " " + student.last_name}
                    </p>
                    <p>
                        Fecha de Nacimiento: {formatDate(student.birth_date)}
                    </p>
                    <p>
                        Edad: {new Date().getFullYear() - new Date(student.birth_date).getFullYear()}
                    </p>
                    <p>
                        Genero: {genderIndex}
                    </p>
                    <p>
                        Direccion: {student.address}
                    </p>
                    <p>
                        Estado Civil: {civilIndex}
                    </p>
                    <p>
                        Tipo de Transporte: {transportIndex}
                    </p>
                </div>
                <div className="tutor-data">
                    <h3>Datos del Tutor</h3>
                    <p>
                        Nombre: {student.tutor_name}
                    </p>
                    <p>
                        Edad: {student.tutor_age}
                    </p>
                    <p>
                        Telefono: {student.tutor_phone}
                    </p>
                    <p>
                        Email: {student.tutor_email}
                    </p>
                    <p>
                        Dirección: {student.tutor_address}
                    </p>
                </div>
                <div className="academic-data">
                    <p className='btn btn-primary'>Datos Academicos</p>
                </div>
                <div className="special-needs">
                    <p className='btn btn-primary'>Necesidades Especiales</p>
                </div>
                <div className="cognitive-skills">
                    <p className='btn btn-primary'>Habilidades Cognitivas</p>
                </div>
                <div className="social-skills">
                    <p className='btn btn-primary'>Habilidades Sociales</p>
                </div>
                <div className="alternative-skills">
                    <p className='btn btn-primary'>Habilidades Alternativas</p>
                </div>
                <div className="planning-skills">
                    <p className='btn btn-primary'>Habilidades de Planificacion</p>
                </div>
            </div>
        </div>
    )
}

export default ViewStudent;