import * as React from "react";
import { createPortal } from "react-dom";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import FrmBouteilleInput from "./FrmBouteilleInput";
import "./FrmBouteille.scss";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
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
  const [imageZoomOuvert, setImageZoomOuvert] = React.useState(false);
  const [imageZoomLevel, setImageZoomLevel] = React.useState(1);
  const [imageZoomOrigin, setImageZoomOrigin] = React.useState("center center");
  const ZOOM_SCALE = 2.5;

  function fermerImageZoom() {
    setImageZoomOuvert(false);
    setImageZoomLevel(1);
    setImageZoomOrigin("center center");
  }

  function gererClicImageZoom(e) {
    e.stopPropagation();
    if (imageZoomLevel > 1) {
      setImageZoomLevel(1);
      setImageZoomOrigin("center center");
      return;
    }
    const img = e.currentTarget;
    const rect = img.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setImageZoomOrigin(`${x}% ${y}%`);
    setImageZoomLevel(ZOOM_SCALE);
  }

  React.useEffect(() => {
    if (!imageZoomOuvert) return;
    function onKeyDown(e) {
      if (e.key === "Escape") {
        e.preventDefault();
        e.stopPropagation();
        fermerImageZoom();
      }
    }
    document.addEventListener("keydown", onKeyDown, true);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.body.classList.add("fiche-zoom-active");
    return () => {
      document.removeEventListener("keydown", onKeyDown, true);
      document.body.style.overflow = prevOverflow;
      document.body.classList.remove("fiche-zoom-active");
    };
  }, [imageZoomOuvert]);

  function viderFermerFrm() {
    fermerImageZoom();
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
          <button
            type="button"
            className="fiche-image-btn"
            onClick={() => setImageZoomOuvert(true)}
            aria-label="Agrandir l'image de la bouteille"
          >
            <img src={imageSrc} alt={bouteille?.nom || "bouteille"} />
            <span className="fiche-image-hint">
              <ZoomInIcon fontSize="small" aria-hidden />
              Cliquer pour agrandir
            </span>
          </button>

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

      {imageZoomOuvert &&
        createPortal(
          <div
            className={`fiche-image-zoom-overlay${
              imageZoomLevel > 1 ? " fiche-image-zoom-overlay--zoomed" : ""
            }`}
            role="dialog"
            aria-modal="true"
            aria-label="Image agrandie de la bouteille"
            onClick={fermerImageZoom}
          >
            <header
              className="fiche-image-zoom-header"
              onClick={(e) => e.stopPropagation()}
            >
              <p className="fiche-image-zoom-title">
                {bouteille?.nom || "Bouteille"}
              </p>
              <button
                type="button"
                className="fiche-image-zoom-close"
                aria-label="Fermer l'agrandissement"
                onClick={fermerImageZoom}
              >
                <CloseIcon />
              </button>
            </header>
            <div
              className="fiche-image-zoom-stage"
              onClick={fermerImageZoom}
              role="presentation"
            >
              <img
                className={`fiche-image-zoom-img${
                  imageZoomLevel > 1 ? " fiche-image-zoom-img--zoomed" : ""
                }`}
                src={imageSrc}
                alt={bouteille?.nom || "bouteille"}
                style={{
                  transformOrigin: imageZoomOrigin,
                  transform:
                    imageZoomLevel > 1
                      ? `scale(${imageZoomLevel})`
                      : "none",
                }}
                onClick={gererClicImageZoom}
              />
            </div>
            <p className="fiche-image-zoom-hint">
              {imageZoomLevel > 1
                ? "Cliquer sur la bouteille pour réduire, ou à l'extérieur pour fermer"
                : "Cliquer sur la bouteille pour zoomer, ou à l'extérieur pour fermer"}
            </p>
          </div>,
          document.body
        )}
    </div>
    </MuiDateProvider>
  );
}
