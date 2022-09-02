import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  NavLink,
} from "react-router-dom";

export default function Utilisateur(props) {
  useEffect(() => {
    props.fetchUtilisateurs();
    props.fetchUtilisateur();
  }, [props.emailUtilisateur]);

  return <div></div>;
}
