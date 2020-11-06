import React from "react";
import Navbar from "../components/layout/Navbar";
import { useSelector } from "react-redux";
import { selectIsUserAuthenticated, selectUsername } from "../redux/reducers";

const NavbarContainer = ()=>{
  const isUserAuthenticated = useSelector(state=>selectIsUserAuthenticated(state));
  const username = useSelector(state => selectUsername(state))
  return (
    <Navbar isLoggedIn={isUserAuthenticated} username={username}/>
  );
};

export default NavbarContainer;
