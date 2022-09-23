import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";

export default function ListeInventaire(props) {
  return (
    <List sx={{ width: "100%", maxWidth: 400, bgcolor: "background.paper" }}>
      {props.listeInventaire.map((chaqueInventaire) => (
        <div key={chaqueInventaire.cellier_id}>
          <ListItem alignItems="center">
            <ListItemAvatar>
              <Avatar
                alt={chaqueInventaire.cellier_nom}
                src="/static/images/avatar/1.jpg"
              />
            </ListItemAvatar>
            <ListItemText primary={chaqueInventaire.cellier_nom} />
            <ListItemText primary={chaqueInventaire.quantite} />
          </ListItem>
          <Divider variant="inset" component="li" />
        </div>
      ))}
    </List>
  );
}
