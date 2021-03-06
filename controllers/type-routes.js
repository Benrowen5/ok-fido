const router = require('express').Router();
const { Pets } = require('../models');

// get all pets based on type
router.get('/:type', (req, res) => {
    Pets.findAll({
        attributes: ['petId', 'petname', 'age', 'sex', 'type', 'breed', 'description', 'imgurl'],
        where: {
            type: req.params.type
        }
    })
    .then(dbPetData => {
        if (!dbPetData) {
            res.status(404).json({ message: `No ${type}'s found`})
            return;
        }

        const pets = dbPetData.map(pet => pet.get({plain: true}));
        res.render('pets', { 
            pets, 
            loggedIn: req.session.loggedIn
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;

