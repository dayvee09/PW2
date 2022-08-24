<div class="cellier">
    <?php
    foreach ($data as $cle => $bouteille) {

    ?>
        <div class="bouteille" data-quantite="">
            <div class="img">

                <img src="https:<?php echo $bouteille['image'] ?>">
            </div>
            <div class="description">
                <div class="description-originale">
                    <p class="nom">Nom : <?php echo $bouteille['nom'] ?></p>
                    <p class="quantite">Quantité : <?php echo $bouteille['quantite'] ?></p>
                    <p class="pays">Pays : <?php echo $bouteille['pays'] ?></p>
                    <p class="type">Type : <?php echo $bouteille['vino__type_id'] ?></p>
                    <p class="millesime">Millesime : <?php echo $bouteille['millesime'] ?></p>
                    <p><a href="<?php echo $bouteille['url_saq'] ?>">Voir SAQ</a></p>
                </div>
                <div class="description-ajout">
                    <p class="date_achat">Date achat : <?php echo $bouteille['date_achat'] ?></p>
                    <p class="description">Description : <?php echo $bouteille['description'] ?></p>
                </div>
            </div>
            <div class="options" data-id="<?php echo $bouteille['id_bouteille_cellier'] ?>">
                <button>Modifier</button>
                <button class='btnAjouter'>Ajouter</button>
                <button class='btnBoire'>Boire</button>

            </div>
        </div>
    <?php


    }

    ?>
</div>