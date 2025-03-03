import './App.css';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import ManufacturerList from './components/ManufacturerList';
import ManufacturerDetails from './components/ManufacturerDetails';
import ManufacturerEdit from './components/ManufacturerEdit';
import ManufacturerAdd from './components/ManufacturerAdd';
import ProductList from './components/ProductList';
import ProductDetails from './components/ProductDetails';
import ProductEdit from './components/ProductEdit';
import ProductAdd from './components/ProductAdd';
import Home from './components/Home';
import AppNavbar from './components/AppNavbar';
import ProtectedRoute from './components/ProtectedRoute';
import UserList from './components/UserList';
import UserDetails from './components/UserDetails';
import { BrowserRouter as Router, Route, Routes, } from 'react-router-dom';


function App() {
  return (
    <div className="App">
      <Router>
        <AppNavbar/>
        <Routes>
          <Route path="/login" element={<LoginPage></LoginPage>}/>
          <Route path="/register" element={<RegisterPage/>}/>
          <Route path="/home" element={<Home></Home>}/>

          <Route path='/manufacturers' element={<ManufacturerList/>}/>
          <Route path='/manufacturers/:id' element={<ManufacturerDetails/>}/>

          <Route path='/manufacturers/edit/:id' element={
            <ProtectedRoute allowedRoles={['admin']}>
              <ManufacturerEdit />
            </ProtectedRoute>
          }/>

          <Route path='/manufacturers/add' element={
            <ProtectedRoute allowedRoles={['admin']}>
              <ManufacturerAdd />
            </ProtectedRoute>
          }/>

          <Route path="/products" element={<ProductList />} />
          <Route path="/products/:id" element={<ProductDetails />} />

          <Route path="/products/edit/:id" element={
            <ProtectedRoute allowedRoles={['admin']}>
              <ProductEdit />
            </ProtectedRoute>
          } />

          <Route path="/products/add" element={
            <ProtectedRoute allowedRoles={['admin']}>
              <ProductAdd />
            </ProtectedRoute>
          } />

          <Route path="/users" element={
            <ProtectedRoute allowedRoles={['admin']}>
              <UserList />
            </ProtectedRoute>
          } />
          <Route path="/users/:id" element={
            <ProtectedRoute allowedRoles={['admin']}>
              <UserDetails />
            </ProtectedRoute>
          } />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
