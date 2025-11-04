'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const AuthContext = createContext(null);

// @ts-ignore
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      // @ts-ignore
      setUser({ isAuthenticated: true, token });
    }
    setLoading(false);
  }, []);

  // @ts-ignore
  const login = async (email, password) => {
    try {
      const response = await fetch(`http://localhost:8080/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Login failed');
      }

      const data = await response.json(); // Contains Email and Token
      localStorage.setItem('authToken', data.token);
      // @ts-ignore
      setUser({ isAuthenticated: true, token: data.token, email: data.email });
      router.push('/appointments');

    } catch (error) {
      console.error(error);
      // @ts-ignore
      alert(error.message);
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setUser(null);
    router.push('/login');
  };

  const register = async (name: any, email: any, password: any) => {
    try {
      const response = await fetch(`http://localhost:8080/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Registration failed');
      }

      const data = await response.json();
      localStorage.setItem('authToken', data.token);
      // @ts-ignore
      setUser({ isAuthenticated: true, token: data.token, email: data.email });
      router.push('/appointments');

    } catch (error) {
      console.error(error);
      // @ts-ignore
      alert(error.message);
    }
  };



  return (
    // @ts-ignore
    <AuthContext.Provider value={{ user, loading, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
