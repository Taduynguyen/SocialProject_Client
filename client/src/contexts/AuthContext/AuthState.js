import React, { useEffect, useState } from "react";
import authAPI from "../../sevices/authAPI";
import AuthContext from "./AuthContext";
import postAPI from "../../sevices/postAPI";

const AuthState = ({ children }) => {
  const [auth, setAuth] = useState({
    isAuthenticated: false,
    user: {},
  });

  const [postData, setPostData] = useState([]);
  const [allUsers, setAllUsers] = useState([]);

  // 1. Call API /me => user info
  // 2. Update auth state
  const fetchCurrentUser = async () => {
    try {
      const response = await authAPI.authInfo();
      const data = response.data;

      setAuth({
        isAuthenticated: true,
        user: data.userInfo,
      });
    } catch (error) {
      console.log(error);
    }
  };
  const handleLogin = async () => {
    await fetchCurrentUser();
  };

  const handleLogout = () => {
    setAuth({
      isAuthenticated: false,
      user: {},
    });
    localStorage.clear();
  };

  // Get all posts data
  const getAllPost = async () => {
    try {
      const response = await postAPI.getAllPost();
      const data = response.data;
      setPostData(data);
    } catch (error) {
      console.log(error);
    }
  };

  //Get all users data
  const getAllUser = async () => {
    try {
      const response = await authAPI.allUsers();
      const data = response.data;
      setAllUsers(data);
      console.log(allUsers);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getAllPost();
    getAllUser();
    const accessToken = localStorage.getItem("accessToken");
    // Call API /me => Check token => User, isauthenticated
    if (accessToken) {
      handleLogin();
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        auth,
        handleLogin,
        handleLogout,
        fetchCurrentUser,
        postData,
        getAllPost,
        allUsers,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthState;
