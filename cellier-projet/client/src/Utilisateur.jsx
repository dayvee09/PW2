import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  NavLink,
} from "react-router-dom";

export default function Utilisateur(props) {
  useEffect(() => {
    props.fetchUtilisateur();
    props.createUser();
    props.fetchUtilisateurs();
  }, [props.emailUtilisateur]);
  console.log(props);
  return <div></div>;
}
