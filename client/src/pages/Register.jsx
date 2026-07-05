import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const Register = () => {


    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { register } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault(); // prevent page reload on form submit

        try {
            await register(name, email, password); // call register with the form values
            alert('registered!'); // temporary — we'll replace this with a redirect later
        } catch (err) {
            setError('Register failed');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
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
            <button type="submit">Register</button>
        </form>
    );
};

export default Register;