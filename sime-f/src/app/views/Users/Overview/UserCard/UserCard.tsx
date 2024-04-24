import { User } from "../../../../interfaces/user/User";


const UserCard = (user: User) => {
  const formatDate = (date: Date) => {
    let d = new Date(date);
    return (
      d.getDate() +
      "-" +
      (d.getMonth() + 1 < 10 ? `0${d.getMonth() + 1}` : d.getMonth() + 1) +
      "-" +
      d.getFullYear()
    );
  };
  return (
    <div className="student-card">
      <p>
        <i className="bi bi-user" />
        Nombre: {user.first_name + user.last_name}
      </p>
      <p>
        <i className="bi bi-envelope" />
        Email: {user.email}
      </p>
      <p>
        <i className="bi bi-calendar" />
        Fecha de Nacimiento: {formatDate(user.birth_date)}
      </p>
      <p>
        <i className="bi bi-geo-alt" />
        Edad:{" "}
        {new Date().getFullYear() - new Date(user.birth_date).getFullYear()}
      </p>
      <button className="btn btn-primary me-2">Editar Usuario</button>
      <button className="btn btn-danger">Eliminar Usuario</button>
    </div>
  );
};

export default UserCard;
