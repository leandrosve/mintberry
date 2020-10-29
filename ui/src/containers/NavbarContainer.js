import React from "react";
import Navbar from "../components/layout/Navbar";
import { useSelector } from "react-redux";
import { selectIsUserAuthenticated } from "../redux/reducers";

const NavbarContainer = ()=>{
  const isUserAuthenticated = useSelector(state=>selectIsUserAuthenticated(state));
  return (
    <Navbar isLoggedIn={isUserAuthenticated}/>
  );
};

export default NavbarContainer;
