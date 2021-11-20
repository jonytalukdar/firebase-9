import { Route, Redirect, useLocation } from 'react-router-dom';
import { useAuth } from '../context/auth-context';
const ProtectedRoute = (props) => {
  const { currentUser } = useAuth();
  const location = useLocation();
  const { path } = props;

  if (
    path === '/login' ||
    path === '/register' ||
    path === '/forgot-password' ||
    path === '/reset-password'
  ) {
    return currentUser ? (
      <Redirect to={location.state?.from ?? '/profile'} />
    ) : (
      <Route {...props} />
    );
  }

  return currentUser ? (
    <Route {...props} />
  ) : (
    <Redirect
      to={{
        pathname: '/login',
        state: { from: path },
      }}
    />
  );
};

export default ProtectedRoute;
