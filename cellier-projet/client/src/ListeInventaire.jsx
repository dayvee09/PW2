import * as React from "react";
import "./ListeInventaire.scss";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function ListeInventaire(props) {
  const [idCellier, setIdCellier] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    if (idCellier > 0) {
      props.gererCellier(idCellier);
      props.fetchVins(idCellier);
      props.fetchNomCellier(idCellier);
      navigate(`/cellier/${idCellier}/vins`, {
        replace: true,
      });
    }
  }, [idCellier]);

  return (
    <List className="ListeInventaire" sx={{ width: "100%" }}>
      {props.listeInventaire.map((chaqueInventaire) => (
        <div key={chaqueInventaire.cellier_id}>
          <ListItem
            onClick={() => setIdCellier(chaqueInventaire.cellier_id)}
            alignItems="center"
          >
            <ListItemAvatar>
              <Avatar
                alt={chaqueInventaire.cellier_nom}
                src="/static/images/avatar/1.jpg"
              />
            </ListItemAvatar>
            <ListItemText
              className="ListeInventaire--nom-cellier"
              primary={chaqueInventaire.cellier_nom}
            />
            <ListItemText
              className="ListeInventaire--qt-cellier"
              primary={chaqueInventaire.quantite}
            />
          </ListItem>
          {/* <Divider variant="inset" component="li" /> */}
        </div>
      ))}
    </List>
  );
}
