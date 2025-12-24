import React from "react";
import '../App.css';
import { NavLink } from "react-router-dom";
const Navbar = () => {
  return (
    <div
      className="shadow-sm h-25 p-1 font-serif fixed top-0 left-0 right-0 z-10"
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <h1 className="text-3d-neon text-3xl font-serif ml-2  ">ChatGPt</h1>
      <div className="flex justify-center">
        <NavLink
          to={"/login"}
          className=" cursor-pointer p-2 bg-slate-200 rounded-sm m-1 hover:bg-slate-100 hover:scale-105 transition-transform duration-2"
        >
          Login
        </NavLink>
        <NavLink
          to={"/register"}
          className="cursor-pointer p-2 bg-slate-200 rounded-sm m-1 hover:bg-slate-100 hover:scale-105 transition-transform duration-2"
        >
          SignUP
        </NavLink>
      </div>
    </div>
  );
};

export default Navbar;
