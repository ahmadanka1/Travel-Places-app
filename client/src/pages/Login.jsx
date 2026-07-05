import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth(); // get the login function from context

  const handleSubmit = async (e) => {
    e.preventDefault(); // prevent page reload on form submit

    try {
      await login(email, password); // call login with the form values
      alert('Logged in!'); // temporary — we'll replace this with a redirect later
    } catch (err) {
      setError('Invalid email or password');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {error && <p>{error}</p>}
      <button type="submit">Log In</button>
    </form>
  );
};

export default Login;