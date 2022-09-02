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
<<<<<<< HEAD
=======
    // props.fetchUtilisateur();
>>>>>>> 9bc7bf0166ddbfa64f2dc7c3ed617b5b78726afa
  }, [props.emailUtilisateur]);

  useEffect(() => {
    props.fetchUtilisateur();
  }, [props.utilisateurs]);

  useEffect(() => {
    if (props.utilisateur) {
      props.setId(props.utilisateur.id);
    }
  }, [props.utilisateur]);

  return <div></div>;
}
