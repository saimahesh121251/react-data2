import { Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

export function AppNavBar() {
  return (
    <Navbar bg="dark" expand="lg" variant="dark">
      <Navbar.Brand as={Link} to="/">
        EMS APP
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <Nav.Link as={Link} to="/create-employee">
            Create Employee
          </Nav.Link>
          <Nav.Link as={Link} to="/list-employee">
            List Employee
          </Nav.Link>
          <Nav.Link as={Link} to="/create-category">
            Create Category
          </Nav.Link>
          <Nav.Link as={Link} to="/list-category">
            List Category
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
