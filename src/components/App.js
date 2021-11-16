import { useContext } from 'react';
import { Container } from 'react-bootstrap';
import SignUp from './Signup/SignUp';
import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './Dashboard/Dashboard';
import Login from './Login/Login';
import Forgot from './Login/Forgot';
import { AuthContext } from '../context/auth-conext';

function App() {
  const { isLogin } = useContext(AuthContext);

  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: '100vh' }}
    >
      <div className="w-100" style={{ maxWidth: '400px' }}>
        <Routes>
          {!isLogin && <Route path="/" element={<Navigate to="/login" />} />}
          <Route path="/" element={<Dashboard />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot" element={<Forgot />} />
        </Routes>
      </div>
    </Container>
  );
}

export default App;
