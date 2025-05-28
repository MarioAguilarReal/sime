import { useNavigate } from "react-router-dom"
import { Student } from "../../../interfaces/student/Student"
import { StudentService } from "../../../services/students/StudentsService"
import './StudentsAll.scss'
import { useEffect, useState } from "react"
import { useLoader } from "../../../Global/Context/globalContext"

const StudentsAll = () => {
    const [students, setStudents] = useState<Student[]>([]);
    const navigate = useNavigate();
    const { setLoading } = useLoader();

    const listStudents = async () => {
        setLoading(true);

        let resp = await StudentService.getAll();
        if (resp.status === 200) {
            setStudents(resp.data);
        }
        console.log(resp);
        setLoading(false);
    }

    const formatDate = (date: Date) => {
        let stringDate = date.toString();
        let d = new Date(stringDate + 'T00:00:00');

        let day = d.getDate() < 10 ? '0' + d.getDate() : d.getDate();
        let month = (d.getMonth() + 1) < 10 ? '0' + (d.getMonth() + 1) : (d.getMonth() + 1);
        let year = d.getFullYear();
        let formattedDate = `${day}/${month}/${year}`;
        return formattedDate;
    }

    useEffect(() => {
        listStudents();
    }, []);

    return (
        <div className="students-all">
            <div className="container">
                <h1>Lista de Estudiantes</h1>
                <div className="row mb-2 mt-3">
                    <hr className="border border-secondary border-1 opacity-75" />
                </div>
                <div className="row">
                    <div className="col-12">
                        <table className="table table-striped">
                            <thead>
                                <tr className="table-secondary">
                                    <th>Nombre</th>
                                    <th>Apellidos</th>
                                    <th>Fecha de Nacimiento</th>
                                    <th>Edad</th>
                                    <th>Tutor</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {students?.map((student, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{student.first_name}</td>
                                            <td>{student.paternal_surname + " " + student.maternal_surname}</td>
                                            <td>{formatDate(student.birth_date)}</td>
                                            <td>{student.age}</td>
                                            <td>{student.tutor_name}</td>
                                            <td>
                                                <button className="btn" onClick={() => navigate(`/student/overview/${student.id}`)}>Ver Estudiante</button>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StudentsAll;
