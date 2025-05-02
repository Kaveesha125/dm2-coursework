import { useState } from 'react';
import { Navbar, Container, Nav, Offcanvas, Button, Table, Form } from 'react-bootstrap';
import { FaUser, FaShoppingCart } from 'react-icons/fa'; // Import icons
import axios from 'axios'; // Import Axios for API calls
import { FaTrash } from 'react-icons/fa';
import { FaTrashAlt } from 'react-icons/fa';

function CustomerNavbar() {
  const [showCart, setShowCart] = useState(false); // State to control the cart offcanvas visibility
  const [cartItems, setCartItems] = useState([]); // State to store cart items

  const userId = "6"; // Hardcoded user ID

  const handleCartShow = async () => {
    setShowCart(true); // Show the cart offcanvas
    await fetchCartItems(); // Fetch cart items when the cart is opened
  };

  const handleCartClose = () => setShowCart(false); // Close the cart offcanvas

  // Fetch cart items from the backend
  const fetchCartItems = async () => {
    try {
      const response = await axios.get(`http://localhost:8089/cart-service/cart/view/${userId}`);
      console.log("API Response:", response.data); // Debug the API response

      // Process each inner array into an object
      const items = response.data.map((itemArray) => ({
        id: itemArray[0], // ID
        productName: itemArray[1], // Product Name
        quantity: itemArray[2], // Quantity
        price: itemArray[3], // Price
        userId: itemArray[4], // User ID
      }));

      setCartItems(items); // Update the cart items state
    } catch (error) {
      console.error("Error fetching cart items:", error);
      setCartItems([]); // Reset cart items to an empty array on error
    }
  };

  // Clear the cart
  const clearCart = async () => {
    try {
      await axios.delete(`http://localhost:8089/cart-service/cart/clear/${userId}`);
      setCartItems([]); // Clear the cart items in the UI
    } catch (error) {
      console.error("Error clearing the cart:", error);
    }
  };

  // Update the quantity of a cart item
  const updateCartItemQuantity = async (cartId, quantity) => {
    try {
      await axios.put(`http://localhost:8089/cart-service/cart/update-quantity/${cartId}`, { quantity });
      await fetchCartItems(); // Refresh the cart after updating the quantity
    } catch (error) {
      console.error("Error updating cart item quantity:", error);
    }
  };

  // Remove a cart item by cart ID
  const removeCartItem = async (cartId) => {
    try {
      await axios.delete(`http://localhost:8089/cart-service/cart/remove/${cartId}`);
      await fetchCartItems(); // Refresh the cart after removing an item
    } catch (error) {
      console.error("Error removing cart item:", error);
    }
  };

  return (
    <>
      <Navbar bg="success" variant="dark" expand="lg"> {/* Bootstrap green background */}
        <Container>
          <Navbar.Brand href="/" className="fw-bold text-white">UrbanFoods</Navbar.Brand> {/* Bold and white text */}
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/" className="text-white">Home</Nav.Link> {/* White text */}
              <Nav.Link href="/shop" className="text-white">Shop</Nav.Link> {/* White text */}
            </Nav>
            <Nav className="ms-auto"> {/* Align icons to the right */}
              <Nav.Link className="text-white" style={{ cursor: 'pointer' }}>
                <FaUser /> Account
              </Nav.Link>
              <Nav.Link
                onClick={handleCartShow}
                className="text-white"
                style={{ cursor: 'pointer' }}
              >
                <FaShoppingCart /> Cart
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Cart Offcanvas */}
      <Offcanvas show={showCart} onHide={handleCartClose} placement="end" style={{ width: '600px' }}> {/* Wider cart */}
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Your Cart</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
  {cartItems.length > 0 ? (
    <Table striped bordered hover className="text-center">
      <thead className="table-dark">
        <tr>
          <th>Product</th>
          <th>Quantity</th>
          <th>Price</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {cartItems.map((item) => (
          <tr key={item.id}>
            <td>{item.productName}</td>
            <td>
              <Form.Control
                type="number"
                min="1"
                value={item.quantity}
                onChange={(e) => updateCartItemQuantity(item.id, parseInt(e.target.value))}
                style={{ width: '80px', margin: 'auto' }}
              />
            </td>
            <td>LKR.{item.price}</td>
            <td>
              <Button
                variant="danger"
                size="sm"
                onClick={() => removeCartItem(item.id)}
              >
                <FaTrash /> {/* Dustbin icon */}
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  ) : (
    <p className="text-center">Your cart is empty.</p>
  )}
  <div className="mt-3">
    <Button variant="danger" className="w-100" onClick={clearCart}>
      <FaTrashAlt className="me-2" /> Clear Cart {/* Updated icon to FaTrashAlt */}
    </Button>
  </div>
  <div className="mt-3">
    <Button variant="primary" className="w-100" onClick={() => alert('Proceeding to checkout...')}>
      Proceed to Checkout
    </Button>
  </div>
</Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default CustomerNavbar;