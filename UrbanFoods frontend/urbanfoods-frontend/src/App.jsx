import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Footer from './components/shared/Footer';
import CustomerHome from './components/customer/CustomerHome';
import AdminDashboard from './components/admin/AdminDashboard';
import CustomerNavbar from './components/customer/CustomerNavbar'; // Import CustomerNavbar
import Shop from './components/customer/Shop'; // Import the Shop component
import AdminNavbar from './components/admin/AdminNavbar';
import ManageProducts from './components/admin/ManageProducts'; // Import ManageProducts component

function App() {
  return (
    <Router>
      <Routes>
        
        

    <Route
          path="/admin"
          element={
            <>
              <AdminNavbar />
              <AdminDashboard />
              <Footer />
            </>
          }
      />
<Route
  path="/admin/products"
  element={
    <>
      <AdminNavbar />
      <ManageProducts />
    </>
  }
/>
<Route
  path="/admin/orders"
  element={
    <>
      <AdminNavbar />
      <div className="container mt-4">
        <h1>Manage Orders</h1>
        <p>Here you can manage all orders.</p>
      </div>
    </>
  }
/>
<Route
  path="/admin/users"
  element={
    <>
      <AdminNavbar />
      <div className="container mt-4">
        <h1>Manage Users</h1>
        <p>Here you can manage all users.</p>
      </div>
    </>
  }
/>
        {/* Customer Routes with CustomerNavbar */}
        <Route
          path="/"
          element={
            <>
              <CustomerNavbar />
              <CustomerHome />
              <Footer />
            </>
          }
        />
          <Route
                path="/shop"
                element={
                  <>
                    <CustomerNavbar />
                    <Shop /> {/* Replace placeholder with Shop component */}
                    <Footer />
                  </>
                }
              />
      </Routes>
    </Router>
  );
}

export default App;