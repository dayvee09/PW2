import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  NavLink,
} from "react-router-dom";

let DATA;

export default function Utilisateur(props) {
  useEffect(() => {
    props.fetchUtilisateur();
    props.fetchUtilisateurs();
  }, [props.emailUtilisateur]);

  useEffect(() => {
    if (DATA !== undefined) {
      return;
    }
    props.createUser();
    DATA = true;
  }, [props.emailUtilisateur]);

  return <div></div>;
}

