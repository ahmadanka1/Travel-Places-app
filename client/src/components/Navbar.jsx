import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth(); // get user and logout from context

  return (
    <nav className="bg-parchment border-b border-stone/30 px-6 py-4 flex items-center justify-between ">
      <Link to="/" className="font-display text-2xl font-semibold text-ink">Waypost</Link>

      <div className="flex items-center gap-6 font-body text-sm">
        <Link to="/" className="text-ink hover:text-moss transition-colors">Feed</Link>

        {user ? (
          <>
            <Link to="/my-places" className="text-ink hover:text-moss transition-colors">My Places</Link>
            <Link to="/create" className="text-ink hover:text-moss transition-colors">Create Place</Link>
            <span className="text-stone">Welcome, {user.name}</span>
            <button onClick={logout} className="bg-moss text-parchment px-4 py-1.5 rounded-full hover:bg-moss/90 transition-colors">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="text-ink hover:text-moss transition-colors">Login</Link>
            <Link to="/register" className="bg-moss text-parchment px-4 py-1,5 rounded-full hover:bg-moss/90 transition-colors">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;