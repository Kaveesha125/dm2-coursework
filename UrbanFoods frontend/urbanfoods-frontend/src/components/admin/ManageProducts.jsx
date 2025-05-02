import { useState, useEffect } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import axios from 'axios';
import { FaBoxOpen } from 'react-icons/fa';

function ManageProducts() {
  const [products, setProducts] = useState([]); // State to store products
  const [showModal, setShowModal] = useState(false); // State to control modal visibility
  const [currentProduct, setCurrentProduct] = useState({
    productId: '',
    name: '',
    description: '',
    price: '',
    quantity: '',
    category: '',
    imageUrl: '',
  }); // State for the product being edited
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: '',
    quantity: '',
    category: '',
    imageUrl: '',
  }); // State for new product

  // Fetch all products
  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:8081/product-service/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Handle Add Product
  const handleAddProduct = async () => {
    try {
      await axios.post('http://localhost:8081/product-service/products', newProduct);
      fetchProducts(); // Refresh product list
      setNewProduct({ name: '', description: '', price: '', quantity: '', category: '', imageUrl: '' }); // Reset form
      alert('Product added successfully!');
    } catch (error) {
      console.error('Error adding product:', error);
      alert('Failed to add product.');
    }
  };

  // Handle Update Product
  const handleUpdateProduct = async () => {
    try {
      await axios.put(`http://localhost:8081/product-service/products/${currentProduct.productId}`, currentProduct);
      fetchProducts(); // Refresh product list
      setShowModal(false); // Close modal
      alert('Product updated successfully!');
    } catch (error) {
      console.error('Error updating product:', error);
      alert('Failed to update product.');
    }
  };

  // Handle Delete Product
  const handleDeleteProduct = async (productId) => {
    try {
      await axios.delete(`http://localhost:8081/product-service/products/${productId}`);
      fetchProducts(); // Refresh product list
      alert('Product deleted successfully!');
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Failed to delete product.');
    }
  };

  return (
    <div className="container mt-4">
    <div className="text-center my-4">
  <h1
    className="fs-1 d-flex justify-content-center align-items-center gap-2"
    style={{ color: '#D35400' }}
  >
    <FaBoxOpen />
    Manage Products
  </h1>
  <p className="text-muted fs-5">
    Easily add, update, and remove products from your store.
  </p>
</div>


     {/* Add Product Form */}
     <hr className="mt-5 mb-4 border-primary border-2 opacity-75" />
<h3 className="text-primary text-center">Add Product</h3>

<div className="container w-50 mx-auto">
  <Form>
    <Form.Group className="mb-3">
      <Form.Label>Product Name</Form.Label>
      <Form.Control
        type="text"
        placeholder="Enter product name"
        value={newProduct.name}
        onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
      />
    </Form.Group>
    <Form.Group className="mb-3">
      <Form.Label>Description</Form.Label>
      <Form.Control
        type="text"
        placeholder="Enter product description"
        value={newProduct.description}
        onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
      />
    </Form.Group>
    <Form.Group className="mb-3">
      <Form.Label>Price</Form.Label>
      <Form.Control
        type="number"
        placeholder="Enter product price"
        value={newProduct.price}
        onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
      />
    </Form.Group>
    <Form.Group className="mb-3">
      <Form.Label>Quantity</Form.Label>
      <Form.Control
        type="number"
        placeholder="Enter product quantity"
        value={newProduct.quantity}
        onChange={(e) => setNewProduct({ ...newProduct, quantity: e.target.value })}
      />
    </Form.Group>
    <Form.Group className="mb-3">
      <Form.Label>Category</Form.Label>
      <Form.Select
        value={newProduct.category}
        onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
      >
        <option value="">Select a category...</option>
        <option value="Fruits">Fruits</option>
        <option value="Vegetables">Vegetables</option>
        <option value="Dairy">Dairy</option>
        <option value="Handmade Crafts">Handmade Crafts</option>
        <option value="Baked Goods">Baked Goods</option>
      </Form.Select>
    </Form.Group>
    <Form.Group className="mb-3">
      <Form.Label>Image URL</Form.Label>
      <Form.Control
        type="text"
        placeholder="Enter product image URL"
        value={newProduct.imageUrl}
        onChange={(e) => setNewProduct({ ...newProduct, imageUrl: e.target.value })}
      />
    </Form.Group>
    <Button variant="primary" onClick={handleAddProduct}>
      Add Product
    </Button>
  </Form>
</div>

      <hr className="my-5" style={{ borderTop: '3px solid #bbb' }} />
      {/* Product Table */}
      <hr className="mt-5 mb-4 border-success border-2 opacity-75" />
<h3 className="text-success text-center">Product List</h3>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Category</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.productId}>
              <td>{product.productId}</td>
              <td>{product.name}</td>
              <td>{product.description}</td>
              <td>{product.price}</td>
              <td>{product.quantity}</td>
              <td>{product.category}</td>
              <td>
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                />
              </td>
              <td>
                <Button
                  variant="warning"
                  size="sm"
                  className="me-2"
                  onClick={() => {
                    setCurrentProduct(product); // Set the product to be edited
                    setShowModal(true); // Show the modal
                  }}
                >
                  Edit
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDeleteProduct(product.productId)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Edit Product Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                type="text"
                value={currentProduct?.name || ''}
                onChange={(e) => setCurrentProduct({ ...currentProduct, name: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                value={currentProduct?.description || ''}
                onChange={(e) => setCurrentProduct({ ...currentProduct, description: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                value={currentProduct?.price || ''}
                onChange={(e) => setCurrentProduct({ ...currentProduct, price: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Quantity</Form.Label>
              <Form.Control
                type="number"
                value={currentProduct?.quantity || ''}
                onChange={(e) => setCurrentProduct({ ...currentProduct, quantity: e.target.value })}
              />
            </Form.Group>
        <Form.Group className="mb-3">
            <Form.Label>Category</Form.Label>
            <Form.Select
                value={currentProduct?.category || ''}
                onChange={(e) => setCurrentProduct({ ...currentProduct, category: e.target.value })}
            >
                <option value="">Select a category...</option>
                <option value="Fruits">Fruits</option>
                <option value="Vegetables">Vegetables</option>
                <option value="Dairy">Dairy</option>
                <option value="Handmade Crafts">Handmade Crafts</option>
                <option value="Baked Goods">Baked Goods</option>
            </Form.Select>
        </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Image URL</Form.Label>
              <Form.Control
                type="text"
                value={currentProduct?.imageUrl || ''}
                onChange={(e) => setCurrentProduct({ ...currentProduct, imageUrl: e.target.value })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdateProduct}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ManageProducts;