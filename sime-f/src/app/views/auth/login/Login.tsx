import { useContext, useState } from "react";
import { AuthContext } from "../../../Global/Context/globalContext";
import { User } from "./../../../interfaces/user/User";
import { AuthService } from "../../../services/auth/AuthService";
import { useNavigate } from "react-router-dom";
import "./Login.scss";

const Login = () => {
  const { dispatchUser }: any = useContext(AuthContext);
  const [user, setUser] = useState({} as User);

  const navigate = useNavigate();

  const handleSubmit = async () => {
    const resp = await AuthService.login(user);

    if (resp.status === 200) {
      dispatchUser({ type: "LOGIN", payload: resp.user });
      navigate('/dashboard');
    }else{
      // we can use a toast library to show the message
      console.log(resp.message);
    }
  };

  const handleChanges = (
    e: React.ChangeEvent<HTMLFormElement | HTMLInputElement>
  ) => {
    setUser({ ...user, [e.target.id]: e.target.value });
  };

  return (
      <div className="form">
        <form>
          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              className="form-control"
              id="email"
              aria-describedby="emailHelp"
              placeholder="Enter email"
              onChange={handleChanges}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Password"
              onChange={handleChanges}
            />
          </div>
        </form>
        <button className="btn btn-primary" onClick={handleSubmit}>
          Submit
        </button>
      </div>
  );
};

export default Login;
