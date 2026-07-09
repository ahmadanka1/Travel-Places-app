import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth(); // get the login function from context
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); // prevent page reload on form submit

    try {
      await login(email, password); // call login with the form values
      navigate('/');
    } catch (err) {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="max-w-sm mx-auto px-6 py-16">
      <h1 className="font-display text-3xl font-semibold text-ink mb-6 text-center">
        Welcome back
      </h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border border-stone/40 rounded-lg px-4 py-2 bg-parchment focus:outline-none focus:border-moss"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border border-stone/40 rounded-lg px-4 py-2 bg-parchment focus:outline-none focus:border-moss"
        />

        {error && <p className="text-terracotta text-sm">{error}</p>}

        <button
          type="submit"
          className="bg-moss text-parchment px-5 py-2.5 rounded-full hover:bg-moss/90 transition-colors mt-2"
        >
          Log In
        </button>
      </form>

      <p className="text-center text-stone text-sm mt-6">
        Don't have an account?{' '}
        <Link to="/register" className="text-moss underline">
          Register
        </Link>
      </p>
    </div>
  );
};

export default Login;