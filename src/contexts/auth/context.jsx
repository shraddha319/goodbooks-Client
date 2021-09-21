import { useContext, createContext, useReducer, useEffect } from 'react';
import { useUser } from '../user/context';
import { authReducer } from './reducer';
import { loginUser, signUpUser } from './serviceHandler';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const initialState = {
    token: null,
    error: null,
    status: 'idle',
  };
  const { dispatchUser } = useUser();

  useEffect(() => {
    const authToken = localStorage.getItem('authToken');
    if (authToken) loginUser(dispatchAuth, dispatchUser, { authToken });
  }, []);

  const [auth, dispatchAuth] = useReducer(authReducer, initialState);

  return (
    <AuthContext.Provider value={{ auth, dispatchAuth, loginUser, signUpUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
