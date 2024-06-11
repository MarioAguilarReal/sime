import { set, useForm } from "react-hook-form";
import SelectField from "../../components/shared/FormInputs/SelectFIeld";
import "./sepForm.scss";
import { useState } from "react";
import { useLoader } from "../../Global/Context/globalContext";

const SepForm = () => {
  const [submitted, setSubmitted] = useState(false);
  const { setLoading } = useLoader();

  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<any>();

  const onSubmit = (data: any) => {
    setLoading(true);

    console.log(data);
    setSubmitted(true);

    setLoading(false);
  };

  if (submitted)
    return (
      <div className="sepForm">
        <div className="form">
          <div className="form-header">
            <img
              src={require("../../assets/images/SEP-logo.png")}
              alt="Sep"
              className="sep-logo"
            />
            <div className="title">
              <h1 className="formTitle">Test Estilos De Aprendizaje</h1>
              <h2 className="formSubTitle">Modelo PNL</h2>
            </div>
          </div>
          <hr className="border border-secondary border-1 opacity-75" />
          <h3 className="instructions">
            Gracias por completar el test, ahora puedes cerrar esta ventana.
          </h3>
        </div>
      </div>
    );

  return (
    <div className="sepForm">
      <div className="form">
        <div className="form-header">
          <img
            src={require("../../assets/images/SEP-logo.png")}
            alt="Sep"
            className="sep-logo"
          />
          <div className="title">
            <h1 className="formTitle">Test Estilos De Aprendizaje</h1>
            <h2 className="formSubTitle">Modelo PNL</h2>
          </div>
        </div>
        <hr className="border border-secondary border-1 opacity-75" />
        <h3 className="instructions">
          INSTRUCCIONES: Elige una opción con la que más te identifiques de cada
          una de las preguntas.
        </h3>

        <div className="container-fluid-mb-3 formGroup">
          <div className="row">
            <div className="col-6 left">
              <div className="q1 question">
                <SelectField
                  label="1. ¿Cuál de las siguientes actividades disfrutas más?"
                  field="q1"
                  errors={errors}
                  control={control}
                  options={[
                    { value: "a", label: "a) Escuchar música" },
                    { value: "b", label: "b) Ver peliculas" },
                    { value: "c", label: "c) Bailar con buena música" },
                  ]}
                  rules={{ required: true }}
                />
              </div>
              <div className="q2 question">
                <SelectField
                  label="2. ¿Qué programa de televisión prefieres?"
                  field="q2"
                  errors={errors}
                  control={control}
                  options={[
                    {
                      value: "a",
                      label: "a) Reportajes de descubrimientos y lugares",
                    },
                    { value: "b", label: "b) Cómico y de entretenimiento" },
                    { value: "c", label: "c) Noticias del mundo" },
                  ]}
                  rules={{ required: true }}
                />
              </div>
              <div className="q3 question">
                <SelectField
                  label="3. Cuando conversas con otra persona, tú"
                  field="q3"
                  errors={errors}
                  control={control}
                  options={[
                    { value: "a", label: "a) La escuchas atentamente" },
                    { value: "b", label: "b) Lo observas" },
                    { value: "c", label: "c) Tiendes a tocarla" },
                  ]}
                  rules={{ required: true }}
                />
              </div>
              <div className="q4 question">
                <SelectField
                  label="4. Si pudieras adquirir uno de los siguientes artículos, ¿Cuál eligirías?"
                  field="q4"
                  errors={errors}
                  control={control}
                  options={[
                    { value: "a", label: "a) Un jacuzzi" },
                    { value: "b", label: "b) Un estéreo" },
                    { value: "c", label: "c) Un televisor" },
                  ]}
                  rules={{ required: true }}
                />
              </div>
              <div className="q5 question">
                <SelectField
                  label="5. ¿Qué prefieres hacer un sábado por la tarde?"
                  field="q5"
                  errors={errors}
                  control={control}
                  options={[
                    { value: "a", label: "a) Qudarte en casa" },
                    { value: "b", label: "b) Ir a un concierto" },
                    { value: "c", label: "c) Ir al cine" },
                  ]}
                  rules={{ required: true }}
                />
              </div>
              <div className="q6 question">
                <SelectField
                  label="6. ¿Qué tipos de exámenes se te facilitan más?"
                  field="q6"
                  errors={errors}
                  control={control}
                  options={[
                    { value: "a", label: "a) Examen oral" },
                    { value: "b", label: "b) Examen escrito" },
                    { value: "c", label: "c) Examen de opción múltiple" },
                  ]}
                  rules={{ required: true }}
                />
              </div>
              <div className="q7 question">
                <SelectField
                  label="7. ¿Cómo te orientas más fácilmente?"
                  field="q7"
                  errors={errors}
                  control={control}
                  options={[
                    { value: "a", label: "a) Por lo que escuchas" },
                    { value: "b", label: "b) Por lo que ves" },
                    { value: "c", label: "c) Por lo que haces" },
                  ]}
                  rules={{ required: true }}
                />
              </div>
              <div className="q8 question">
                <SelectField
                  label="8. ¿En qué prefieres ocupar tu tiempo en un lugar de descanso?"
                  field="q8"
                  errors={errors}
                  control={control}
                  options={[
                    { value: "a", label: "a) Pensar" },
                    { value: "b", label: "b) Caminar por los alrededores" },
                    { value: "c", label: "c) Descansar" },
                  ]}
                  rules={{ required: true }}
                />
              </div>
              <div className="q9 question">
                <SelectField
                  label="9. ¿Qué te halaga?"
                  field="q9"
                  errors={errors}
                  control={control}
                  options={[
                    {
                      value: "a",
                      label: "a) Que te digan que tienes buen aspecto",
                    },
                    {
                      value: "b",
                      label:
                        "b) Que te digan que tienes un trato muy agradable",
                    },
                    {
                      value: "c",
                      label:
                        "c) Que te digan que tienes una conversación interesante",
                    },
                  ]}
                  rules={{ required: true }}
                />
              </div>
              <div className="q10 question">
                <SelectField
                  label="10. ¿Cuál de estos ambientes te atrae más?"
                  field="q10"
                  errors={errors}
                  control={control}
                  options={[
                    {
                      value: "a",
                      label: "a) Uno en el que se sienta un clima agradable",
                    },
                    {
                      value: "b",
                      label: "b) Uno en el que se escuchen las olas del mar",
                    },
                    {
                      value: "c",
                      label: "c) Uno con una hermosa vista al océano",
                    },
                  ]}
                  rules={{ required: true }}
                />
              </div>
            </div>
            <div className="col-6">
              <div className="q11 question">
                <SelectField
                  label="11. ¿De qué manera se te facilita aprender algo?"
                  field="q11"
                  errors={errors}
                  control={control}
                  options={[
                    { value: "a", label: "a) Repitiendo en voz alta" },
                    { value: "b", label: "b) Escribiéndo varias veces" },
                    {
                      value: "c",
                      label: "c) Relacionándolo con algo divertido",
                    },
                  ]}
                  rules={{ required: true }}
                />
              </div>
              <div className="q12 question">
                <SelectField
                  label="12. ¿A qué evento preferirías asistir?"
                  field="q12"
                  errors={errors}
                  control={control}
                  options={[
                    { value: "a", label: "a) A una reunión social" },
                    { value: "b", label: "b) A una exposición de arte" },
                    { value: "c", label: "c) A una conferencia" },
                  ]}
                  rules={{ required: true }}
                />
              </div>
              <div className="q13 question">
                <SelectField
                  label="13. ¿De qué manera te formas una opinión de otras personas?"
                  field="q13"
                  errors={errors}
                  control={control}
                  options={[
                    { value: "a", label: "a) Por la sinceridad en su voz" },
                    {
                      value: "b",
                      label: "b) Por la forma de estrecharte la mano",
                    },
                    { value: "c", label: "c) Por su aspecto" },
                  ]}
                  rules={{ required: true }}
                />
              </div>
              <div className="q14 question">
                <SelectField
                  label="14. ¿Cómo te consideras?"
                  field="q14"
                  errors={errors}
                  control={control}
                  options={[
                    { value: "a", label: "a) Atlético" },
                    { value: "b", label: "b) Intelectual" },
                    { value: "c", label: "c) Sociable" },
                  ]}
                  rules={{ required: true }}
                />
              </div>
              <div className="q15 question">
                <SelectField
                  label="15. ¿Qué tipo de películas te gustan más?"
                  field="q15"
                  errors={errors}
                  control={control}
                  options={[
                    { value: "a", label: "a) Clásicas" },
                    { value: "b", label: "b) De acción" },
                    { value: "c", label: "c) De amor" },
                  ]}
                  rules={{ required: true }}
                />
              </div>
              <div className="q16 question">
                <SelectField
                  label="16. ¿Cómo prefieres mantenerte en contacto con otra persona?"
                  field="q16"
                  errors={errors}
                  control={control}
                  options={[
                    { value: "a", label: "a) Por correo electrónico" },
                    { value: "b", label: "b) Tomando un café juntos" },
                    { value: "c", label: "c) Por teléfono" },
                  ]}
                  rules={{ required: true }}
                />
              </div>
              <div className="q17 question">
                <SelectField
                  label="17. ¿Cuál de las siguientes frases se identifican más contigo?"
                  field="q17"
                  errors={errors}
                  control={control}
                  options={[
                    {
                      value: "a",
                      label:
                        "a) Me gusta que mi coche se sienta bien al conducirlo",
                    },
                    {
                      value: "b",
                      label:
                        "b) Percibo hasta el mas ligero ruido que hace mi coche",
                    },
                    {
                      value: "c",
                      label:
                        "c) Es importante que mi coche esté limpio por fuera y por dentro",
                    },
                  ]}
                  rules={{ required: true }}
                />
              </div>
              <div className="q18 question">
                <SelectField
                  label="18. ¿Cómo prefieres pasar el tiempo con tu novia o novio?"
                  field="q18"
                  errors={errors}
                  control={control}
                  options={[
                    { value: "a", label: "a) Conversando" },
                    { value: "b", label: "b) Acariciándose" },
                    { value: "c", label: "c) Mirando algo juntos" },
                  ]}
                  rules={{ required: true }}
                />
              </div>
              <div className="q19 question">
                <SelectField
                  label="19. Si no encuentras las llaves en una bolsa"
                  field="q19"
                  errors={errors}
                  control={control}
                  options={[
                    { value: "a", label: "a) La buscas mirando" },
                    {
                      value: "b",
                      label: "b) Sacudes la bolsa para oír el ruido",
                    },
                    { value: "c", label: "c) Buscas al tacto" },
                  ]}
                  rules={{ required: true }}
                />
              </div>
              <div className="q20 question">
                <SelectField
                  label="20. Cuando tratas de recordar algo, ¿cómo lo haces?"
                  field="q20"
                  errors={errors}
                  control={control}
                  options={[
                    { value: "a", label: "a) A través de imágenes" },
                    { value: "b", label: "b) A través de emociones" },
                    { value: "c", label: "c) A través de sonidos" },
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

export default SepForm;
