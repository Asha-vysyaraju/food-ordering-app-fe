import { useState, createContext, useContext, useEffect } from 'react';
import * as userService from '../services/userService';
import { toast } from 'react-toastify';
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(userService.getUser());
    const [users,setUsers]=useState([])
  
    const login = async (email, password) => {
      try {
        console.log(email,password)
        const user = await userService.login(email, password);
        setUser(user);
        toast.success('Login Successful');
      } catch (err) {
        toast.error(err.response);
      }
    };
  
    const register = async data => {
      try {
        const user = await userService.register(data);
        setUser(user);
        toast.success('Register Successful');
      } catch (err) {
        toast.error(err.response.data);
      }
    };
  
    const logout = () => {
      userService.logout();
      setUser(null);
      toast.success('Logout Successful');
    };
  
    const updateProfile = async user => {
      const updatedUser = await userService.updateProfile(user);
      toast.success('Profile Update Was Successful');
      if (updatedUser) setUser(updatedUser);
    };
  
    const changePassword = async passwords => {
      await userService.changePassword(passwords);
      logout();
      toast.success('Password Changed Successfully, Please Login Again!');
    };
    useEffect(() => {
      loadUsers();
    }, []);
  
    const loadUsers = async () => {
      const users = await userService.getAll();
      setUsers(users);
    };
    return (
      <AuthContext.Provider
        value={{ user, login, logout, register, updateProfile, changePassword,users }}
      >
        {children}
      </AuthContext.Provider>
    );
  };
  
  export const useAuth = () => useContext(AuthContext);