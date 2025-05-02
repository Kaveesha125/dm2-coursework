import { Container, Button, Card, Row, Col } from 'react-bootstrap';
import heroImage from '../../assets/images/hero.jpg';
import CustomerNavbar from './CustomerNavbar';

function CustomerHome() {
  return (
    <div>
      {/* Hero Section */}
      <div
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '400px',
          color: 'white',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <h1>Fresh From Your City’s Heart 🌱</h1>
        <p>Discover fresh, organic, and local products delivered to your doorstep.</p>
        <Button variant="success" href="/shop">Shop Now</Button>
      </div>

      

      {/* Categories / Filters */}
<Container className="mt-5">
  <h2 className="text-center">Shop by Category</h2>
  <Row className="mt-4 text-center">
    <Col>
      <div className="card border-0">
        <img
          src="https://via.placeholder.com/150"
          alt="Fruits"
          className="card-img-top rounded"
        />
        <div className="card-body">
          <Button variant="outline-success" href="/shop?category=fruits">
            Fruits
          </Button>
        </div>
      </div>
    </Col>
    <Col>
      <div className="card border-0">
        <img
          src="https://via.placeholder.com/150"
          alt="Vegetables"
          className="card-img-top rounded"
        />
        <div className="card-body">
          <Button variant="outline-success" href="/shop?category=vegetables">
            Vegetables
          </Button>
        </div>
      </div>
    </Col>
    <Col>
      <div className="card border-0">
        <img
          src="https://via.placeholder.com/150"
          alt="Dairy"
          className="card-img-top rounded"
        />
        <div className="card-body">
          <Button variant="outline-success" href="/shop?category=dairy">
            Dairy
          </Button>
        </div>
      </div>
    </Col>
    <Col>
      <div className="card border-0">
        <img
          src="https://via.placeholder.com/150"
          alt="Baked Goods"
          className="card-img-top rounded"
        />
        <div className="card-body">
          <Button variant="outline-success" href="/shop?category=baked-goods">
            Baked Goods
          </Button>
        </div>
      </div>
    </Col>
    <Col>
      <div className="card border-0">
        <img
          src="https://via.placeholder.com/150"
          alt="Crafts"
          className="card-img-top rounded"
        />
        <div className="card-body">
          <Button variant="outline-success" href="/shop?category=crafts">
            Crafts
          </Button>
        </div>
      </div>
    </Col>
  </Row>
</Container>

      {/* Meet the Farmers / Producers */}
      <Container className="mt-5">
        <h2 className="text-center">Meet the Farmers</h2>
        <Row className="mt-4">
          <Col md={4}>
            <Card>
              <Card.Img variant="top" src="https://via.placeholder.com/150" />
              <Card.Body>
                <Card.Title>Farmer John</Card.Title>
                <Card.Text>Specializes in organic vegetables.</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card>
              <Card.Img variant="top" src="https://via.placeholder.com/150" />
              <Card.Body>
                <Card.Title>Farmer Jane</Card.Title>
                <Card.Text>Known for fresh dairy products.</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card>
              <Card.Img variant="top" src="https://via.placeholder.com/150" />
              <Card.Body>
                <Card.Title>Farmer Joe</Card.Title>
                <Card.Text>Produces artisan baked goods.</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default CustomerHome;