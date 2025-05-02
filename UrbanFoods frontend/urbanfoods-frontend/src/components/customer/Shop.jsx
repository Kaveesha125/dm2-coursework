import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form, InputGroup } from 'react-bootstrap';
import axios from 'axios';

function Shop() {
  const [products, setProducts] = useState([]); // State to store products
  const [searchTerm, setSearchTerm] = useState(''); // State for search term
  const [category, setCategory] = useState(''); // State for selected category

  // Fetch all products from the backend
  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:8081/product-service/products');
      setProducts(response.data); // Update the products state
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  // Search products by name
  const searchProductsByName = async () => {
    try {
      const response = await axios.get(`http://localhost:8081/product-service/products/search?term=${searchTerm}`);
      setProducts(response.data); // Update the products state with search results
    } catch (error) {
      console.error('Error searching products by name:', error);
    }
  };

  // Filter products by category
  const filterProductsByCategory = async () => {
    try {
      const response = await axios.get(`http://localhost:8081/product-service/products/filter/category?category=${category}`);
      setProducts(response.data); // Update the products state with filtered results
    } catch (error) {
      console.error('Error filtering products by category:', error);
    }
  };
  // Function to handle adding a product to the cart
  const handleAddToCart = async (product) => {
   const cartItem = {
    productName: product.name,
    quantity: 1, // Default quantity to add
    price: product.price,
    userId: "6", // Hardcoded user ID for now
  };

  try {
    const response = await axios.post('http://localhost:8089/cart-service/cart/add', cartItem);
    console.log('Product added to cart:', response.data);
    alert(`${product.name} has been added to your cart!`);
  } catch (error) {
    console.error('Error adding product to cart:', error);
    alert('Failed to add product to cart. Please try again.');
  }
};

  useEffect(() => {
    fetchProducts(); // Fetch products when the component mounts
  }, []);


  return (
    <Container className="mt-5">
      <h2 className="text-center mb-4">Shop All Products</h2>

      {/* Search Bar */}
      <Row className="mb-4">
        <Col md={6}>
          <InputGroup>
            <Form.Control
              type="text"
              placeholder="Search by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button variant="primary" onClick={searchProductsByName}>
              Search
            </Button>
          </InputGroup>
        </Col>
        <Col md={6}>
          <InputGroup>
            <Form.Select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Filter by category...</option>
              <option value="Fruits">Fruits</option>
              <option value="Vegetables">Vegetables</option>
              <option value="Dairy">Dairy</option>
              <option value="Handmade Crafts">Handmade Crafts</option>
              <option value="Baked Goods">Baked Goods</option>
            </Form.Select>
            <Button variant="success" onClick={filterProductsByCategory}>
              Filter
            </Button>
          </InputGroup>
        </Col>
      </Row>

      {/* Product Cards */}
      <Row>
        {products.map((product) => (
          <Col key={product.productId} md={4} className="mb-4">
            <Card className="h-100">
              <Card.Img
                variant="top"
                src={product.imageUrl || 'https://via.placeholder.com/150'}
                alt={product.name}
                style={{ height: '200px', objectFit: 'cover' }}
              />
              <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>{product.description}</Card.Text>
                <Card.Text>
                  <strong>Price:</strong> LKR {product.price}
                </Card.Text>
                <Card.Text>
                  <strong>Category:</strong> {product.category}
                </Card.Text>
                <Card.Text>
                  <strong>Available Quantity:</strong> {product.quantity}
                </Card.Text>
                <div className="d-flex justify-content-between">
                  <Button
                    variant="success"
                    onClick={() => console.log(`Buy Now clicked for product ID: ${product.productId}`)}
                  >
                    Buy Now
                  </Button>
                <Button
                       variant="outline-success" 
                       onClick={() => handleAddToCart(product)}
                >
                       Add to Cart
                </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Shop;