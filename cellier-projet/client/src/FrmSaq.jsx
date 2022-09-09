import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useState, useEffect } from "react";
import "./FrmSaq.scss";
import FrmSaqInput from "./FrmSaqInput";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Collapse from "@mui/material/Collapse";

export default function FrmSaq({
  frmOuvert,
  setFrmOuvert,
  nombre_p,
  nombre,
  setNombre,
  page,
  setPage,
  page_p,
  type,
  setType,
  type_p,
  importerSaq,
}) {
  /**
   * L‘état d'erreur
   */
  const [openErr, setOpenErr] = useState(false);
  /**
   *  Gère l'action d'annuler
   */
  function viderFermerFrm() {
    setFrmOuvert(false);
    setNombre(nombre_p);
    setPage(page_p);
    setType(type_p);
  }
  /**
   * Gère l'action de soumettre
   */
  function gererSoumettre() {
    importerSaq(nombre, page, type);
    setFrmOuvert(false);

    if (nombre < 0) setOpenErr(true);
  }

  return (
    <div>
      <Dialog open={frmOuvert} onClose={viderFermerFrm}>
        <DialogContent>
          <div className="description">
            <Dialog open={openErr}>
              <Alert
                severity="error"
                action={
                  <IconButton
                    aria-label="close"
                    size="small"
                    onClick={() => {
                      setOpenErr(false);
                    }}
                  >
                    <CloseIcon fontSize="inherit" />
                  </IconButton>
                }
              >
                Invalide!
              </Alert>
            </Dialog>
          </div>
          <FrmSaqInput
            nombre_p={nombre_p}
            nombre={nombre}
            setNombre={setNombre}
            page={page}
            setPage={setPage}
            page_p={page_p}
            type={type}
            setType={setType}
            type_p={type_p}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={viderFermerFrm}>Annuler</Button>
          <Button onClick={gererSoumettre}>Soumettre</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
