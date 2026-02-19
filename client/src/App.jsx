import React from "react";
import "./App.css";
import Left from "./home/left/Left";
import Right from "./home/right/Right";
import Logout from "./home/logout/Logout";
import SignUp from "./components/signUp";
import Login from "./components/Login";
import { useAuth } from "./context/AuthProvider";
import { Navigate, Route, Routes } from "react-router-dom";
// import Logged from "./components/Loget";
// import Loding from "./components/Loding";
import toast, { Toaster } from 'react-hot-toast';

function App() {
  const { authUser } = useAuth();
  //console.log("authUser in App:", authUser);

  return (
      <>
  
    
    <Routes>
      <Route
        path="/"
        element={
          authUser ? (
            <div className="flex w-full h-screen overflow-hidden">
              <Logout />
              <Left />
              <Right />
            </div>
          ) : (
            <Navigate to="/login" />
          )
        }
      />

      <Route
        path="/signup"
        element={authUser ? <Navigate to="/" /> : <SignUp />}
      />
      <Route
        path="/login"
        element={authUser ? <Navigate to="/" /> : <Login />}
      />
    </Routes>
    <Toaster />
    </>
  );
}

export default App;
