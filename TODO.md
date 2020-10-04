# TODO

fix image on PlantScreen (mobile verion)

        /* JOIN GENUS
          select g.name from plants as p
          inner join genera as g
          on p.genus = g.id;
        */
        /* JOIN SPECIES
          select s.name from plants as p
          inner join species as s
          on p.species = s.id;
        */
        /* JOIN EFFECTS
          select e.name from plants as p
          inner join effects_plants__plants_effects as eppe 
          on p.id = eppe.plant_id
          inner join effects as e 
          on e.id = eppe.effect_id;
        */
        /* JOIN VERNACULARS
          select v.name from plants as p
          inner join plants_vernaculars__vernaculars_plants as pvvp 
          on p.id = pvvp.plant_id
          inner join vernaculars as v 
          on v.id = pvvp.vernacular_id;
        */
        /* JOIN IMAGES
          select p.description from plants as p
          inner join images as i 
          on p.id = i.plant;
        */