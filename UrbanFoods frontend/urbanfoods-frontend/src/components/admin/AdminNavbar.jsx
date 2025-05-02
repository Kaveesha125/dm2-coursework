import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function AdminNavbar() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
      <Container>
        <Navbar.Brand as={Link} to="/admin">
          Admin Panel
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="admin-navbar-nav" />
        <Navbar.Collapse id="admin-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/admin">
              Dashboard
            </Nav.Link>
            <Nav.Link as={Link} to="/admin/products">
              Products
            </Nav.Link>
            <Nav.Link as={Link} to="/admin/orders">
              Orders
            </Nav.Link>
            <Nav.Link as={Link} to="/admin/users">
              Users
            </Nav.Link>
          </Nav>
          {/* <Nav>
            <Nav.Link as={Link} to="/">
              Logout
            </Nav.Link>
          </Nav> */}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AdminNavbar;