import { Container } from 'react-bootstrap';
import SignUp from './Signup/SignUp';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './Dashboard/Dashboard';
import Login from './Login/Login';
import Forgot from './Login/Forgot';

function App() {
  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: '100vh' }}
    >
      <div className="w-100" style={{ maxWidth: '400px' }}>
        <Routes>
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
