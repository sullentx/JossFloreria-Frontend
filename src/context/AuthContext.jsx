import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    token: localStorage.getItem('token') || null,
    role: localStorage.getItem('role') || null,
  });

  useEffect(() => {
    localStorage.setItem('token', auth.token);
    localStorage.setItem('role', auth.role);
  }, [auth]);

  const login = (token, role) => {
    setAuth({ token, role });
  };

  const logout = () => {
    setAuth({ token: null, role: null });
    localStorage.removeItem('token');
    localStorage.removeItem('role');
  };

  return (
    <AuthContext.Provider value={{ ...auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
