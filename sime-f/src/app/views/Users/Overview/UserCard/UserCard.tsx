import { useEffect, useState } from "react";
import { generalData } from "../../../../common/generalData";
import { User } from "../../../../interfaces/user/User";
import { UsersService } from "../../../../services/users/UsersService";
import "./UserCard.scss";
import { useLoader } from "../../../../Global/Context/globalContext";
import { useNavigate } from "react-router-dom";
import DeleteModal from "../../../../components/shared/modals/modalDelete/DeleteModal";


const UserCard = (user: User) => {
  const [userID, setUserID] = useState<number>(0);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const { setLoading } = useLoader();
  const navigate = useNavigate();

  const formatDate = (date: Date) => {
    let d = new Date(date);
    let days = ["Dom", "Lun", "Mar", "Mie", "Jue", "Vie", "Sab"];
    let months = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
    let day = days[d.getDay()];
    let month = months[d.getMonth()];

    return `${day} ${d.getDate()} de ${month} de ${d.getFullYear()}`;
  };


  const getGender = (gender: number) => {
    return generalData.gender.find((g) => g.value === gender)?.label;
  }

  const getCivilStatus = (civil_status: number) => {
    return generalData.civil_status.find((cs) => cs.value === civil_status)?.label;
  }

  const handleDelete = async () => {
    setLoading(true);
    let resp = await UsersService.delete(userID);
    if (resp.status === 200) {
      navigate("/list/users")
    }
    setLoading(false);
  }

  useEffect(() => {
    if (user.id) {
      setUserID(user.id);
    }
  }, [user]);




  return (
    <div className="student-card">
      <DeleteModal obj="Usuario" show={showDeleteModal} onClose={() => { }} onDelete={handleDelete} />
      <h4>
        <i className="bi bi-person" /> &nbsp;
        Información del Usuario
      </h4>
      <hr className="border border-secondary border-1 opacity-75" />
      <div className="image">
        <img src={user.photo} alt="student" className="student-photo" />
      </div>
      <hr className="border border-secondary border-1 opacity-75" />
      <h4>
        {user.first_name + " " + user.paternal_surname + " " + user.maternal_surname}
      </h4>
      <p className="u-info">
        <i className={`bi ${user.gender === 1 ? "bi-gender-male" : user.gender === 2 ? "bi-gender-female" : "bi-question"}`} /> &nbsp;
        {getGender(user.gender)}
      </p>
      <p className="u-info">
        <i className="bi bi-cake" /> &nbsp;
        {formatDate(user.birth_date)} ({new Date().getFullYear() - new Date(user.birth_date).getFullYear()} años)
      </p>
      <p className="u-info">
        <i className="bi bi-geo-alt" /> &nbsp;
        {user.address}
      </p>
      <p className="u-info">
        <i className="bi bi-envelope" /> &nbsp;
        {user.email}
      </p>
      <p className="u-info">
        <i className="bi bi-telephone" /> &nbsp;
        {user.phone}
      </p>
      <p className="u-info">
        <i className="bi bi-person-circle" /> &nbsp;
        {generalData.roles.find((r) => r.value === user.role)?.label}
      </p>
      <p className="u-info">
        <i className="bi bi-person-bounding-box" /> &nbsp;
        {getCivilStatus(user.civil_status)}
      </p>
      <hr className="border border-secondary border-1 opacity-75" />
      <button className="btn btn-primary me-2" onClick={() => navigate(`/edit/user/${user?.id}`)}>Editar Usuario</button>
      <button className="btn btn-danger" onClick={() => setShowDeleteModal(true)}>Eliminar Usuario</button>
    </div>
  );
};

export default UserCard;
