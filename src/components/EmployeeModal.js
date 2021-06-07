import { Button, ListGroup, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { updateRefEmployee } from "../redux/EmpoyeeReducer";

export function EmployeeModal() {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const updateRefObj = () => {
    dispatch(updateRefEmployee({}));
  };

  return (
    <Modal show={state.employee.refemp.id} onHide={() => updateRefObj()}>
      <Modal.Header closeButton>
        <Modal.Title>Hello, {state.employee.refemp.userName}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ListGroup>
          <ListGroup.Item>
            First Name - {state.employee.refemp.firstName}
          </ListGroup.Item>
          <ListGroup.Item>
            Last Name - {state.employee.refemp.lastName}
          </ListGroup.Item>
          <ListGroup.Item>
            User Name - {state.employee.refemp.userName}
          </ListGroup.Item>
          <ListGroup.Item>Password - {"*********"}</ListGroup.Item>
          <ListGroup.Item>Email - {"******@gmail.com"}</ListGroup.Item>
          <ListGroup.Item>
            Mobile - {state.employee.refemp.mobile}
          </ListGroup.Item>
        </ListGroup>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => updateRefObj()}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
