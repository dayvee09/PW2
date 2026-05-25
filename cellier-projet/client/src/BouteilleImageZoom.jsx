import * as React from "react";
import { createPortal } from "react-dom";
import CloseIcon from "@mui/icons-material/Close";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import "./FrmBouteille.scss";

/** Tap zoom on the fitted image; mobile keeps max-size so scale stays ~2.5× instead of blowing up. */
const ZOOM_SCALE_MOBILE = 2.5;
const ZOOM_SCALE_DESKTOP = 2;
const MOBILE_MAX_WIDTH_MQ = "(max-width: 480px)";

function getZoomScale() {
  if (typeof window === "undefined") return ZOOM_SCALE_DESKTOP;
  return window.matchMedia(MOBILE_MAX_WIDTH_MQ).matches
    ? ZOOM_SCALE_MOBILE
    : ZOOM_SCALE_DESKTOP;
}

/**
 * Aperçu cliquable d'une bouteille avec lightbox plein écran (zoom au clic).
 */
export default function BouteilleImageZoom({
  imageSrc,
  title = "Bouteille",
  alt,
  buttonClassName = "fiche-image-btn",
}) {
  const [imageZoomOuvert, setImageZoomOuvert] = React.useState(false);
  const [imageZoomLevel, setImageZoomLevel] = React.useState(1);
  const [imageZoomOrigin, setImageZoomOrigin] = React.useState("center center");

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
    setImageZoomLevel(getZoomScale());
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

  const imageAlt = alt ?? title;

  return (
    <>
      <button
        type="button"
        className={buttonClassName}
        onClick={() => setImageZoomOuvert(true)}
        aria-label="Agrandir l'image de la bouteille"
      >
        <img src={imageSrc} alt={imageAlt} loading="lazy" decoding="async" />
        <span className="fiche-image-hint">
          <ZoomInIcon fontSize="small" aria-hidden />
          Cliquer pour agrandir
        </span>
      </button>

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
              <p className="fiche-image-zoom-title">{title}</p>
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
                alt={imageAlt}
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
    </>
  );
}
