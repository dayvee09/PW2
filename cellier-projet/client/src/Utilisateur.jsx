<<<<<<< HEAD
import { useEffect } from "react";

/**
 * Gestion de l'utilisateur
 * @date 2022-09-30
 * @param {*} props
 * @returns {*}
 */
export default function Utilisateur(props) {
  useEffect(() => {
    if (props.utilisateur?.privilege === "admin" && props.emailUtilisateur) {
      props.fetchUtilisateurs();
    }
  }, [props.emailUtilisateur, props.utilisateur?.privilege]);

  useEffect(() => {
    if (props.emailUtilisateur && !props.utilisateur) {
      props.fetchUtilisateur();
    }
  }, [props.emailUtilisateur, props.utilisateur]);

  useEffect(() => {
    if (!props.utilisateur) return;
    if (props.utilisateur.id != null) {
      props.setId(String(props.utilisateur.id));
    }
    if (props.utilisateur.nom) {
      props.setUsername(props.utilisateur.nom);
    }
    if (props.utilisateur.email) {
      props.setEmailUtilisateur(props.utilisateur.email);
    }
  }, [props.utilisateur]);

  return <div></div>;
}
=======
import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  NavLink,
} from "react-router-dom";

/**
 * Gestion de l'utilisateur 
 * @date 2022-09-30
 * @param {*} props
 * @returns {*}
 */
export default function Utilisateur(props) {
	useEffect(() => {
		props.fetchUtilisateurs();
	}, [props.emailUtilisateur]);

	useEffect(() => {
		props.fetchUtilisateur();
	}, [props.utilisateurs]);

	useEffect(() => {
		if (props.utilisateur) {
			props.setId(props.utilisateur.id);
		}
		if (props.utilisateur) {
			props.setUsername(props.utilisateur.nom);
		}
		if (props.utilisateur) {
			props.setEmailUtilisateur(props.utilisateur.email);
		}
	}, [props.utilisateur]);

	return <div></div>;
}
>>>>>>> monvino/master
