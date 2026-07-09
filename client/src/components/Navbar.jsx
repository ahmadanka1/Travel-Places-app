import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth(); // get user and logout from context

  return (
    <nav>
      <Link to="/">Home</Link>

      {user ? (
        <>
          <span>Welcome, {user.name}</span>
          <Link to="/my-places">My Places</Link>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </>
      )}
      {user && <Link to="/create">Create Place</Link>}
    </nav>
  );
};

export default Navbar;