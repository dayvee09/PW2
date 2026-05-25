import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import FrmBouteilleInput from "./FrmBouteilleInput";
import BouteilleImageZoom from "./BouteilleImageZoom";
import "./FrmBouteille.scss";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import placeholderSaq from "./img/png/placeholder-saq.png";
import DateSelecteur from "./DateSelecteur";
import DateSelecteurAnnee from "./DateSelecteurAnnee";
import MuiDateProvider from "./MuiDateProvider";
import TextField from "@mui/material/TextField";

/**
 * Gestion du formulaire d'une bouteille
 *
 * Contenant l'affichage et la modification de la bouteille spécifié
 * @date 2022-09-30
 * @param {*} {bouteille ...}
 * @returns {*}
 */
export default function FrmBouteille({
  bouteille,
  frmOuvert,
  setFrmOuvert,
  voirFiche,
  setVoirFiche,
  bouteille_type,
  quantite,
  setQuantite,
  dateAchat,
  setDateAchat,
  dateGarde,
  setDateGarde,
  modifierBouteille,
  personnalise,
  setVinNote,
  vinNote,
}) {
  const [openErr, setOpenErr] = React.useState(false);

  function viderFermerFrm() {
    setFrmOuvert(false);
    setTimeout(() => {
      setVoirFiche(false);
    }, 200);
  }

  function gererSoumettre() {
    if (quantite >= 0) {
      modifierBouteille(quantite, dateAchat, dateGarde, vinNote);
      setFrmOuvert(false);
    } else {
      if (quantite < 0) setOpenErr(true);
    }
  }

  const imageSrc =
    bouteille?.image && bouteille.image.indexOf("pastille_gout") < 0
      ? bouteille.image
      : placeholderSaq;

  const description = bouteille?.description?.trim?.()
    ? bouteille.description.trim()
    : "";

  return (
    <MuiDateProvider>
    <div className="FormBouteille">
      <Dialog
        className="FormBouteille-dialog-root"
        open={frmOuvert}
        onClose={viderFermerFrm}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          className: "FormBouteille-dialog",
          sx: { backgroundColor: "#f3f5eb", borderRadius: "8px" },
        }}
      >
        <DialogContent className="FormBouteille-content">
          <BouteilleImageZoom
            imageSrc={imageSrc}
            title={bouteille?.nom || "Bouteille"}
            alt={bouteille?.nom || "bouteille"}
          />

          <div className="fiche-body">
            <header className="fiche-header">
              <h2 className="fiche-nom">{bouteille?.nom}</h2>
              <p className="fiche-type">
                {bouteille_type} - {bouteille?.format} - {bouteille?.pays}
              </p>
            </header>

            {description && (
              <div className="fiche-description-block">
                <span className="fiche-section-label">Description</span>
                <p className="fiche-description-text">{description}</p>
              </div>
            )}

            {voirFiche && (
              <div className="fiche-meta">
                {personnalise != 0 && bouteille?.millesime && (
                  <div className="fiche-meta-item">
                    <span className="fiche-label">Millésime</span>
                    <p className="fiche-value fiche-value--emphasis">
                      {bouteille.millesime}
                    </p>
                  </div>
                )}
                <div className="fiche-meta-item">
                  <span className="fiche-label">Prix</span>
                  <p className="fiche-value fiche-value--emphasis">
                    {bouteille?.prix_saq}$
                  </p>
                </div>
                <div className="fiche-meta-item">
                  <span className="fiche-label">Quantité</span>
                  <p className="fiche-value fiche-value--emphasis">
                    {quantite}
                  </p>
                </div>
                <div className="fiche-meta-item">
                  <span className="fiche-label">Date d&apos;achat</span>
                  <p className="fiche-value">{bouteille?.date_achat}</p>
                </div>
                <div className="fiche-meta-item">
                  <span className="fiche-label">Garde jusqu&apos;à</span>
                  <p className="fiche-value">{bouteille?.garde_jusqua}</p>
                </div>
                <div className="fiche-meta-item fiche-meta-item--full">
                  <span className="fiche-label">Note</span>
                  <p
                    className={
                      bouteille?.notes || vinNote
                        ? "fiche-value"
                        : "fiche-value fiche-value--empty"
                    }
                  >
                    {bouteille?.notes || vinNote || "Aucune note"}
                  </p>
                </div>
                {bouteille?.personnalise === "0" && bouteille?.url_saq && (
                  <div className="fiche-lien-saq fiche-meta-item--full">
                    <a
                      href={bouteille.url_saq}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Voir sur le site SAQ
                    </a>
                  </div>
                )}
              </div>
            )}

            {!voirFiche && description && (
              <div className="fiche-description-block">
                <span className="fiche-section-label">Description</span>
                <p className="fiche-description-text">{description}</p>
              </div>
            )}

            {!voirFiche && (
              <div className="fiche-edit-fields">
                <label htmlFor="quantite-bouteille">Quantité</label>
                <FrmBouteilleInput
                  bouteille={bouteille}
                  voirFiche={voirFiche}
                  setQuantite={setQuantite}
                  quantite={quantite}
                  setOpenErr={setOpenErr}
                />
                <label>Date d&apos;achat</label>
                <DateSelecteur
                  voirFiche={voirFiche}
                  bouteille={bouteille}
                  dateAchat={dateAchat}
                  setDateAchat={setDateAchat}
                />
                <label>Garde jusqu&apos;à</label>
                <DateSelecteurAnnee
                  voirFiche={voirFiche}
                  bouteille={bouteille}
                  dateGarde={dateGarde}
                  setDateGarde={setDateGarde}
                />
                <label htmlFor="note">Note</label>
                <TextField
                  fullWidth
                  size="small"
                  type="text"
                  name="notes"
                  id="note"
                  value={vinNote}
                  onChange={(e) => {
                    setVinNote(e.target.value);
                  }}
                />
              </div>
            )}

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
                Champ invalide
              </Alert>
            </Dialog>
          </div>
        </DialogContent>

        {voirFiche === false ? (
          <DialogActions className="FormBouteille-actions">
            <Button
              className="FormBouteille--button"
              onClick={viderFermerFrm}
            >
              Annuler
            </Button>
            <Button
              className="FormBouteille--button"
              onClick={gererSoumettre}
            >
              Soumettre
            </Button>
          </DialogActions>
        ) : (
          <DialogActions className="FormBouteille-actions">
            <Button
              className="FormBouteille--button"
              onClick={viderFermerFrm}
            >
              OK
            </Button>
          </DialogActions>
        )}
      </Dialog>
    </div>
    </MuiDateProvider>
  );
}
