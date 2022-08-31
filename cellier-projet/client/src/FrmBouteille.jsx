import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';
import FrmBouteilleInput from './FrmBouteilleInput';


export default function FrmBouteille({ bouteille_id, cellier_id, bouteille_nom, bouteille_image, bouteille_quantite_p, quantite, setQuantite, frmOuvert, setFrmOuvert, modifierBouteille}) {
   
    /**
     *  Gère l'action d'annuler
     */
    function viderFermerFrm() {
        setQuantite(bouteille_quantite_p);
        setFrmOuvert(false);
    }
    /**
     * Gère l'action de soumettre
     */
    function gererSoumettre() {
      console.log(quantite);
        if (quantite !== bouteille_quantite_p && quantite >=0 ){
            modifierBouteille(quantite);
           
        }
         setFrmOuvert(false);
        
    }

    return (
        <div>
            <Dialog open={frmOuvert} onClose={viderFermerFrm}>
                <DialogTitle> Modifier la quantité de la bouteille</DialogTitle>
                <DialogContent>
                    <div className="img">
                        <img src={bouteille_image} alt="bouteille" />
                    </div>
                    <div className='description'>
                        <p className="nom">Nom : {bouteille_nom} </p>
                    </div>

                    <FrmBouteilleInput bouteille_quantite_p={bouteille_quantite_p} setQuantite={setQuantite}/>

                </DialogContent>
                <DialogActions>
                    <Button onClick={viderFermerFrm}>Annuler</Button>
                    <Button onClick={gererSoumettre}>Soumettre</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
