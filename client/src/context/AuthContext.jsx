import { createContext, useState, useContext, useEffect } from 'react';
import axiosInstance from '../api/axiosInstance';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const checkloggedIn = async () => {
        const token = localStorage.getItem('token');
        if(token){
            try {
                const response = await axiosInstance.get('/auth/me');
                setUser(response.data);

            } catch (error) {
                localStorage.removeItem('token');
            }
        }
        setLoading(false);
    };
    checkloggedIn();
  },[]);


  const register = async (name, email, password) => {
    const response = await axiosInstance.post('/auth/register', {name, email, password});
    const data = response.data;

    localStorage.setItem('token', data.token);
    setUser({_id: data._id, name: data.name, email: data.email});
    return data;
  };

  const login = async (email, password) => {
    const response = await axiosInstance.post('/auth/login', { email, password });
    const data = response.data;

    localStorage.setItem('token', data.token); // store the token
    setUser({ _id: data._id, name: data.name, email: data.email }); // store the user info (not the token) in state

    return data;
  };

  const logout = () => {
    localStorage.removeItem('token'); // remove the token from localStorage
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);