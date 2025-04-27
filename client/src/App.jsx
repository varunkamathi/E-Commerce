import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductList from './pages/ProductList';
import MyOrder from './components/MyOrder';
import Auth from './pages/Auth';
import Account from './components/Account';

const App = () => {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Auth/>} />
        <Route path="/home" element={<ProductList />} />
        <Route path="/my-account" element={<Account/>} />
        <Route path="/my-order" element={<MyOrder />} />  
      </Routes>
    </Router>
  );
};

export default App;
