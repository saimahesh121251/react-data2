import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  createEmployeeAction,
  updateEmployeeAction,
} from "../redux/EmpoyeeReducer";

export function EmployeeUpsert() {
  const dispatch = useDispatch();
  const history = useHistory();
  const formEL = useRef();
  const state = useSelector((state) => state);
  console.log(state);

  const [firstName, setFirstName] = useState(state.employee.refemp.firstName);
  const [lastName, setLastName] = useState(state.employee.refemp.lastName);
  const [userName, setUserName] = useState(state.employee.refemp.userName);
  const [password, setPassword] = useState(state.employee.refemp.password);
  const [email, setEmail] = useState(state.employee.refemp.email);
  const [mobile, setMobile] = useState(state.employee.refemp.mobile);

  const [successOperation, setSuccessOperation] = useState(false);
  const [errorOperation, setErrorOperation] = useState(false);

  const updateFirstName = (e) => setFirstName(e.target.value);
  const updateLastName = (e) => setLastName(e.target.value);
  const updateUserName = (e) => setUserName(e.target.value);
  const updatePassword = (e) => setPassword(e.target.value);
  const updateEmail = (e) => setEmail(e.target.value);
  const updateMobile = (e) => setMobile(e.target.value);

  const addEmployee = (e) => {
    e.preventDefault();
    console.log(firstName, lastName, userName, password, email, mobile);
    console.log(formEL);
    console.log(formEL.current.checkValidity());

    if (formEL.current.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
      formEL.current.classList.add("was-validated");
    } else {
      const re = /^[a-z0-9_\.]+$/;
      if (!re.test(userName)) {
        alert("Username Vlidation Fails");
        return;
      }

      dispatch(
        createEmployeeAction({
          firstName,
          lastName,
          userName,
          email,
          password,
          mobile,
        })
      );

      setSuccessOperation(true);
      setTimeout(() => setSuccessOperation(false), 5000);

      setFirstName("");
      setLastName("");
      setUserName("");
      setPassword("");
      setEmail("");
      setMobile("");
    }
  };

  const updateEmployee = () => {
    dispatch(
      updateEmployeeAction({
        id: state.employee.refemp.id,
        firstName,
        lastName,
        userName,
        email,
        mobile,
        password,
      })
    );

    setFirstName("");
    setLastName("");
    setUserName("");
    setPassword("");
    setEmail("");
    setMobile("");
  };

  return (
    <div className="row">
      <div className="col-3 col-md-3 d-none d-md-block"></div>
      <div className="col-12 col-md-6">
        <h3 className="alert alert-success">
          {state.employee.refemp.id ? "Update Employee" : "Create Employee"}
        </h3>

        {/** BELOW THESE TWO TAGS MUST BE CONDITIOANL */}
        {successOperation && (
          <div className="alert alert-success">Operation Success</div>
        )}

        <form ref={formEL} class="needs-validation" novalidate>
          <div className="mb-1">
            <input
              type="text"
              value={firstName}
              onChange={(e) => updateFirstName(e)}
              className="form-control"
              placeholder="Enter First name"
              minLength="4"
              maxLength="8"
              title="Enter atleast 4 to 8 characters"
              required
            />
          </div>

          <div className="mb-1">
            <input
              type="text"
              value={lastName}
              onChange={(e) => updateLastName(e)}
              className="form-control"
              placeholder="Enter Lastname"
              minLength="4"
              maxLength="8"
              title="Enter atleast 4 to 8 characters"
              required
            />
          </div>

          <div className="mb-1">
            <input
              type="text"
              value={userName}
              onChange={(e) => updateUserName(e)}
              className="form-control"
              placeholder="Enter Username"
              minLength="6"
              maxLength="8"
              title="Special characters are not allowed and UserName should  contain 6 characters"
              required
            />
          </div>

          <div className="mb-1">
            <input
              type="password"
              value={password}
              onChange={(e) => updatePassword(e)}
              className="form-control"
              placeholder="Enter Password"
              minLength="8"
              maxLength="20"
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
              title="Must contain at least one number and one uppercase and lowercase letter, should hava8 to 20 characters"
              required
            />
          </div>

          <div className="mb-1">
            <input
              type="email"
              value={email}
              onChange={(e) => updateEmail(e)}
              className="form-control"
              placeholder="Enter Email"
              required
            />
          </div>

          <div className="mb-1">
            <input
              type="number"
              value={mobile}
              onChange={(e) => updateMobile(e)}
              className="form-control"
              placeholder="Enter Mobile"
              max="9999999999"
              min="1234567890"
              title="Mobilenumber should contain exactly 10 numbers"
              required
            />
          </div>

          <div className="mb-1">
            {state.employee.refemp.id ? (
              <input
                type="button"
                className="btn btn-secondary w-100"
                value="Update Employee"
                onClick={() => updateEmployee()}
              />
            ) : (
              <input
                type="button"
                className="btn btn-secondary w-100"
                value="Add Employee"
                onClick={(e) => addEmployee(e)}
              />
            )}
          </div>
        </form>
      </div>
      <div className="col-3 col-md-3  d-none d-md-block"></div>
    </div>
  );
}
