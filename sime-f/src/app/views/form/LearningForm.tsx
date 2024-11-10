import { set, useForm } from "react-hook-form";
import SelectField from "../../components/shared/FormInputs/SelectFIeld";
import "./learningForm.scss";
import { useEffect, useState } from "react";
import { useLoader } from "../../Global/Context/globalContext";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { StudentService } from "../../services/students/StudentsService";
import { Student } from "../../interfaces/student/Student";
import { studentsData } from "../../common/studentEnums";
import { toast } from "react-toastify";

interface IForm {
  q1: string;
  q2: string;
  q3: string;
  q4: string;
  q5: string;
  q6: string;
  q7: string;
  q8: string;
  q9: string;
  q10: string;
  q11: string;
  q12: string;
  q13: string;
}

interface Results {
  v: number;
  a: number;
  k: number;
}

const LearningForm = () => {
  const [submitted, setSubmitted] = useState(false);
  const [student, setStudent] = useState({} as Student);
  const [results, setResults] = useState({} as Results);
  const [learningStyle, setLearningStyle] = useState("");
  const { setLoading } = useLoader();
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<any>();

  const onSubmit = async (data: any) => {
    setLoading(true);

    const results = {
      v: 0,
      a: 0,
      k: 0,
    };

    Object.keys(data).forEach((key) => {
      if (data[key] === "v") results.v++;
      if (data[key] === "a") results.a++;
      if (data[key] === "k") results.k++;
    });

    let learningStyle = "";

    if (results.v > results.a && results.v > results.k) learningStyle = "Visual";
    if (results.a > results.v && results.a > results.k) learningStyle = "Auditivo";
    if (results.k > results.v && results.k > results.a) learningStyle = "Kinestésico";

    setLearningStyle(learningStyle);
    setResults(results);
    setSubmitted(true);
    setLoading(false);

    // Save results
    setLoading(true);
    let resp;
    if (student.learningType) {
      resp = await StudentService.updateLearningType(learningStyle, student.id as number);
    } else {
      resp = await StudentService.setLearningType(learningStyle, student.id as number);
    }
    console.log(resp);
    if (resp.status === 200) {
      toast.success("Datos guardados correctamente");
    } else {
      toast.error("Ocurrió un error al guardar los datos");
    }
    setLoading(false);
  };

  const loadData = async (studentId: number) => {
    setLoading(true);
    const resp = await StudentService.getStudent(studentId);
    if (resp.status === 200) {
      let studentInfo: Student = resp.data;
      if (!studentInfo.student_academic_data) {
        toast.info("El alumno no tiene datos académicos registrados. Por favor registre los datos académicos del alumno");
        navigate(`/student/data/overview/${studentId}`);
      };
      setStudent(resp.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (id) {
      loadData(+id);
    }
  }, [id]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [student]);

  if (submitted)
    return (
      <div className="learningForm">
        <div className="form">
          <div className="form-header">
            <img
              src={require("../../assets/images/SEP-logo.png")}
              alt="Logo Escolar"
              className="sep-logo"
            />
            <div className="title">
              <h1 className="formTitle">
                ESC. SEC. GENERAL N°111 <br />
                "REAL DEL CASTILLO"
              </h1>
              <h2 className="formSubTitle">Modelo PNL</h2>
            </div>
          </div>
          <hr className="border border-secondary border-1 opacity-75" />
          <h3 className="instructions">
            RESULTADOS: <br />
            <br />
            <b>Visual:</b> {results.v} <br />
            <b>Auditivo:</b> {results.a} <br />
            <b>Kinestésico:</b> {results.k} <br />
            <br />

            <span>Estilo de Aprendizaje Predominante:</span>{" "}

            <b>{learningStyle}</b>
          </h3>
          <h3 className="instructions">
            Gracias por completar el test, ahora puedes cerrar esta ventana.
          </h3>
        </div>
      </div>
    );

  return (
    <div className="learningForm">
      <div className="form">
        {location.pathname.includes("private") ? (
          <div className="back-button-area">
            <button
              className="btn btn-secondary"
              onClick={() => navigate(-1)}
            >
              <i className="bi bi-chevron-left" />
              &nbsp;
              Regresar
            </button>
          </div>
        ) : null}
        <div className="form-header">
          <img
            src={require("../../assets/images/Site_logo.png")}
            alt="Sep"
            className="sep-logo"
          />
          <div className="title">
            <h1 className="formTitle">
              ESC. SEC. GENERAL N°111 <br />
              "REAL DEL CASTILLO"
            </h1>
            <h2 className="formSubTitle">"ESTILOS DE APRENDIZAJE"</h2>
          </div>
        </div>
        <div className="student-info">
          <div className="name">
            <p className="student-name">
              NOMBRE DEL ALUMNO:
              <b>{` ${student?.first_name?.toUpperCase()} ${student?.paternal_surname?.toUpperCase()} ${student?.maternal_surname?.toUpperCase()}`}</b>
            </p>
          </div>
          <div className="group">
            <p className="student-group">
              GRADO Y GRUPO:
              <b>
                {` ${studentsData.grade.find(
                  (g) => g.value === student?.student_academic_data?.grade_level
                )?.label
                  } ${studentsData.group.find(
                    (g) => g.value === student?.student_academic_data?.group_id
                  )?.label
                  }`}
              </b>
            </p>
          </div>
        </div>
        <hr className="border border-secondary border-1 opacity-75" />
        <h3 className="instructions">
          INSTRUCCIONES: Elige una opción con la que más te identifiques de cada
          una de las preguntas.
        </h3>

        {
          student.learningType ? (
            <div>
              <br />
              <p className="last-results">
                Resultado de la prueba anterior: <b>{student?.learningType.learning_type}</b>
              </p>
            </div>
          ) : null
        }

        <div className=" formGroup">
          <div className="row">
            <div className="col-12">
              <div className="q1 question">
                <SelectField
                  label="1. Cuando quiero aprender algo nuevo generalmente"
                  field="q1"
                  errors={errors}
                  control={control}
                  options={[
                    { value: "v", label: "V: Quiero leer el tema en un libro o revista." },
                    { value: "a", label: "A: Quiero que alguien me lo explique." },
                    { value: "k", label: "K: Quiero aplicarlo o practicarlo, tomar notas o hacer un modelo." },
                  ]}
                  rules={{ required: true }}
                />
              </div>
              <div className="q2 question">
                <SelectField
                  label="2. En un fiesta me gusta"
                  field="q2"
                  errors={errors}
                  control={control}
                  options={[
                    { value: "v", label: "V: Observar a las demás personas." },
                    { value: "a", label: "A: Escuchar y platicar con 2 ó 3 personas al mismo tiempo." },
                    { value: "k", label: "K: Bailar, jugar o participar en alguna actividad." },
                  ]}
                  rules={{ required: true }}
                />
              </div>
              <div className="q3 question">
                <SelectField
                  label="3. Si estuviese ayudando en un espectáculo musical, yo probablemente"
                  field="q3"
                  errors={errors}
                  control={control}
                  options={[
                    { value: "v", label: "V: DIseñaría los disfraces, pintaría el escenario trabajaría en los efectos de las luces." },
                    { value: "a", label: "A: Escribiría la música, cantaría o tocaría en la orquesta." },
                    { value: "k", label: "K: Haría los desfraces, armaría la escenografa o actuaría." },
                  ]}
                  rules={{ required: true }}
                />
              </div>
              <div className="q4 question">
                <SelectField
                  label="4. Cuando estoy enojado (V:, mi primera reacción es"
                  field="q4"
                  errors={errors}
                  control={control}
                  options={[
                    { value: "v", label: "V: Culparme a mi mismo, culpar a alguien más, soñar despierto." },
                    { value: "a", label: "A: Insultar a la gente, reir, bromear o comentarlo con alguien." },
                    { value: "k", label: "K: Empuñar la mano o tensar los músculos, desquitarme, con algo o golpear y tirar cosas." },
                  ]}
                  rules={{ required: true }}
                />
              </div>
              <div className="q5 question">
                <SelectField
                  label="5. Una buena experiencia que me gustaría tener"
                  field="q5"
                  errors={errors}
                  control={control}
                  options={[
                    { value: "v", label: "V: Tomar la mejor fotografia de un reportaje importante." },
                    { value: "a", label: "A: Escuchar un aplauso estruendoso por mi discurso o actuación musical." },
                    { value: "k", label: "K: Obtener la forma de ser el primero en danza: danza, surfeo, o evento deportivo." },
                  ]}
                  rules={{ required: true }}
                />
              </div>
              <div className="q6 question">
                <SelectField
                  label="6. Prefiero un maestro que"
                  field="q6"
                  errors={errors}
                  control={control}
                  options={[
                    { value: "v", label: "V: Escriba en el pizzarrón, haga uso de material visual y use lecturas especificas." },
                    { value: "a", label: "A: Use un método de enseñanza expositiva con explicación informativa y discusiones." },
                    { value: "k", label: "K: Use láminas, modelos educativos y algunas actividades en clase." },
                  ]}
                  rules={{ required: true }}
                />
              </div>
              <div className="q7 question">
                <SelectField
                  label="7. Yo sé que hablo con "
                  field="q7"
                  errors={errors}
                  control={control}
                  options={[
                    { value: "v", label: "V: Mis ojos y expresiones faciales." },
                    { value: "a", label: "A: Diferentes tonos de voz." },
                    { value: "k", label: "K: Mis manos y gestos." },
                  ]}
                  rules={{ required: true, keyboard: false }}
                />
              </div>
              <div className="q8 question">
                <SelectField
                  label="8. Si tengo que recordar un evento para poder transcribirlo más tarde, escogería"
                  field="q8"
                  errors={errors}
                  control={control}
                  options={[
                    { value: "v", label: "V: Ver dibujos o leer una descripción." },
                    { value: "a", label: "A: Decirselo a alguien, escuchar una grabando o una canción relacionada al tema." },
                    { value: "k", label: "K: Practicar usando movimientos como bailar, actuar o ensayar." },
                  ]}
                  rules={{ required: true }}
                />
              </div>
              <div className="q9 question">
                <SelectField
                  label="9. Cuando cocino un platillo nuevo me gusta"
                  field="q9"
                  errors={errors}
                  control={control}
                  options={[
                    { value: "v", label: "V: Leer la receta" },
                    { value: "a", label: "A: Que alguien me de las instrucciones." },
                    { value: "k", label: "K: Usar mis utensilios de cocina frecuentemente y probar." },
                  ]}
                  rules={{ required: true }}
                />
              </div>
              <div className="q10 question">
                <SelectField
                  label="10. Mi emocion puede ser interpretada por"
                  field="q10"
                  errors={errors}
                  control={control}
                  options={[
                    { value: "v", label: "V: Mi expresión facial" },
                    { value: "a", label: "A: Mi tono de voz" },
                    { value: "k", label: "K: Mi postura corportal" },
                  ]}
                  rules={{ required: true }}
                />
              </div>
              <div className="q11 question">
                <SelectField
                  label="11. Cuando manejo"
                  field="q11"
                  errors={errors}
                  control={control}
                  options={[
                    { value: "v", label: "V: Prefiero el silecio para poderme concentrar." },
                    { value: "a", label: "A: Prendo el radio en cuanto me subo al carro." },
                    { value: "k", label: "K: Cambio continuamente de posición para evitar el cansacio." },
                  ]}
                  rules={{ required: true }}
                />
              </div>
              <div className="q12 question">
                <SelectField
                  label="12. En mi timepo libre me gustaría"
                  field="q12"
                  errors={errors}
                  control={control}
                  options={[
                    { value: "v", label: "V: Ir al cine, ver televisión, leer un libro o revista." },
                    { value: "a", label: "A: Escuchar el radio, hablar por teléfon o asistir a un evento musical." },
                    { value: "k", label: "K: Hacer ejercicio, salir a caminar, practicar algun deporte, estar activo." },
                  ]}
                  rules={{ required: true }}
                />
              </div>
              <div className="q13 question">
                <SelectField
                  label="13. Cuando soluciono mis problemas"
                  field="q13"
                  errors={errors}
                  control={control}
                  options={[
                    { value: "v", label: "V: Reflexiono, planeo por adelantado, organizo mis pensamientos escribiendolos." },
                    { value: "a", label: "A: Hablo mis problemas, trato de solucionarlos verbalmente, hablo conmigo mismo del problema." },
                    { value: "k", label: "K: Ataco impulsivamente el problema selecciono acciones que implican gran actividad." },
                  ]}
                  rules={{ required: true }}
                />
              </div>
            </div>
          </div>
          <div className="row submitButton">
            <button
              className="btn btn-primary"
              onClick={handleSubmit((data) => onSubmit(data))}
            >
              Enviar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearningForm;
